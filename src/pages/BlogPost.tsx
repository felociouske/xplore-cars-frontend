import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import DOMPurify from "dompurify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchBlogPost, fetchBlogPosts } from "../services/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  cover_image_url?: string;
  content: string;
  author_name: string;
  published_at: string;
  created_at: string;
  youtube_embed_url?: string;
  youtube_url?: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    window.scrollTo(0, 0);

    Promise.all([fetchBlogPost(slug), fetchBlogPosts()]).then(([postData, allPosts]) => {
      setPost(postData);
      const others = allPosts.filter((p: BlogPost) => p.slug !== slug).slice(0, 3);
      setRelated(others);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-20 animate-pulse space-y-6 max-w-3xl">
          <div className="h-8 bg-secondary rounded w-3/4" />
          <div className="h-4 bg-secondary rounded w-1/2" />
          <div className="h-72 bg-secondary rounded-2xl" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-secondary rounded" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display font-bold text-3xl text-foreground mb-4">Article not found</h1>
          <Link to="/blog" className="text-accent hover:underline">
            Back to all articles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Cover image */}
        {post.cover_image_url && (
          <div className="w-full h-72 md:h-96 overflow-hidden">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="container mx-auto px-4 py-12 max-w-3xl">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>

          {/* Title & meta */}
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground leading-tight mb-3">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {post.subtitle}
            </p>
          )}

          <div className="flex items-center gap-5 text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author_name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.published_at || post.created_at)}
            </span>
          </div>

          {/* HTML content from CKEditor */}
          <div 
            className="prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-display prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-5
            prose-li:text-foreground/80 prose-li:leading-relaxed
            prose-strong:text-foreground prose-strong:font-semibold
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-table:border prose-table:border-border
            prose-th:bg-secondary prose-th:p-3 prose-th:text-left prose-th:font-semibold
            prose-td:p-3 prose-td:border prose-td:border-border
            prose-hr:border-border prose-blockquote:border-l-accent
            prose-blockquote:text-muted-foreground prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content, {
                ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                               'blockquote', 'ol', 'ul', 'li', 'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
                               'code', 'pre', 'hr', 'span', 'div', 'figure', 'figcaption'],
                ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'style', 'title'],
              }),
            }}
          />


          {/* YouTube embed */}
          {post.youtube_embed_url && (
            <div className="mt-12">
              <h3 className="font-display font-bold text-xl text-foreground mb-4">
                Watch the Video
              </h3>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={post.youtube_embed_url}
                  title={post.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-xl border border-border"
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 bg-secondary/60 border border-border rounded-2xl p-8 text-center">
            <h3 className="font-display font-bold text-2xl text-foreground mb-2">
              Ready to import your car?
            </h3>
            <p className="text-muted-foreground mb-6">
              Talk to our team and we will guide you through the full process.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* More articles */}
        {related.length > 0 && (
          <div className="border-t border-border bg-secondary/30">
            <div className="container mx-auto px-4 py-14">
              <h2 className="font-display font-bold text-2xl text-foreground mb-8">
                More Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.slug}`}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-medium transition-all duration-300"
                  >
                    {item.cover_image_url ? (
                      <img
                        src={item.cover_image_url}
                        alt={item.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-40 bg-secondary" />
                    )}
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        {formatDate(item.published_at || item.created_at)}
                      </p>
                      <h3 className="font-display font-semibold text-foreground text-base leading-snug group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs text-accent mt-2 font-medium">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;