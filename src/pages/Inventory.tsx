import React, { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCars } from "../services/api";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/fadeUp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarInventoryEnquiry from "../components/CarInventoryEnquiry";
import CarEnquiryForm from "../components/CarEnquiryForm";
import { SlidersHorizontal, X, Search, Car } from "lucide-react";

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

function Inventory() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
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

  // Derive unique makes from loaded cars for the filter dropdown
  const uniqueMakes = useMemo(
    () => Array.from(new Set(cars.map((c) => c.make).filter(Boolean))).sort() as string[],
    [cars]
  );

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
        ) return false;
      }
      return true;
    });
  }, [cars, filters]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

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
    });

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
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <motion.p
            className="text-blue-200 text-sm uppercase tracking-widest font-medium mb-2"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            Imported Direct from Japan
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-white mb-3"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            Vehicle Inventory
          </motion.h1>
          <motion.p
            className="text-blue-100/80 max-w-xl mx-auto"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            Every vehicle personally inspected, verified, and imported with full documentation.
          </motion.p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-10">

        {/* Search + Filter toggle bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by make, model or body type..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl bg-card text-foreground hover:border-primary transition font-medium text-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-destructive transition"
            >
              <X className="h-4 w-4" /> Clear all
            </button>
          )}
        </div>

        {/* Advanced filter panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {/* Make */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Make</label>
              <select
                value={filters.make}
                onChange={(e) => setFilters({ ...filters, make: e.target.value, model: "", year: "" })}
                className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">All Makes</option>
                {uniqueMakes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Body Type</label>
              <select
                value={filters.body_type}
                onChange={(e) => setFilters({ ...filters, body_type: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">All Body Types</option>
                {Object.entries(BODY_TYPE_LABELS).map(([val, lbl]) => (
                  <option key={val} value={val}>{lbl}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">All Categories</option>
                {Object.entries(CATEGORY_LABELS).map(([val, lbl]) => (
                  <option key={val} value={val}>{lbl}</option>
                ))}
              </select>
            </div>

            {/* Import Type */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Import Type</label>
              <select
                value={filters.import_type}
                onChange={(e) => setFilters({ ...filters, import_type: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">All Imports</option>
                <option value="japan_import">Japan Import</option>
                <option value="local">Local</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Min Price (KES)</label>
              <input
                type="number"
                placeholder="e.g. 500000"
                value={filters.min_price}
                onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Max Price (KES)</label>
              <input
                type="number"
                placeholder="e.g. 2000000"
                value={filters.max_price}
                onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </motion.div>
        )}

        <p className="text-sm text-muted-foreground mb-6">
          Showing <span className="font-semibold text-foreground">{filteredCars.length}</span>{" "}
          vehicle{filteredCars.length !== 1 ? "s" : ""}
          {activeFilterCount > 0 && " matching your filters"}
        </p>

        {/* Car grid */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-large hover:-translate-y-1 transition-all duration-300"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="relative overflow-hidden h-60">
                  <img
                    src={getImageUrl(car)}
                    alt={car.name || car.body_type || "Vehicle"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Category badge on image */}
                  {car.category && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                        {CATEGORY_LABELS[car.category] || car.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {car.name || `${car.make || ""} ${car.model || ""}`.trim() || "Imported Vehicle"}
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
                    {car.drive_side && (
                      <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-lg uppercase">
                        {car.drive_side}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Price</p>
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
            <img src="/image.png" alt="Vehicle inspection" className="w-full h-full object-cover" />
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