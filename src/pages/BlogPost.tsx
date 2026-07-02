import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, ArrowRight, Play, MessageCircle} from "lucide-react";
import DOMPurify from "dompurify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchBlogPost, fetchBlogPosts } from "../services/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  meta_description?: string;
  cover_image_url?: string;
  content: string;
  author_name: string;
  published_at: string;
  created_at: string;
  youtube_url?: string;
}

interface RelatedPost {
  id: number;
  title: string;
  slug: string;
  meta_description?: string;
  cover_image_url?: string;
  published_at: string;
  created_at: string;
  author_name: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-KE", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    let videoId = "";

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v") || "";
      if (!videoId) {
        const segments = parsed.pathname.split("/").filter(Boolean);
        const embedIndex = segments.indexOf("embed");
        if (embedIndex !== -1 && segments.length > embedIndex + 1) {
          videoId = segments[embedIndex + 1];
        }
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showYoutubePopup, setShowYoutubePopup] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    window.scrollTo(0, 0);
    Promise.all([fetchBlogPost(slug), fetchBlogPosts()]).then(([postData, allPosts]) => {
      setPost(postData);
      setRelated(allPosts.filter((p: RelatedPost) => p.slug !== slug).slice(0, 3));
      setLoading(false);
      if (postData && postData.youtube_url) {
        setShowYoutubePopup(true);
      } else {
        setShowYoutubePopup(false);
      }
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="container mx-auto px-6 py-24 max-w-4xl animate-pulse space-y-5">
          <div className="h-7 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-96 bg-gray-200 rounded mt-6" />
          {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-gray-200 rounded" />)}
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article not found</h1>
          <Link to="/blog" className="text-blue-600 hover:underline font-semibold">← Back to all articles</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Cover image */}
      {post.cover_image_url && (
        <div className="w-full md:w-3/4 aspect-video overflow-hidden mt-16 mx-auto rounded-lg shadow-lg">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {!post.cover_image_url && <div className="h-16" />}

      <main className="flex-1">
        <div className="mx-auto px-6 py-12 max-w-full">

          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
          {/* Main content */}
          <div className="grid grid-cols-1 gap-8">
            <div>
              {/* Title */}
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
                {post.title}
              </h1>
              {/* Meta bar */}
              <div className="flex items-center gap-5 text-sm font-medium text-gray-600 pb-6 mb-8 border-b border-gray-200">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author_name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at || post.created_at)}
                </span>
              </div>

              {post.meta_description && (
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  {post.meta_description}
                </p>
              )}

              {/* Article content */}
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content, {
                    ALLOWED_TAGS: ['p','br','strong','b','em','i','u','h1','h2','h3','h4','h5','h6',
                                   'blockquote','ol','ul','li','a','img','table','thead','tbody','tr','th','td',
                                   'code','pre','hr','span','div','figure','figcaption'],
                    ALLOWED_ATTR: ['href','target','rel','src','alt','class','title','width','height'],
                  }),
                }}
              />

              {/* YouTube section */}
              {post.youtube_url && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Watch the Video</h3>
                  <p className="text-gray-600 mb-4">
                    This article has been covered in detail on our YouTube channel. Watch the video for more insights.
                  </p>
                  {getYouTubeEmbedUrl(post.youtube_url) ? (
                    <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl shadow-lg">
                      <div className="aspect-video w-full">
                          <iframe
                            className="w-full h-full"
                            src={getYouTubeEmbedUrl(post.youtube_url)!}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                    </div>
                  ) : (
                    <a
                      href={post.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition"
                    >
                      <Play className="h-5 w-5 fill-white" />
                      Watch on YouTube
                    </a>
                  )}
                </div>
              )}

              {/* Import CTA */}
              <div className="mt-14 bg-gradient-to-r from-blue-900 to-blue-800 rounded p-8 text-center">
                <p className="text-blue-200 text-sm font-bold uppercase tracking-wide mb-3">Ready to Import?</p>
                <h3 className="text-3xl font-bold text-white mb-3">
                  Let's find your perfect car from Japan
                </h3>
                <p className="text-blue-100 mb-6">
                  Talk to our team and we'll guide you through the full process.
                </p>
                <a
                  href="https://wa.me/254757356989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1B8F5A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#157a4b] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* More articles section */}
        {related.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 mt-16">
            <div className="container mx-auto px-6 py-14 max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.slug}`}
                    className="bg-white rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                  >
                    {item.cover_image_url ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={item.cover_image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gray-200" />
                    )}
                    <div className="p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        {formatDate(item.published_at || item.created_at)}
                      </p>
                      <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-blue-600 transition">
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm mt-3">
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

      {showYoutubePopup && post && post.youtube_url && (
        <div className="fixed bottom-6 right-6 z-50 max-w-xs bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="font-semibold">Watch on YouTube</p>
              <p className="text-sm text-gray-600">This article has a video. Open it on YouTube?</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <a href={post.youtube_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-red-600 text-white rounded">Open</a>
            <button onClick={() => setShowYoutubePopup(false)} className="px-3 py-1 border rounded">Dismiss</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;