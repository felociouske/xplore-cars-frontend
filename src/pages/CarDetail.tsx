import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Phone, MessageCircle, Mail, ArrowLeft,
  Gauge, Settings, Fuel, Calendar, ChevronLeft, ChevronRight,
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
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  price_from: number;
  price_to?: number;
  price_display: string;
  engine_type: string;
  transmission: string;
  mileage: number;
  color: string;
  grade?: string;
  status?: string;
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

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
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
        const foundCar = cars.find((car: CarData) => String(car.id) === id);
        if (!foundCar) return setCarData(null);
        setCarData(foundCar);
        const fullImages = (foundCar.images || []).map((img: any) => {
          const src = typeof img === "string" ? img : img.image;
          return src?.startsWith("http") ? src : `${API_BASE_URL.replace('/api', '')}${src}`;
        });
        setImages(fullImages);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast({ title: "Error loading car details." });
      } finally {
        setLoading(false);
      }
    }
    loadCarDetails();
  }, [id]);

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

  const handleNextImage = () => setCurrentImageIndex((p) => (p + 1) % images.length);
  const handlePrevImage = () => setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi, I'm interested in the ${carData.name || `${carData.make} ${carData.model}`} listed on your website.`);
    window.open(`https://wa.me/254757356989?text=${msg}`, "_blank");
  };
  const handleCall = () => { window.location.href = `tel:+254757356989`; };
  const handleEmail = () => {
    const s = encodeURIComponent(`Inquiry about ${carData.name || carData.make}`);
    const b = encodeURIComponent(`Hello, I'm interested in this vehicle. Please provide more details.`);
    window.location.href = `mailto:localsays@gmail.com?subject=${s}&body=${b}`;
  };

  const carTitle = carData.name || `${carData.make} ${carData.model}`;
  const bodyTypeLabel = carData.body_type ? (BODY_TYPE_LABELS[carData.body_type] || carData.body_type) : null;
  const importLabel = carData.import_type ? (IMPORT_LABELS[carData.import_type] || carData.import_type) : null;
  const driveLabel = carData.drive_side ? (DRIVE_LABELS[carData.drive_side] || carData.drive_side) : null;
  const trimList: string[] =
    carData.trim_levels_list && carData.trim_levels_list.length > 0
      ? carData.trim_levels_list
      : carData.trim_levels
        ? carData.trim_levels.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

  const specItems = [
    { icon: <Fuel className="h-4 w-4 text-primary" />, label: "Engine", value: carData.engine_type },
    { icon: <Settings className="h-4 w-4 text-primary" />, label: "Transmission", value: carData.transmission },
    { icon: <Gauge className="h-4 w-4 text-primary" />, label: "Mileage", value: carData.mileage ? `${carData.mileage.toLocaleString()} km` : null },
    { icon: <Calendar className="h-4 w-4 text-primary" />, label: "Year", value: String(carData.year) },
    {
      icon: (
        <svg className="h-4 w-4 text-yellow-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      label: "Grade", value: carData.grade,
    },
    { icon: null, label: "Color", value: carData.color },
  ].filter((s) => s.value);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      <Navbar />

      <motion.main variants={fadeUp} initial="hidden" animate="visible" className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-secondary py-4 transition-colors">
          <div className="container mx-auto px-4">
            <Link to="/car-options" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
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
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
                    />
                    {images.length > 1 && (
                      <>
                        <button onClick={handlePrevImage} className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/85 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 rounded-full p-2 shadow transition">
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button onClick={handleNextImage} className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/85 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 rounded-full p-2 shadow transition">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    {carData.status && (
                      <span className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold capitalize shadow ${STATUS_COLORS[carData.status] || "bg-gray-600 text-white"}`}>
                        {carData.status}
                      </span>
                    )}
                  </>
                ) : (
                  <img src="/placeholder-car.jpg" alt="No car image" className="w-full h-[420px] object-cover" />
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {images.map((img, idx) => (
                    <button key={idx} onClick={() => setCurrentImageIndex(idx)}
                      className={`border-2 rounded-lg overflow-hidden transition-all ${currentImageIndex === idx ? "border-primary scale-105" : "border-border hover:border-primary/50"}`}>
                      <img src={img} alt={`View ${idx + 1}`} className="h-16 w-20 object-cover" />
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
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Trim Levels</p>
                  <div className="flex flex-wrap gap-2">
                    {trimList.map((trim) => (
                      <span key={trim} className="border border-border rounded-full px-4 py-1 text-sm text-foreground bg-secondary/60">
                        {trim}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-border" />

              {/* Price */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">Price Range</p>
                <p className="text-3xl font-display font-bold text-foreground tracking-tight">
                  {carData.price_from
                    ? `KES ${Number(carData.price_from).toLocaleString()}${carData.price_to ? ` – ${Number(carData.price_to).toLocaleString()}` : ""}`
                    : "Price on Request"
                  }
                </p>
                <p className="text-xs text-muted-foreground mt-1">Varies by trim, mileage, grade &amp; year</p>
              </div>

              <div className="border-t border-border" />

              {/* Quick specs */}
              {specItems.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {specItems.map((s) => (
                    <div key={s.label} className="flex items-center gap-2.5 bg-secondary/50 dark:bg-muted/20 rounded-xl px-4 py-3">
                      {s.icon && <span className="flex-shrink-0">{s.icon}</span>}
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{s.label}</p>
                        <p className="text-sm font-semibold text-foreground capitalize truncate">{s.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-border" />

              {/* CTAs */}
              <div className="flex flex-wrap gap-2.5">
                <Button onClick={() => setSelectedCar(carData)} className="flex-1 min-w-[110px]">
                  <Mail className="mr-2 h-4 w-4" /> Enquiry
                </Button>
                <Button onClick={handleWhatsApp} className="flex-1 min-w-[110px] bg-green-600 hover:bg-green-700">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </Button>
                <Button onClick={handleCall} variant="outline" className="flex-1 min-w-[110px]">
                  <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
              </div>
            </div>
          </div>

          {/* ── Features + Description ── */}
          <div className="mt-10 space-y-6">
            {carData.features && (
              <div className="bg-card border border-border rounded-2xl p-7">
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">Key Features</h2>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {carData.features.split("\n").filter((f) => f.trim()).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-card border border-border rounded-2xl p-7">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">About This Vehicle</h2>
              {carData.description ? (
                <div className="prose dark:prose-invert max-w-none leading-relaxed text-muted-foreground text-sm">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{carData.description}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  No detailed description is available for this vehicle.
                </p>
              )}
            </div>
          </div>
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