import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { fetchCars } from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

interface CarData {
  id: number;
  name?: string;
  make?: string;
  model?: string;
  year?: number;
  description?: string;
  features_list?: string[];
  images?: any[];
  price_display?: string | null;
  youtube_video_1?: string | null;
  youtube_video_1_title?: string | null;
  youtube_video_2?: string | null;
  youtube_video_2_title?: string | null;
  youtube_video_3?: string | null;
  youtube_video_3_title?: string | null;
  youtube_video_4?: string | null;
  youtube_video_4_title?: string | null;
}

function getImageSrc(img: any): string {
  const src = typeof img === "string" ? img : img?.image;
  if (!src) return "/placeholder-car.jpg";
  return src.startsWith("http") ? src : `${API_BASE_URL.replace("/api", "")}${src}`;
}

function getPriceDisplay(car: CarData): string | null {
  return car.price_display?.trim() || null;
}

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [carData, setCarData] = useState<CarData | null>(null);
  const [allCars, setAllCars] = useState<CarData[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadCarDetails() {
      setLoading(true);
      try {
        const cars = await fetchCars();
        const foundCar = cars.find((car: CarData) => String(car.id) === id);
        if (!foundCar) return setCarData(null);
        setCarData(foundCar);
        setAllCars(cars);
        setImages((foundCar.images || []).map(getImageSrc));
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast({ title: "Error loading car details." });
      } finally {
        setLoading(false);
      }
    }
    loadCarDetails();
  }, [id, toast]);

  useEffect(() => {
    setSelectedImage(null);
  }, [id]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;
    const handleKey = (e: KeyboardEvent) => {
      const currentIndex = images.indexOf(selectedImage);
      if (e.key === "ArrowRight") setSelectedImage(images[(currentIndex + 1) % images.length]);
      if (e.key === "ArrowLeft") setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, images]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading car details...</p>
        </div>
      </div>
    );
  }

  // After — no client-side URL change, just an inline empty/error state
  if (!loading && !carData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground">This car couldn't be found.</p>
          <Link to="/car-options" className="text-primary underline">
            Browse inventory
          </Link>
        </div>
      </div>
    );
  }

  const suggestedCars = allCars.filter((car) => car.id !== carData.id).slice(0, 4);
  const carTitle = carData.name || `${carData.make || ""} ${carData.model || ""}`.trim();
  const priceDisplay = getPriceDisplay(carData);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi, I'm interested in the ${carTitle}. Could you please send me more details?`);
    window.open(`https://wa.me/254757356989?text=${msg}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:+254757356989`;
  };

  const currentImageIndex = selectedImage ? images.indexOf(selectedImage) : -1;

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentImageIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  function getYouTubeEmbedUrl(url: string): string | null {
    try {
      const u = new URL(url);
      let videoId: string | null = null;
      if (u.hostname.includes("youtu.be")) {
        videoId = u.pathname.slice(1);
      } else if (u.hostname.includes("youtube.com")) {
        videoId = u.searchParams.get("v");
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
      return null;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Back link */}
          <Link to="/car-options" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8 transition">
            <ArrowLeft className="h-4 w-4" />
            Back to Imports
          </Link>

          <div className="flex flex-col gap-5">
            {/* Left: Images */}
            <div className="lg:col-span-2">
              {images.length > 0 && (
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded overflow-hidden cursor-pointer" onClick={() => setSelectedImage(images[0])}>
                    <img
                      src={images[0]}
                      alt={carTitle}
                      className="w-full h-96 object-cover hover:opacity-90 transition"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                      }}
                    />
                  </div>

                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(img)}
                          className="bg-gray-100 rounded overflow-hidden hover:opacity-75 transition"
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-20 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Summary & Contact */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{carTitle}</h1>
                {carData.year && <p className="text-lg text-gray-700">Year: {carData.year}</p>}
                {priceDisplay && <p className="text-2xl font-semibold text-gray-900 mt-2">{priceDisplay}</p>}
              </div>
            </div>
          </div>

          {/* Description Section */}
          {carData.description && (
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-p:my-3"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(carData.description, {
                  ALLOWED_TAGS: ["p", "br", "strong", "b", "em", "i", "u", "h1", "h2", "h3", "h4", "h5", "h6",
                    "blockquote", "ol", "ul", "li", "a", "img", "table", "thead", "tbody", "tr", "th", "td",
                    "code", "pre", "hr", "span", "div", "figure", "figcaption"],
                  ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "class", "title"],
                }),
              }}
            />
          )}

          {/* YouTube Videos Section */}
          {(carData.youtube_video_1 || carData.youtube_video_2 || carData.youtube_video_3 || carData.youtube_video_4) && (() => {
            const videos = [
              { url: carData.youtube_video_1, title: carData.youtube_video_1_title },
              { url: carData.youtube_video_2, title: carData.youtube_video_2_title },
              { url: carData.youtube_video_3, title: carData.youtube_video_3_title },
              { url: carData.youtube_video_4, title: carData.youtube_video_4_title },
            ].filter(v => v.url && getYouTubeEmbedUrl(v.url!));

            if (videos.length === 0) return null;

            return (
              <section className="mt-5 pt-5 border-t border-gray-200">
                <div className="max-w-5xl mx-auto px-4 pb-16">
                  <h2 className="text-2xl font-bold text-gray-900 mb-5">
                    Watch the full car review on YouTube
                  </h2>
                  <div className={`grid gap-8 ${videos.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-2xl"}`}>
                    {videos.map((video, idx) => {
                      const embedUrl = getYouTubeEmbedUrl(video.url!);
                      return (
                        <div key={idx} className="space-y-3">
                          {video.title && (
                            <h3 className="text-base font-semibold text-gray-800">{video.title}</h3>
                          )}
                          <div className="rounded overflow-hidden shadow-sm border border-gray-100">
                            <iframe
                              src={embedUrl!}
                              title={video.title || `${carTitle} video ${idx + 1}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full aspect-video"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })()}
          {/* Suggested Cars Section */}
          {suggestedCars.length > 0 && (
            <section className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Other cars we have imported</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestedCars.map((car) => {
                  const carImg = car.images && car.images.length > 0 ? getImageSrc(car.images[0]) : "/placeholder-car.jpg";
                  const carName = car.name || `${car.make || ""} ${car.model || ""}`.trim();
                  return (
                    <Link key={car.id} to={`/car-options/${car.id}`} className="group cursor-pointer">
                      <div className="bg-gray-100 rounded overflow-hidden mb-3">
                        <img
                          src={carImg}
                          alt={carName}
                          className="w-full h-40 object-cover group-hover:opacity-90 transition"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                          }}
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#1B8F5A] transition">{carName}</h3>
                      {getPriceDisplay(car) && <p className="text-sm text-gray-600 mt-1">{getPriceDisplay(car)}</p>}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition z-10 bg-black/40 hover:bg-black/60 rounded-full p-2"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}

          <img
            src={selectedImage}
            alt="Full view"
            className="max-h-[80vh] max-w-3xl w-full h-auto object-contain"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
            }}
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition z-10 bg-black/40 hover:bg-black/60 rounded-full p-2"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          )}

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {currentImageIndex + 1} / {images.length}
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CarDetail;