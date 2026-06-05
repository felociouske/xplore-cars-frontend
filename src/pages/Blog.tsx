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
  subtitle?: string;
  cover_image_url?: string;
  author_name: string;
  published_at: string;
  created_at: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const BlogCard = ({ post }: { post: BlogPost }) => (
  <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-medium transition-all duration-300 group flex flex-col">
    <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
      {post.cover_image_url ? (
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-52 bg-secondary flex items-center justify-center">
          <span className="text-muted-foreground text-sm">No image</span>
        </div>
      )}
    </Link>

    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          {post.author_name}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(post.published_at || post.created_at)}
        </span>
      </div>

      <Link to={`/blog/${post.slug}`}>
        <h2 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-accent transition-colors leading-snug">
          {post.title}
        </h2>
      </Link>

      {post.subtitle && (
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          {post.subtitle}
        </p>
      )}

      <Link
        to={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-3 transition-all duration-200 mt-auto"
      >
        Read Article <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </article>
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="bg-secondary/50 border-b border-border py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Importation Insights
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Guides, tips, and updates on importing quality cars from Japan to Kenya.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-14 flex-1">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-secondary" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-secondary rounded w-1/2" />
                  <div className="h-5 bg-secondary rounded w-3/4" />
                  <div className="h-3 bg-secondary rounded w-full" />
                  <div className="h-3 bg-secondary rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">No articles published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;