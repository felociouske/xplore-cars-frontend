import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchCars } from "../services/api";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/fadeUp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarInventoryEnquiry from "../components/CarInventoryEnquiry";
import CarEnquiryForm from "../components/CarEnquiryForm";
import { SlidersHorizontal, X, Search, Fuel, Gauge, Car } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

interface CarImage {
  id: number;
  image: string;
}

interface CarItem {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  engine_type: string;
  transmission: string;
  mileage: number;
  price_from: number;
  price_to?: number;
  price_display: string;
  color: string;
  status: string;
  images?: CarImage[];
}

const STATUS_COLORS: Record<string, string> = {
  available: "bg-emerald-500 text-white",
  reserved: "bg-amber-400 text-stone-900",
  new: "bg-blue-600 text-white",
};

function Inventory() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    engine_type: "",
    status: "",
    transmission: "",
    min_year: "",
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

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.engine_type && car.engine_type !== filters.engine_type) return false;
      if (filters.status && car.status !== filters.status) return false;
      if (filters.transmission && car.transmission?.toLowerCase() !== filters.transmission) return false;
      if (filters.min_year && car.year < Number(filters.min_year)) return false;
      if (filters.max_price && car.price_from > Number(filters.max_price)) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !car.make?.toLowerCase().includes(q) &&
          !car.model?.toLowerCase().includes(q) &&
          !car.name?.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [cars, filters]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const clearFilters = () =>
    setFilters({ search: "", engine_type: "", status: "", transmission: "", min_year: "", max_price: "" });

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
          <motion.p className="text-blue-200 text-sm uppercase tracking-widest font-medium mb-2"
            variants={fadeUp} initial="hidden" animate="visible">
            Imported Direct from Japan
          </motion.p>
          <motion.h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3"
            variants={fadeUp} initial="hidden" animate="visible">
            Vehicle Inventory
          </motion.h1>
          <motion.p className="text-blue-100/80 max-w-xl mx-auto"
            variants={fadeUp} initial="hidden" animate="visible">
            Every vehicle personally inspected, verified, and imported with full documentation.
          </motion.p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-10">

        {/* Search + Filter bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by make, model or name..."
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
            <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-destructive transition">
              <X className="h-4 w-4" /> Clear
            </button>
          )}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6 mb-8 grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {[
              { label: "Engine", key: "engine_type", options: [["", "All Engines"], ["petrol", "Petrol"], ["diesel", "Diesel"], ["hybrid", "Hybrid"], ["electric", "Electric"]] },
              { label: "Status", key: "status", options: [["", "All Statuses"], ["available", "Available"], ["reserved", "Reserved"], ["new", "New"]] },
              { label: "Transmission", key: "transmission", options: [["", "All"], ["automatic", "Automatic"], ["manual", "Manual"]] },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{label}</label>
                <select
                  value={filters[key as keyof typeof filters]}
                  onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {options.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
                </select>
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Min Year</label>
              <input type="number" placeholder="e.g. 2018" value={filters.min_year}
                onChange={(e) => setFilters({ ...filters, min_year: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Max Price (KES)</label>
              <input type="number" placeholder="e.g. 2000000" value={filters.max_price}
                onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </motion.div>
        )}

        <p className="text-sm text-muted-foreground mb-6">
          Showing <span className="font-semibold text-foreground">{filteredCars.length}</span> vehicle{filteredCars.length !== 1 ? "s" : ""}
          {activeFilterCount > 0 && " matching your filters"}
        </p>

        {/* Grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-20">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground">No vehicles match your filters.</p>
            <button onClick={clearFilters} className="mt-3 text-primary underline underline-offset-4 text-sm">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-large hover:-translate-y-1 transition-all duration-300"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="relative overflow-hidden h-60">
                  <img
                    src={getImageUrl(car)}
                    alt={car.name || `${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold capitalize ${STATUS_COLORS[car.status] || "bg-gray-600 text-white"}`}>
                    {car.status}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {car.name || `${car.make} ${car.model}`}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {car.make} {car.model} &middot; {car.year}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.engine_type && (
                      <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-lg capitalize flex items-center gap-1">
                        <Fuel className="h-3 w-3 text-primary" /> {car.engine_type}
                      </span>
                    )}
                    {car.transmission && (
                      <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-lg capitalize">
                        {car.transmission}
                      </span>
                    )}
                    {car.mileage && (
                      <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Gauge className="h-3 w-3 text-primary" /> {car.mileage.toLocaleString()} km
                      </span>
                    )}
                  </div>

                  {/* Price range */}
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
              {["Pre-shipment inspection (PSI)", "Full auction sheet verification", "Accident history check", "KEBS compliance check"].map((item) => (
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