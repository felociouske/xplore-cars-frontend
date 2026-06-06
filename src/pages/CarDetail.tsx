import { useState, useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  Phone, MessageCircle, Mail, ArrowLeft, ArrowRight,
  ChevronLeft, ChevronRight, ShieldCheck, Clock, BadgeCheck,
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
  hatchback: "Hatchback", sedan: "Sedan", suv: "SUV", crossover: "Crossover",
  wagon: "Wagon", minivan: "Minivan", pickup: "Pickup", coupe: "Coupe",
  convertible: "Convertible", van: "Van",
};

const IMPORT_LABELS: Record<string, string> = {
  japan_import: "Japan Import", local: "Local", uk_import: "UK Import",
};

const DRIVE_LABELS: Record<string, string> = {
  rhd: "Right Hand Drive", lhd: "Left Hand Drive",
};

const CATEGORY_LABELS: Record<string, string> = {
  available_to_import: "Available to Import",
  successful_import: "Successful Import",
  popular_in_kenya: "Popular in Kenya",
};

function getImageSrc(img: any): string {
  const src = typeof img === "string" ? img : img?.image;
  if (!src) return "/placeholder-car.jpg";
  return src.startsWith("http") ? src : `${API_BASE_URL.replace("/api", "")}${src}`;
}

function scoreSimilarity(current: CarData, candidate: CarData): number {
  let score = 0;
  if (candidate.body_type && candidate.body_type === current.body_type) score += 10;
  if (candidate.make && candidate.make === current.make) score += 5;
  if (candidate.import_type && candidate.import_type === current.import_type) score += 3;
  if (current.price_from && candidate.price_from) {
    const diff = Math.abs(candidate.price_from - current.price_from) / current.price_from;
    if (diff <= 0.15) score += 4;
    else if (diff <= 0.30) score += 2;
  }
  return score;
}

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Verified Import", sub: "Auction sheet checked" },
  { icon: BadgeCheck, label: "KRA Compliant", sub: "Duties handled for you" },
  { icon: Clock, label: "Fast Turnaround", sub: "60–90 day delivery" },
];

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [allCars, setAllCars] = useState<CarData[]>([]);
  const [carData, setCarData] = useState<CarData | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [thumbsRef, setThumbsRef] = useState<HTMLDivElement | null>(null);

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

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [id]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbsRef) return;
    const active = thumbsRef.querySelector(`[data-idx="${currentImageIndex}"]`) as HTMLElement;
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [currentImageIndex, thumbsRef]);

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

  const handleNext = () => setCurrentImageIndex((p) => (p + 1) % images.length);
  const handlePrev = () => setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);

  const handleWhatsApp = () => {
    const vehicle = carData.name || `${carData.make || ""} ${carData.model || ""}`.trim() || "this vehicle";
    const msg = encodeURIComponent(`Hi, I'm interested in the ${vehicle} listed on your website. Could you please send me more details?`);
    window.open(`https://wa.me/254757356989?text=${msg}`, "_blank");
  };
  const handleCall = () => { window.location.href = `tel:+254757356989`; };

  const carTitle = carData.name || `${carData.make || ""} ${carData.model || ""}`.trim() || carData.body_type || "Imported Vehicle";
  const bodyTypeLabel = carData.body_type ? (BODY_TYPE_LABELS[carData.body_type] || carData.body_type) : null;
  const importLabel = carData.import_type ? (IMPORT_LABELS[carData.import_type] || carData.import_type) : null;
  const driveLabel = carData.drive_side ? (DRIVE_LABELS[carData.drive_side] || carData.drive_side) : null;
  const categoryLabel = carData.category ? (CATEGORY_LABELS[carData.category] || carData.category) : null;
  const trimList: string[] =
    carData.trim_levels_list?.length
      ? carData.trim_levels_list
      : carData.trim_levels
        ? carData.trim_levels.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

  const specRows = [
    { iconClass: "ti ti-car", label: "Body Type", value: bodyTypeLabel },
    { iconClass: "ti ti-world", label: "Import Type", value: importLabel },
    { iconClass: "ti ti-steering-wheel", label: "Drive Side", value: driveLabel },
    { iconClass: "ti ti-calendar", label: "Year", value: carData.year ? String(carData.year) : null },
    { iconClass: "ti ti-tag", label: "Category", value: categoryLabel },
    { iconClass: "ti ti-list", label: "Trim Levels", value: trimList.join(", ") || null },
  ].filter((r) => r.value);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />

      <div className="min-h-screen flex flex-col bg-background transition-colors">
        <Navbar />

        {/* ── Breadcrumb ── */}
        <div className="bg-secondary/60 border-b border-border py-3 transition-colors">
          <div className="container mx-auto px-4">
            <Link to="/car-options" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Inventory
            </Link>
          </div>
        </div>

        <motion.main variants={fadeUp} initial="hidden" animate="visible" className="flex-1">

          {/* ── HERO IMAGE — full width ── */}
          <div className="relative w-full bg-black" style={{ height: "clamp(280px, 55vw, 600px)" }}>
            {images.length > 0 ? (
              <img
                src={images[currentImageIndex]}
                alt={carTitle}
                className="w-full h-full object-cover opacity-95"
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
              />
            ) : (
              <img src="/placeholder-car.jpg" alt={carTitle} className="w-full h-full object-cover" />
            )}

            {/* Dark vignette bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

            {/* Status badge */}
            {carData.status && (
              <span className={`absolute top-5 left-5 text-xs px-3 py-1.5 rounded-full font-semibold capitalize shadow-lg ${STATUS_COLORS[carData.status] || "bg-gray-600 text-white"}`}>
                {carData.status}
              </span>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Prev / Next arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white flex items-center justify-center transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white flex items-center justify-center transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Car title overlay at bottom of hero */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pointer-events-none">
              <div className="container mx-auto">
                <div className="flex flex-wrap items-end gap-3">
                  <div>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">
                      {[importLabel, carData.year && String(carData.year)].filter(Boolean).join(" · ")}
                    </p>
                    <h1 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                      {carTitle}
                    </h1>
                  </div>
                  {bodyTypeLabel && (
                    <span className="mb-0.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {bodyTypeLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Thumbnail strip ── */}
          {images.length > 1 && (
            <div className="bg-black/90 border-b border-white/10">
              <div
                ref={setThumbsRef}
                className="container mx-auto px-4 flex gap-2 overflow-x-auto py-3 scrollbar-none"
                style={{ scrollbarWidth: "none" }}
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    data-idx={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                      currentImageIndex === idx
                        ? "ring-2 ring-primary ring-offset-1 ring-offset-black opacity-100 scale-105"
                        : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="h-14 w-20 object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Main content: specs left, sticky panel right ── */}
          <div className="container mx-auto px-4 py-10 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-10 items-start">

              {/* ── LEFT: Specs + Features + Description ── */}
              <div className="flex-1 min-w-0 space-y-8">

                {/* Spec table */}
                {specRows.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border">
                      <h2 className="font-display text-lg font-bold text-foreground">Vehicle Specifications</h2>
                    </div>
                    <div className="divide-y divide-border">
                      {specRows.map((row) => (
                        <div key={row.label} className="flex items-center gap-4 px-6 py-4 hover:bg-secondary/30 transition-colors">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <i className={row.iconClass} style={{ color: "hsl(var(--primary))", fontSize: "18px" }} aria-hidden="true" />
                          </div>
                          <span className="text-sm text-muted-foreground w-32 flex-shrink-0">{row.label}</span>
                          <span className="text-sm font-semibold text-foreground capitalize flex-1">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trim levels */}
                {trimList.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="font-display text-lg font-bold text-foreground mb-4">Available Trim Levels</h2>
                    <div className="flex flex-wrap gap-2">
                      {trimList.map((trim) => (
                        <span key={trim} className="border border-border bg-secondary/60 rounded-full px-4 py-1.5 text-sm font-medium text-foreground">
                          {trim}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features */}
                {carData.features && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="font-display text-lg font-bold text-foreground mb-4">Key Features</h2>
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                      {carData.features.split("\n").filter((f) => f.trim()).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <i className="ti ti-check" style={{ color: "hsl(var(--primary))", fontSize: "12px" }} aria-hidden="true" />
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Description */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">About This Vehicle</h2>
                  {carData.description ? (
                    <div
                      className="prose dark:prose-invert max-w-none leading-relaxed text-muted-foreground text-sm"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(carData.description, {
                          ALLOWED_TAGS: ["p","br","strong","b","em","i","u","h1","h2","h3","h4","h5","h6",
                            "blockquote","ol","ul","li","a","img","table","thead","tbody","tr","th","td",
                            "code","pre","hr","span","div","figure","figcaption"],
                          ALLOWED_ATTR: ["href","target","rel","src","alt","class","style","title"],
                        }),
                      }}
                    />
                  ) : (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      No detailed description available for this vehicle. Contact us for more information.
                    </p>
                  )}
                </div>
              </div>

              {/* ── RIGHT: Sticky enquiry panel ── */}
              <div className="w-full lg:w-[360px] flex-shrink-0">
                <div className="lg:sticky lg:top-6 space-y-4">

                  {/* Price + CTA card */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5">

                    {/* Price */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                        Estimated Price
                      </p>
                      <p className="font-display text-3xl font-bold text-foreground tracking-tight leading-none">
                        {carData.price_from
                          ? `KES ${Number(carData.price_from).toLocaleString()}`
                          : "Price on Request"}
                      </p>
                      {carData.price_to && (
                        <p className="text-muted-foreground text-sm mt-1">
                          up to KES {Number(carData.price_to).toLocaleString()}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Varies by trim, mileage, grade &amp; year of manufacture
                      </p>
                    </div>

                    <div className="border-t border-border" />

                    {/* Primary CTA */}
                    <button
                      onClick={() => setSelectedCar(carData)}
                      className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-display font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Send Enquiry
                    </button>

                    {/* Secondary CTAs */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleWhatsApp}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 text-sm font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </button>
                      <button
                        onClick={handleCall}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-border text-foreground text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        Call Us
                      </button>
                    </div>

                    <div className="border-t border-border" />

                    {/* Trust badges */}
                    <div className="space-y-3">
                      {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                        <div key={label} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground">{sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* "Can't find what you need?" card */}
                  <div className="bg-secondary/50 border border-border rounded-2xl p-5 text-center">
                    <p className="text-sm font-semibold text-foreground mb-1">Not exactly what you need?</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Tell us what you're looking for and we'll source it directly from Japan for you.
                    </p>
                    <Link
                      to="/car-options"
                      className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline underline-offset-4"
                    >
                      Browse all vehicles <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Similar Vehicles ── */}
            {similarCars.length > 0 && (
              <div className="mt-16 pt-12 border-t border-border">
                <div className="flex items-end justify-between mb-8">
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
                          src={car.images?.length ? getImageSrc(car.images[0]) : "/placeholder-car.jpg"}
                          alt={car.name || car.body_type || "Vehicle"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        {car.body_type && (
                          <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                            {BODY_TYPE_LABELS[car.body_type] || car.body_type}
                          </span>
                        )}
                        {/* Price on image */}
                        <div className="absolute bottom-2 left-3 right-3">
                          <p className="font-display font-bold text-white text-sm drop-shadow">
                            KES {Number(car.price_from).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                          {car.name || `${car.make || ""} ${car.model || ""}`.trim() || "Imported Vehicle"}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {[car.year && String(car.year), car.import_type && IMPORT_LABELS[car.import_type]]
                            .filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="text-center mt-6 sm:hidden">
                  <Link to="/car-options" className="inline-flex items-center gap-2 text-sm text-primary font-medium underline underline-offset-4">
                    View all vehicles <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.main>

        {/* Enquiry modal */}
        {selectedCar && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-card rounded-2xl max-h-[90vh] overflow-y-auto w-full max-w-xl shadow-large">
              <CarInventoryEnquiry car={selectedCar} onClose={() => setSelectedCar(null)} />
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default CarDetail;