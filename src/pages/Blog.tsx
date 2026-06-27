import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchBlogPosts } from "../services/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  meta_description?: string;
  cover_image_url?: string;
  author_name: string;
  published_at: string;
  created_at: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-KE", {
    year: "numeric", month: "long", day: "numeric",
  });
}

const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => {
  const date = formatDate(post.published_at || post.created_at);

  if (featured) {
    return (
      <article className="card-clean rounded overflow-hidden group md:grid md:grid-cols-2">
        {/* Image */}
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-64 md:h-full">
          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <span className="text-muted-foreground text-sm font-sans">No cover image</span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <span className="eyebrow mb-3">Featured Article</span>
          <Link to={`/blog/${post.slug}`}>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary group-hover:text-accent transition-colors leading-snug mb-3">
              {post.title}
            </h2>
          </Link>
          {post.meta_description && (
            <p className="font-sans text-muted-foreground leading-relaxed mb-5 text-[15px]">
              {post.meta_description}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs font-sans text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{post.author_name}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{date}</span>
          </div>
          <Link to={`/blog/${post.slug}`} className="btn-primary self-start">
            Read Article
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="card-clean rounded overflow-hidden group flex flex-col transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5">
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
        {post.cover_image_url ? (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-103 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-48 bg-secondary flex items-center justify-center">
            <span className="text-muted-foreground text-sm font-sans">No image</span>
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs font-sans text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{date}</span>
          <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author_name}</span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-display font-semibold text-lg text-primary group-hover:text-accent transition-colors leading-snug mb-2">
            {post.title}
          </h2>
        </Link>

        {post.meta_description && (
          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
            {post.meta_description}
          </p>
        )}

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-accent hover:gap-3 transition-all mt-auto"
        >
          Read Article <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

// Skeleton card
const CardSkeleton = () => (
  <div className="card-clean rounded overflow-hidden animate-pulse">
    <div className="h-48 bg-secondary" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-secondary rounded w-1/2" />
      <div className="h-5 bg-secondary rounded w-4/5" />
      <div className="h-3 bg-secondary rounded w-full" />
      <div className="h-3 bg-secondary rounded w-3/4" />
    </div>
  </div>
);

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-6 py-14 flex-1">
        {loading ? (
          <div className="space-y-10">
            <div className="card-clean rounded overflow-hidden animate-pulse h-72" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground font-sans">
            <p className="text-lg">No articles published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured post */}
            {featured && <BlogCard post={featured} featured />}

            {/* Grid */}
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-4 pt-4">
                  <span className="eyebrow">More Articles</span>
                  <div className="flex-1 border-t border-border" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => <BlogCard key={post.id} post={post} />)}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* WhatsApp CTA */}
      <div className="bg-[#0A2240] py-12 px-6 text-center">
        <p className="font-display text-2xl font-semibold text-white mb-3">
          Ready to import your car?
        </p>
        <p className="font-sans text-white/60 mb-6">Our team is available on WhatsApp to answer your questions.</p>
        <a
          href="https://wa.me/254757356989?text=Hi!%20I%27m%20interested%20in%20importing%20a%20car."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white font-sans font-semibold px-6 py-3 rounded transition-colors"
        >
          Chat on WhatsApp
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;