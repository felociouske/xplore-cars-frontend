import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { fetchTestimonials } from "../services/api";

const YouTubeEmbed = ({ videoUrl, title }: { videoUrl: string; title?: string }) => (
  <div className="relative rounded-xl overflow-hidden shadow-medium">
    <div className="relative pb-[56.25%] h-0">
      <iframe
        src={videoUrl}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        allowFullScreen
      />
    </div>
  </div>
);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
        fill={i < rating ? "currentColor" : "none"}
      />
    ))}
  </div>
);

interface Testimonial {
  id: number;
  title: string;
  author_name: string;
  author_role: string;
  testimonial_text: string;
  youtube_embed_url?: string | null;
  layout_type: "text" | "video" | "both";
  rating: number;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  const textTestimonials = testimonials.filter((t) => t.layout_type === "text");
  const videoTestimonials = testimonials.filter(
    (t) => (t.layout_type === "video" || t.layout_type === "both") && t.youtube_embed_url
  );

  if (loading) {
    return (
      <section className="py-20 bg-secondary/40">
        <div className="text-center text-muted-foreground py-10">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading testimonials...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-secondary/40">
        <div className="text-center text-destructive py-10">{error}</div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-secondary/40 dark:bg-muted/20 transition-colors">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
            Client Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Genuine experiences from clients who trusted Xplore Car Imports. Here is what they have to say.
          </p>
        </div>

        {testimonials.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            No testimonials available yet. Check back soon!
          </p>
        )}

        {/* Text testimonials — card grid */}
        {textTestimonials.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {textTestimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-card border border-border rounded-2xl p-7 hover:shadow-medium transition-all duration-300 flex flex-col"
              >
                <StarRating rating={item.rating || 5} />

                {item.testimonial_text && (
                  <p className="text-muted-foreground leading-relaxed mb-5 flex-1 italic">
                    "{item.testimonial_text}"
                  </p>
                )}

                <div className="border-t border-border pt-4 mt-auto">
                  <p className="font-semibold text-foreground">{item.author_name}</p>
                  {item.author_role && (
                    <p className="text-xs text-muted-foreground mt-0.5">{item.author_role}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Video testimonials — grid, centered */}
        {videoTestimonials.length > 0 && (
          <>
            {textTestimonials.length > 0 && (
              <div className="text-center mb-10">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                  Video Reviews
                </p>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Hear Directly From Our Clients
                </h3>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videoTestimonials.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-medium transition-all duration-300"
                >
                  {/* Video */}
                  <YouTubeEmbed
                    videoUrl={item.youtube_embed_url!}
                    title={item.title || item.author_name}
                  />

                  {/* Info below video */}
                  <div className="p-6">
                    <StarRating rating={item.rating || 5} />
                    <p className="font-semibold text-foreground">{item.author_name}</p>
                    {item.author_role && (
                      <p className="text-xs text-muted-foreground mt-0.5 mb-3">{item.author_role}</p>
                    )}
                    {item.testimonial_text && (
                      <p className="text-muted-foreground text-sm leading-relaxed italic">
                        "{item.testimonial_text}"
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default Testimonials;