import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";

const navLinks: { name: string; path: string; hash?: string }[] = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Imports", path: "/car-options" },
  { name: "Testimonials", path: "/testimonials"},
  { name: "Blogs", path: "/blog" },
  { name: "Contact", path: "/contact"},
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ── Navbar bar ── */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsOpen(false)}>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/logo.jpg"
                  alt="Xplore Car Imports"
                  className="h-10 w-10 object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-lg text-foreground">Xplore Car Imports</span>
                <span className="text-xs text-muted-foreground font-body">Low Mileage. High-Grade Cars.</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center justify-center space-x-1">
              {navLinks.map((link) =>(
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-md text-sm font-body font-medium transition-colors after:absolute after:left-4 after:-bottom-0.5 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${
                      isActive(link.path)
                        ? "text-accent after:w-[calc(100%-2rem)]"
                        : "text-foreground hover:text-accent after:w-0 hover:after:w-[calc(100%-2rem)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-3 justify-self-end">
              <button
                className="relative z-[110] p-2 rounded-md hover:bg-secondary transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <span
                  className="block w-5 h-0.5 bg-foreground transition-all duration-300 origin-center"
                  style={{
                    transform: isOpen ? "translateY(3px) rotate(45deg)" : "none",
                    marginBottom: isOpen ? "0" : "4px",
                  }}
                />
                <span
                  className="block w-5 h-0.5 bg-foreground transition-all duration-300"
                  style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? "scaleX(0)" : "scaleX(1)" }}
                />
                <span
                  className="block w-5 h-0.5 bg-foreground transition-all duration-300 origin-center"
                  style={{
                    transform: isOpen ? "translateY(-3px) rotate(-45deg)" : "none",
                    marginTop: isOpen ? "0" : "4px",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Full-screen mobile menu overlay ── */}
      <div
        className="fixed inset-0 z-[100] md:hidden pointer-events-none"
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className="absolute top-0 right-0 h-full w-[85vw] max-w-sm flex flex-col bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-out"
          style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)", pointerEvents: isOpen ? "auto" : "none" }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
              <img src="/logo.jpg" alt="Xplore Car Imports" className="h-8 w-8 object-contain rounded-md" />
              <span className="font-display font-bold text-base text-foreground">Xplore Cars</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X className="h-4 w-4 text-foreground" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-3">
              Navigation
            </p>
            <ul className="space-y-1">
              {navLinks.map((link, i) => (
                <li
                  key={link.path}
                  style={{
                    transitionDelay: isOpen ? `${i * 50 + 80}ms` : "0ms",
                    transform: isOpen ? "translateX(0)" : "translateX(24px)",
                    opacity: isOpen ? 1 : 0,
                    transition: "transform 0.35s ease, opacity 0.35s ease",
                  }}
                >
                  {link.hash ? (
                    <HashLink
                      smooth
                      to={link.path + (link.hash ?? "")}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors group ${
                        isActive(link.path)
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </HashLink>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors group ${
                        isActive(link.path)
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* WhatsApp prompt card */}
            <div
              style={{
                transitionDelay: isOpen ? `${navLinks.length * 50 + 100}ms` : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(16px)",
                opacity: isOpen ? 1 : 0,
                transition: "transform 0.4s ease, opacity 0.4s ease",
              }}
              className="mt-8 rounded-2xl overflow-hidden border border-[#25D366]/30 bg-emerald-50 dark:bg-emerald-950/30"
            >
              {/* Green top bar */}
              <div className="bg-[#25D366] px-5 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-white text-xs font-semibold">We respond fast on WhatsApp</span>
              </div>

              <div className="px-5 py-4">
                {/* Fake chat bubble */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl rounded-tl-sm px-4 py-3 shadow-sm mb-4">
                  <p className="text-xs font-medium text-zinc-800 dark:text-zinc-100 leading-snug">
                    Tell us what car you need and we'll source it from Japan for you!
                  </p>
                  <p className="text-[10px] text-zinc-400 text-right mt-1.5">now</p>
                </div>

                <a
                  href="https://wa.me/254757356989?text=Hi!%20I%27m%20looking%20for%20a%20car.%20Could%20you%20help%20me%20find%20one%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl py-3 text-sm font-bold transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;