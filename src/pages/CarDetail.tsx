import { useState, useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  Phone, MessageCircle, Mail, ArrowLeft,
  Gauge, Settings, Fuel, Calendar, ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { fadeUp } from "../animations/fadeUp";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { fetchCars } from "../services/api";
import CarInventoryEnquiry from "../components/CarInventoryEnquiry";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

interface CarData {
  status?: string;
  id: number;
  name?: string;
  make?: string;
  model?: string;
  year?: number;
  category?: string;
  price_from: number;
  price_to?: number;
  price_display: string;
  features?: string;
  description?: string;
  images?: any[];
  body_type?: string;
  import_type?: string;
  drive_side?: string;
  trim_levels?: string;
  trim_levels_list?: string[];
}

const STATUS_COLORS: Record<string, string> = {
  available: "bg-emerald-500 text-white",
  reserved: "bg-amber-400 text-stone-900",
  new: "bg-blue-600 text-white",
};

const BODY_TYPE_LABELS: Record<string, string> = {
  hatchback: "Hatchback",
  sedan: "Sedan",
  suv: "SUV",
  crossover: "Crossover",
  wagon: "Wagon",
  minivan: "Minivan",
  pickup: "Pickup",
  coupe: "Coupe",
  convertible: "Convertible",
  van: "Van",
};

const IMPORT_LABELS: Record<string, string> = {
  japan_import: "Japan Import",
  local: "Local",
  uk_import: "UK Import",
};

const DRIVE_LABELS: Record<string, string> = {
  rhd: "Right Hand Drive",
  lhd: "Left Hand Drive",
};

function getImageSrc(img: any): string {
  const src = typeof img === "string" ? img : img?.image;
  if (!src) return "/placeholder-car.jpg";
  return src.startsWith("http") ? src : `${API_BASE_URL.replace("/api", "")}${src}`;
}

// ── Similar Cars scoring: same body_type first, then price proximity
function scoreSimilarity(current: CarData, candidate: CarData): number {
  let score = 0;
  if (candidate.body_type && candidate.body_type === current.body_type) score += 10;
  if (candidate.make && candidate.make === current.make) score += 5;
  if (candidate.import_type && candidate.import_type === current.import_type) score += 3;

  // Price proximity bonus (within 30% of current price_from)
  if (current.price_from && candidate.price_from) {
    const diff = Math.abs(candidate.price_from - current.price_from) / current.price_from;
    if (diff <= 0.15) score += 4;
    else if (diff <= 0.30) score += 2;
  }
  return score;
}

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [allCars, setAllCars] = useState<CarData[]>([]);
  const [carData, setCarData] = useState<CarData | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);

  useEffect(() => {
    async function loadCarDetails() {
      setLoading(true);
      try {
        const cars = await fetchCars();
        setAllCars(cars);
        const foundCar = cars.find((car: CarData) => String(car.id) === id);
        if (!foundCar) return setCarData(null);
        setCarData(foundCar);
        setImages((foundCar.images || []).map(getImageSrc));
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast({ title: "Error loading car details." });
      } finally {
        setLoading(false);
      }
    }
    loadCarDetails();
  }, [id]);

  // Reset image index when car changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [id]);

  // ── Similar vehicles: score, sort, take top 4 (excluding current)
  const similarCars = useMemo(() => {
    if (!carData) return [];
    return allCars
      .filter((c) => String(c.id) !== id)
      .map((c) => ({ car: c, score: scoreSimilarity(carData, c) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(({ car }) => car);
  }, [allCars, carData, id]);

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

  if (!carData) return <Navigate to="/car-options" replace />;

  const handleNextImage = () =>
    setCurrentImageIndex((p) => (p + 1) % images.length);
  const handlePrevImage = () =>
    setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);

  const handleWhatsApp = () => {
    const vehicle = carData.name || carData.body_type || "this vehicle";
    const msg = encodeURIComponent(
      `Hi, I'm interested in ${vehicle} listed on your website.`
    );
    window.open(`https://wa.me/254757356989?text=${msg}`, "_blank");
  };
  const handleCall = () => {
    window.location.href = `tel:+254757356989`;
  };
  const handleEmail = () => {
    const vehicle = carData.name || carData.body_type || "this vehicle";
    const s = encodeURIComponent(`Inquiry about ${vehicle}`);
    const b = encodeURIComponent(
      `Hello, I'm interested in this vehicle. Please provide more details.`
    );
    window.location.href = `mailto:localsays@gmail.com?subject=${s}&body=${b}`;
  };

  const carTitle =
    carData.name ||
    `${carData.make || ""} ${carData.model || ""}`.trim() ||
    carData.body_type ||
    "Imported vehicle";
  const bodyTypeLabel = carData.body_type
    ? BODY_TYPE_LABELS[carData.body_type] || carData.body_type
    : null;
  const importLabel = carData.import_type
    ? IMPORT_LABELS[carData.import_type] || carData.import_type
    : null;
  const driveLabel = carData.drive_side
    ? DRIVE_LABELS[carData.drive_side] || carData.drive_side
    : null;
  const trimList: string[] =
    carData.trim_levels_list && carData.trim_levels_list.length > 0
      ? carData.trim_levels_list
      : carData.trim_levels
      ? carData.trim_levels
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  const specItems = [
    {
      icon: <Fuel className="h-4 w-4 text-primary" />,
      label: "Body Type",
      value: bodyTypeLabel,
    },
    {
      icon: <Settings className="h-4 w-4 text-primary" />,
      label: "Import Type",
      value: importLabel,
    },
    {
      icon: <Gauge className="h-4 w-4 text-primary" />,
      label: "Drive Side",
      value: driveLabel,
    },
    {
      icon: <Calendar className="h-4 w-4 text-primary" />,
      label: "Year",
      value: carData.year ? String(carData.year) : null,
    },
    { icon: null, label: "Trim Levels", value: trimList.join(", ") || null },
  ].filter((s) => s.value);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      <Navbar />

      <motion.main
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex-1"
      >
        {/* Breadcrumb */}
        <div className="bg-secondary py-4 transition-colors">
          <div className="container mx-auto px-4">
            <Link
              to="/car-options"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Car Options
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* ── Image Gallery ── */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm bg-secondary/30">
                {images.length > 0 ? (
                  <>
                    <img
                      src={images[currentImageIndex]}
                      alt={carTitle}
                      className="w-full h-[420px] object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                      }}
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/85 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 rounded-full p-2 shadow transition"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/85 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 rounded-full p-2 shadow transition"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    {carData.status && (
                      <span
                        className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold capitalize shadow ${
                          STATUS_COLORS[carData.status] || "bg-gray-600 text-white"
                        }`}
                      >
                        {carData.status}
                      </span>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                ) : (
                  <img
                    src="/placeholder-car.jpg"
                    alt="No car image"
                    className="w-full h-[420px] object-cover"
                  />
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`border-2 rounded-lg overflow-hidden transition-all ${
                        currentImageIndex === idx
                          ? "border-primary scale-105"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="h-16 w-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Car Info ── */}
            <div className="bg-card border border-border rounded-2xl p-7 space-y-5 shadow-sm">

              {/* Title row */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground leading-tight">
                    {carTitle}
                  </h1>
                  {(importLabel || driveLabel) && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {[importLabel, driveLabel].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
                {bodyTypeLabel && (
                  <span className="bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-sm font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {bodyTypeLabel}
                  </span>
                )}
              </div>

              {/* Trim Levels */}
              {trimList.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Trim Levels
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {trimList.map((trim) => (
                      <span
                        key={trim}
                        className="border border-border rounded-full px-4 py-1 text-sm text-foreground bg-secondary/60"
                      >
                        {trim}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-border" />

              {/* Price */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                  Price Range
                </p>
                <p className="text-3xl font-display font-bold text-foreground tracking-tight">
                  {carData.price_from
                    ? `KES ${Number(carData.price_from).toLocaleString()}${
                        carData.price_to
                          ? ` – ${Number(carData.price_to).toLocaleString()}`
                          : ""
                      }`
                    : "Price on Request"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Varies by trim, mileage, grade &amp; year
                </p>
              </div>

              <div className="border-t border-border" />

              {/* Quick specs */}
              {specItems.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {specItems.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-2.5 bg-secondary/50 dark:bg-muted/20 rounded-xl px-4 py-3"
                    >
                      {s.icon && (
                        <span className="flex-shrink-0">{s.icon}</span>
                      )}
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                          {s.label}
                        </p>
                        <p className="text-sm font-semibold text-foreground capitalize truncate">
                          {s.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-border" />

              {/* CTAs */}
              <div className="flex flex-wrap gap-2.5">
                <Button
                  onClick={() => setSelectedCar(carData)}
                  className="flex-1 min-w-[110px]"
                >
                  <Mail className="mr-2 h-4 w-4" /> Enquiry
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="flex-1 min-w-[110px] bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </Button>
                <Button
                  onClick={handleCall}
                  variant="outline"
                  className="flex-1 min-w-[110px]"
                >
                  <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
              </div>
            </div>
          </div>

          {/* ── Features + Description ── */}
          <div className="mt-10 space-y-6">
            {carData.features && (
              <div className="bg-card border border-border rounded-2xl p-7">
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">
                  Key Features
                </h2>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {carData.features
                    .split("\n")
                    .filter((f) => f.trim())
                    .map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            <div className="bg-card border border-border rounded-2xl p-7">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">
                About This Vehicle
              </h2>
              {carData.description ? (
                <div
                  className="prose dark:prose-invert max-w-none leading-relaxed text-muted-foreground text-sm"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(carData.description, {
                      ALLOWED_TAGS: [
                        "p", "br", "strong", "b", "em", "i", "u",
                        "h1", "h2", "h3", "h4", "h5", "h6",
                        "blockquote", "ol", "ul", "li", "a", "img",
                        "table", "thead", "tbody", "tr", "th", "td",
                        "code", "pre", "hr", "span", "div", "figure", "figcaption",
                      ],
                      ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "class", "style", "title"],
                    }),
                  }}
                />
              ) : (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  No detailed description is available for this vehicle.
                </p>
              )}
            </div>
          </div>

          {/* ── Similar Vehicles ── */}
          {similarCars.length > 0 && (
            <div className="mt-12">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                    You May Also Like
                  </p>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Similar Vehicles
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {bodyTypeLabel
                      ? `Other ${bodyTypeLabel}s in a similar price range`
                      : "Vehicles you might be interested in"}
                  </p>
                </div>
                <Link
                  to="/car-options"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline underline-offset-4"
                >
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {similarCars.map((car) => (
                  <Link
                    key={car.id}
                    to={`/car-options/${car.id}`}
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-large hover:-translate-y-1 transition-all duration-300 block"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={
                          car.images && car.images.length > 0
                            ? getImageSrc(car.images[0])
                            : "/placeholder-car.jpg"
                        }
                        alt={car.name || car.body_type || "Vehicle"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      {car.body_type && (
                        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                          {BODY_TYPE_LABELS[car.body_type] || car.body_type}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {car.name ||
                          `${car.make || ""} ${car.model || ""}`.trim() ||
                          "Imported Vehicle"}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {[
                          car.year && String(car.year),
                          car.import_type && IMPORT_LABELS[car.import_type],
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      <p className="font-display font-bold text-foreground text-sm">
                        KES {Number(car.price_from).toLocaleString()}
                        {car.price_to && (
                          <span className="font-normal text-muted-foreground text-xs">
                            {" "}– {Number(car.price_to).toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-6 sm:hidden">
                <Link
                  to="/car-options"
                  className="inline-flex items-center gap-2 text-sm text-primary font-medium underline underline-offset-4"
                >
                  View all vehicles <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.main>

      {selectedCar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-card rounded-2xl max-h-[90vh] overflow-y-auto w-full max-w-xl shadow-large">
            <CarInventoryEnquiry car={selectedCar} onClose={() => setSelectedCar(null)} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CarDetail;