import React, { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCars } from "../services/api";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/fadeUp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarInventoryEnquiry from "../components/CarInventoryEnquiry";
import CarEnquiryForm from "../components/CarEnquiryForm";
import { X, Search, Car, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

interface CarImage {
  id: number;
  image: string;
}

interface CarItem {
  id: number;
  name?: string;
  make?: string;
  model?: string;
  year?: number;
  category?: string;
  price_from: number;
  price_to?: number;
  price_display: string;
  images?: CarImage[];
  body_type?: string;
  import_type?: string;
  drive_side?: string;
  trim_levels?: string;
  trim_levels_list?: string[];
}

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
};

const CATEGORY_LABELS: Record<string, string> = {
  available_to_import: "Available to Import",
  successful_import: "Successful Import",
  popular_in_kenya: "Popular in Kenya",
};

// Price preset chips (values in KES)
const PRICE_PRESETS = [
  { label: "Under 1M",  max: 1_000_000 },
  { label: "Under 2M",  max: 2_000_000 },
  { label: "Under 3M",  max: 3_000_000 },
  { label: "Under 5M",  max: 5_000_000 },
  { label: "Under 8M",  max: 8_000_000 },
  { label: "8M+",       min: 8_000_000 },
];

function Inventory() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: "",
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
    year: searchParams.get("year") || "",
    body_type: "",
    import_type: "",
    category: "",
    min_price: "",
    max_price: "",
    price_preset: "", // tracks which chip is active
  });

  useEffect(() => {
    async function loadCars() {
      const data = await fetchCars();
      setCars(data);
      setLoading(false);
    }
    loadCars();
  }, []);

  const getImageUrl = (car: CarItem): string => {
    if (!car.images || car.images.length === 0) return "/placeholder-car.jpg";
    const img = car.images[0];
    const path = typeof img === "string" ? img : img.image;
    if (!path) return "/placeholder-car.jpg";
    return path.startsWith("http") ? path : `${API_BASE_URL.replace("/api", "")}${path}`;
  };

  const uniqueMakes = useMemo(
    () => Array.from(new Set(cars.map((c) => c.make).filter(Boolean))).sort() as string[],
    [cars]
  );

  const uniqueModels = useMemo(() => {
    const source = filters.make ? cars.filter((c) => c.make === filters.make) : cars;
    return Array.from(new Set(source.map((c) => c.model).filter(Boolean))).sort() as string[];
  }, [cars, filters.make]);

  const uniqueYears = useMemo(() => {
    const source = filters.make
      ? cars.filter((c) => c.make === filters.make)
      : cars;
    return Array.from(new Set(source.map((c) => c.year).filter(Boolean)))
      .sort((a, b) => (b as number) - (a as number)) as number[];
  }, [cars, filters.make]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.make && car.make !== filters.make) return false;
      if (filters.model && car.model !== filters.model) return false;
      if (filters.year && String(car.year) !== filters.year) return false;
      if (filters.body_type && car.body_type !== filters.body_type) return false;
      if (filters.import_type && car.import_type !== filters.import_type) return false;
      if (filters.category && car.category !== filters.category) return false;
      if (filters.min_price && car.price_from < Number(filters.min_price)) return false;
      if (filters.max_price && car.price_from > Number(filters.max_price)) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !car.name?.toLowerCase().includes(q) &&
          !car.make?.toLowerCase().includes(q) &&
          !car.model?.toLowerCase().includes(q) &&
          !car.body_type?.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [cars, filters]);

  const activeFilterCount = Object.entries(filters).filter(
    ([k, v]) => v && k !== "price_preset"
  ).length;

  const clearFilters = () =>
    setFilters({
      search: "",
      make: "",
      model: "",
      year: "",
      body_type: "",
      import_type: "",
      category: "",
      min_price: "",
      max_price: "",
      price_preset: "",
    });

  const applyPricePreset = (preset: typeof PRICE_PRESETS[number]) => {
    const isActive = filters.price_preset === preset.label;
    if (isActive) {
      setFilters({ ...filters, min_price: "", max_price: "", price_preset: "" });
    } else {
      setFilters({
        ...filters,
        min_price: preset.min ? String(preset.min) : "",
        max_price: preset.max ? String(preset.max) : "",
        price_preset: preset.label,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading vehicles...</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Sidebar Filter Panel (reused for both desktop & mobile) ──
  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Make, model, type…"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Make */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Brand / Make
        </label>
        <select
          value={filters.make}
          onChange={(e) =>
            setFilters({ ...filters, make: e.target.value, model: "", year: "" })
          }
          className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">All Makes</option>
          {uniqueMakes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Model */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Model
        </label>
        <select
          value={filters.model}
          onChange={(e) => setFilters({ ...filters, model: e.target.value })}
          disabled={uniqueModels.length === 0}
          className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
        >
          <option value="">All Models</option>
          {uniqueModels.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Year */}
      {uniqueYears.length > 0 && (
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">All Years</option>
            {uniqueYears.map((y) => (
              <option key={y} value={String(y)}>{y}</option>
            ))}
          </select>
        </div>
      )}

      {/* Body Type */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Body Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(BODY_TYPE_LABELS).map(([val, lbl]) => (
            <button
              key={val}
              onClick={() =>
                setFilters({ ...filters, body_type: filters.body_type === val ? "" : val })
              }
              className={`text-xs px-3 py-2 rounded-lg border font-medium transition-colors text-left ${
                filters.body_type === val
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground hover:border-primary/50 bg-background"
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Category
        </label>
        <div className="space-y-1.5">
          {Object.entries(CATEGORY_LABELS).map(([val, lbl]) => (
            <button
              key={val}
              onClick={() =>
                setFilters({ ...filters, category: filters.category === val ? "" : val })
              }
              className={`w-full text-left text-sm px-3 py-2 rounded-lg border font-medium transition-colors ${
                filters.category === val
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground hover:border-primary/50 bg-background"
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Import Type */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Import Type
        </label>
        <div className="flex gap-2">
          {Object.entries(IMPORT_LABELS).map(([val, lbl]) => (
            <button
              key={val}
              onClick={() =>
                setFilters({ ...filters, import_type: filters.import_type === val ? "" : val })
              }
              className={`flex-1 text-xs px-3 py-2 rounded-lg border font-medium transition-colors ${
                filters.import_type === val
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground hover:border-primary/50 bg-background"
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Budget / Price (KES)
        </label>
        {/* Preset chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => applyPricePreset(preset)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                filters.price_preset === preset.label
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground hover:border-primary/50 bg-background"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        {/* Manual inputs */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.min_price}
            onChange={(e) =>
              setFilters({ ...filters, min_price: e.target.value, price_preset: "" })
            }
            className="w-full border border-border rounded-lg px-3 py-2 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.max_price}
            onChange={(e) =>
              setFilters({ ...filters, max_price: e.target.value, price_preset: "" })
            }
            className="w-full border border-border rounded-lg px-3 py-2 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Clear all */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-destructive/40 text-destructive rounded-lg text-sm font-medium hover:bg-destructive/5 transition-colors"
        >
          <X className="h-4 w-4" />
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      <Navbar />

      {/* Page Banner */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-600 py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/inventory-banner.jpg"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <motion.p
            className="text-blue-200 text-sm uppercase tracking-widest font-medium mb-2"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Imported Direct from Japan
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-white mb-3"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Vehicle Inventory
          </motion.h1>
          <motion.p
            className="text-blue-100/80 max-w-xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Every vehicle personally inspected, verified, and imported with full documentation.
          </motion.p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-10">

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl bg-card text-foreground hover:border-primary transition font-medium text-sm w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {activeFilterCount}
                </span>
              )}
            </span>
            {mobileFiltersOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 bg-card border border-border rounded-2xl p-5"
            >
              <FilterPanel />
            </motion.div>
          )}
        </div>

        {/* Desktop: sidebar + grid layout */}
        <div className="flex gap-8 items-start">

          {/* ── Sidebar (desktop only) ── */}
          <aside className="hidden lg:block w-64 flex-shrink-0 bg-card border border-border rounded-2xl p-5 sticky top-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                Filters
              </h3>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <FilterPanel />
          </aside>

          {/* ── Main Grid ── */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-6">
              Showing{" "}
              <span className="font-semibold text-foreground">{filteredCars.length}</span>{" "}
              vehicle{filteredCars.length !== 1 ? "s" : ""}
              {activeFilterCount > 0 && " matching your filters"}
            </p>

            {filteredCars.length === 0 ? (
              <div className="text-center py-20">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
                <p className="text-muted-foreground">No vehicles match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 text-primary underline underline-offset-4 text-sm"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-large hover:-translate-y-1 transition-all duration-300"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                  >
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={getImageUrl(car)}
                        alt={car.name || car.body_type || "Vehicle"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      {car.category && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                            {CATEGORY_LABELS[car.category] || car.category}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {car.name ||
                          `${car.make || ""} ${car.model || ""}`.trim() ||
                          "Imported Vehicle"}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-3">
                        {[
                          car.year && String(car.year),
                          car.body_type && BODY_TYPE_LABELS[car.body_type],
                          car.import_type && IMPORT_LABELS[car.import_type],
                        ]
                          .filter(Boolean)
                          .join(" · ") || "Imported car"}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {car.body_type && (
                          <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-lg">
                            {BODY_TYPE_LABELS[car.body_type] || car.body_type}
                          </span>
                        )}
                        {car.make && (
                          <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-lg">
                            {car.make}
                          </span>
                        )}
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                          Price
                        </p>
                        <p className="font-display text-xl font-bold text-foreground">
                          KES {Number(car.price_from).toLocaleString()}
                          {car.price_to && (
                            <span className="text-muted-foreground font-normal text-base">
                              {" "}– {Number(car.price_to).toLocaleString()}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/car-options/${car.id}`}
                          className="flex-1 text-center bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => setSelectedCar(car)}
                          className="flex-1 text-center border-2 border-primary text-primary px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Verified section */}
        <section className="mt-20 grid md:grid-cols-2 gap-10 items-center py-12 border-t border-border">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              100% Verified Vehicles
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We perform thorough due diligence on each vehicle's history, usage, service records,
              accident history, and recall status before import.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Pre-shipment inspection (PSI)",
                "Full auction sheet verification",
                "Accident history check",
                "KEBS compliance check",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-64 rounded-2xl overflow-hidden bg-secondary">
            <img
              src="/image.png"
              alt="Vehicle inspection"
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </main>

      <section className="py-16 bg-secondary/40 dark:bg-muted/20 px-4">
        <div className="container mx-auto text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Looking for a specific vehicle?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tell us what you need and we will source it directly from Japan for you.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <CarEnquiryForm />
        </div>
      </section>

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
}

export default Inventory;