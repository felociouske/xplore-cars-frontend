import React, { useEffect, useState } from "react";
import { Star, Search, X, Play, Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchTestimonials } from "../services/api";

interface Testimonial {
  id: number;
  title: string;
  author_name: string;
  author_role: string;
  testimonial_text: string;
  youtube_url?: string | null;
  youtube_id?: string | null;
  youtube_embed_url?: string | null;
  layout_type: "text" | "video" | "both";
  rating: number;
  featured: boolean;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={13}
        className={i < rating ? "text-yellow-400" : "text-border"}
        fill={i < rating ? "currentColor" : "none"}
      />
    ))}
  </div>
);

const TextCard = ({ item, index }: { item: Testimonial; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.06 }}
    className="bg-card border border-border rounded-2xl p-7 flex flex-col hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300"
  >
    <Quote className="h-7 w-7 text-primary/20 mb-3 flex-shrink-0" />
    {item.testimonial_text && (
      <p className="text-foreground/80 leading-relaxed mb-6 flex-1 text-sm italic">
        "{item.testimonial_text}"
      </p>
    )}
    <div className="mt-auto">
      <StarRating rating={item.rating || 5} />
      <div className="mt-2">
        <p className="font-semibold text-foreground text-sm">{item.author_name}</p>
        {item.author_role && (
          <p className="text-xs text-muted-foreground mt-0.5">{item.author_role}</p>
        )}
      </div>
    </div>
  </motion.div>
);

const BothCard = ({ item, index }: { item: Testimonial; index: number }) => {
  const thumbnail = item.youtube_id
    ? `https://img.youtube.com/vi/${item.youtube_id}/mqdefault.jpg`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="col-span-1 md:col-span-2 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-3 p-8 flex flex-col justify-between">
          <Quote className="h-8 w-8 text-primary/20 mb-4 flex-shrink-0" />
          {item.testimonial_text && (
            <p className="text-foreground/85 leading-relaxed text-base italic flex-1 mb-6">
              "{item.testimonial_text}"
            </p>
          )}
          <div>
            <StarRating rating={item.rating || 5} />
            <div className="mt-2">
              <p className="font-semibold text-foreground">{item.author_name}</p>
              {item.author_role && (
                <p className="text-xs text-muted-foreground mt-0.5">{item.author_role}</p>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-secondary/50 border-t md:border-t-0 md:border-l border-border flex flex-col items-center justify-center p-8 gap-5">
          {thumbnail && (
            <div className="relative w-full rounded-xl overflow-hidden shadow-sm group cursor-pointer">
              <img
                src={thumbnail}
                alt={item.author_name}
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="h-5 w-5 text-gray-900 ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
          )}
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground mb-1">Watch the Full Story</p>
            <p className="text-xs text-muted-foreground mb-4">
              Hear directly from {item.author_name.split(" ")[0]} on YouTube
            </p>
            <a
              href={item.youtube_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Play className="h-3.5 w-3.5" fill="currentColor" />
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VideoCard = ({ item, index }: { item: Testimonial; index: number }) => {
  const thumbnail = item.youtube_id
    ? `https://img.youtube.com/vi/${item.youtube_id}/mqdefault.jpg`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300"
    >
      <a href={item.youtube_url || "#"} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative group">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={item.author_name}
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-44 bg-secondary flex items-center justify-center">
              <Play className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="h-5 w-5 text-gray-900 ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>
      </a>
      <div className="p-5">
        <StarRating rating={item.rating || 5} />
        <div className="mt-2 mb-3">
          <p className="font-semibold text-foreground text-sm">{item.author_name}</p>
          {item.author_role && (
            <p className="text-xs text-muted-foreground mt-0.5">{item.author_role}</p>
          )}
        </div>
        {item.testimonial_text && (
          <p className="text-xs text-muted-foreground italic line-clamp-2">
            "{item.testimonial_text}"
          </p>
        )}
        <a
          href={item.youtube_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3 hover:underline"
        >
          Watch on YouTube <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
};

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "text" | "both">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTestimonials()
      .then((data) => setTestimonials(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = testimonials.filter((t) => {
    if (filter === "text" && t.layout_type !== "text") return false;
    if (filter === "both" && t.layout_type === "text") return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !t.author_name?.toLowerCase().includes(q) &&
        !t.testimonial_text?.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });

  const avgRating =
    testimonials.length > 0
      ? (testimonials.reduce((s, t) => s + (t.rating || 5), 0) / testimonials.length).toFixed(1)
      : "5.0";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Banner */}
      <div className="bg-gradient-to-r py-16 px-4">
        <div className="container mx-auto text-center">
          <p className="text-blue text-sm uppercase tracking-widest font-medium mb-2">
            Client Stories
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-blue mb-4">
            What Our Customers Say
          </h1>
          <p className="text-blue max-w-xl mx-auto mb-8">
            Real reviews from real clients who trusted us to import their vehicles from Japan.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 border border-border rounded-xl bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="mb-3">No reviews match your search.</p>
            <button
              onClick={() => { setFilter("all"); setSearch(""); }}
              className="text-primary underline underline-offset-4 text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, index) => {
              if (item.layout_type === "both" && item.youtube_id) {
                return <BothCard key={item.id} item={item} index={index} />;
              }
              if (item.layout_type === "video" && item.youtube_id) {
                return <VideoCard key={item.id} item={item} index={index} />;
              }
              return <TextCard key={item.id} item={item} index={index} />;
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;