import React, { useEffect, useState } from "react";
import { Star, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { fetchTestimonials } from "../services/api";

// 🎥 YouTube Embed Component
const YouTubeEmbed = ({ videoUrl, title }: { videoUrl: string; title?: string }) => (
  <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
    <div className="relative pb-[56.25%] h-0">
      <iframe
        src={videoUrl}
        title={title}
        className="absolute top-0 left-0 w-full h-full rounded-2xl"
        allowFullScreen
      ></iframe>
    </div>
    <a
      href={videoUrl.replace("embed/", "watch?v=")} // opens YouTube page
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <div className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-lg font-semibold shadow-lg">
        <PlayCircle className="w-5 h-5" />
        <span>Watch on YouTube</span>
      </div>
    </a>
  </div>
);

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
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 📡 Fetch testimonials from backend
  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  // Separate testimonials by layout type
  const videoTestimonials = testimonials.filter(
    (item) => item.layout_type === "video" || item.layout_type === "both"
  );
  const textTestimonials = testimonials.filter(
    (item) => item.layout_type === "text"
  );

  return (
    <section className="py-20 relative bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
      {/* 🌈 Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />

      {/* 🏷️ Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Genuine experiences from our clients who trusted Xplore Car Imports. Here is what they have to say.
        </p>
      </div>

      {/* 🔄 Loading / Error / Empty */}
      {loading && (
        <div className="text-center text-gray-700 dark:text-gray-200 py-10">
          <p>Loading testimonials...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 py-10">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && testimonials.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          <p>No testimonials available yet. Check back soon!</p>
        </div>
      )}

      {/* 💬 Text-Only Testimonials (GRID) */}
      {textTestimonials.length > 0 && (
        <div className="relative z-10 px-6 md:px-12 mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {textTestimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-2">
                  {item.author_name}
                </h3>
                {item.author_role && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {item.author_role}
                  </p>
                )}
                <div className="flex justify-center space-x-1 mb-4">
                  {Array.from({ length: item.rating || 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  “{item.testimonial_text}”
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 🎥 Video Testimonials (SIDE-BY-SIDE) */}
      {videoTestimonials.length > 0 && (
        <div className="relative z-10 space-y-16 px-6 md:px-12">
          {videoTestimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-center gap-8 justify-center"
            >
              {/* Text */}
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-2">
                  {item.author_name}
                </h3>
                {item.author_role && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {item.author_role}
                  </p>
                )}
                <div className="flex justify-start space-x-1 mb-4">
                  {Array.from({ length: item.rating || 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  “{item.testimonial_text}”
                </p>
              </div>

              {/* Video */}
              {item.youtube_embed_url && (
                <div className="md:w-1/2">
                  <YouTubeEmbed
                    videoUrl={item.youtube_embed_url}
                    title={item.title || item.author_name}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonials;
