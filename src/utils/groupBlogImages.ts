// CKEditor 5 saves each image as its own block-level element
// (<figure class="image">...</figure>, or a bare <p><img></p> for
// pasted images). It never groups multiple images together — even if
// an author drops 3 photos in a row, each one lands on its own line,
// full width. This utility walks the sanitized HTML and wraps runs of
// 2+ "plain" images in a flex container so they render side by side.
//
// IMPORTANT: call this AFTER DOMPurify.sanitize(), never before —
// DOMParser here trusts its input completely (no script execution
// risk either way since DOMParser-parsed documents are inert), but
// keeping sanitize-then-group as the fixed order avoids ever having
// to reason about it twice.

const POSITIONED_IMAGE_CLASSES = [
  "image-style-side",
  "image-style-align-left",
  "image-style-align-right",
  "image_resized", // CKEditor's manual-resize marker class
];

// An element counts as a "groupable" image block only if it's the
// default/full-width style — i.e. the author never manually aligned
// or resized it. Manually positioned images are left exactly as the
// author placed them.
function isGroupableImageBlock(el: Element): boolean {
  const tag = el.tagName.toLowerCase();

  if (tag === "figure" && el.classList.contains("image")) {
    const isPositioned = POSITIONED_IMAGE_CLASSES.some((c) =>
      el.classList.contains(c)
    );
    return !isPositioned;
  }

  // Some paste flows produce a bare <p><img></p> instead of a <figure>.
  if (tag === "p") {
    const onlyChild = el.children.length === 1 ? el.children[0] : null;
    const isImageOnly =
      onlyChild?.tagName.toLowerCase() === "img" &&
      (el.textContent ?? "").trim() === "";
    return isImageOnly;
  }

  return tag === "img";
}

// Remove inline width/float that CKEditor's resize handle may have
// written — otherwise a leftover `style="width: 800px"` on one image
// in the row overrides our flexbox sizing and breaks the layout.
function stripSizingStyles(el: Element) {
  const targets = el.tagName.toLowerCase() === "img" ? [el] : Array.from(el.querySelectorAll("img"));
  const allTargets = el.tagName.toLowerCase() === "img" ? targets : [el, ...targets];

  allTargets.forEach((node) => {
    const styleAttr = node.getAttribute("style");
    if (!styleAttr) return;
    const cleaned = styleAttr
      .split(";")
      .map((rule) => rule.trim())
      .filter((rule) => rule && !/^(width|float)\s*:/i.test(rule))
      .join("; ");
    if (cleaned) {
      node.setAttribute("style", cleaned);
    } else {
      node.removeAttribute("style");
    }
  });
}

export function groupConsecutiveBlogImages(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const body = doc.body;

  // Snapshot the children before mutating — appendChild() below MOVES
  // nodes rather than cloning them, so references in this array stay
  // valid even after nodes are relocated into a new wrapper.
  const children = Array.from(body.childNodes);

  let i = 0;
  while (i < children.length) {
    const node = children[i];

    if (node.nodeType === Node.ELEMENT_NODE && isGroupableImageBlock(node as Element)) {
      const run: Element[] = [node as Element];
      let j = i + 1;

      // Extend the run through whitespace-only text nodes (CKEditor's
      // saved HTML is pretty-printed with newlines between elements —
      // without skipping these, "consecutive" images would never
      // actually look consecutive to this check).
      while (j < children.length) {
        const next = children[j];
        if (next.nodeType === Node.TEXT_NODE && !(next.textContent ?? "").trim()) {
          j++;
          continue;
        }
        if (next.nodeType === Node.ELEMENT_NODE && isGroupableImageBlock(next as Element)) {
          run.push(next as Element);
          j++;
          continue;
        }
        break;
      }

      if (run.length >= 2) {
        const wrapper = doc.createElement("div");
        wrapper.className = "blog-image-row";
        run[0].parentNode!.insertBefore(wrapper, run[0]);
        run.forEach((el) => {
          stripSizingStyles(el);
          wrapper.appendChild(el);
        });
      }

      i = j; // skip past the whole run (grouped or not)
    } else {
      i++;
    }
  }

  return body.innerHTML;
}