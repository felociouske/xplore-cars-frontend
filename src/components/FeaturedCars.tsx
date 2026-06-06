import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Fuel, Gauge, Calendar, X, Search } from "lucide-react";
import { fetchCars } from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

interface CarImage {
  id: number;
  image: string;
}

interface Car {
  id: number;
  name?: string;
  make?: string;
  model?: string;
  price_from: number;
  price_to?: number;
  price_display: string;
  images?: (string | CarImage)[];
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

const TOTAL_CARS_AVAILABLE = 3589;

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    body_type: "",
    search: "",
  });

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await fetchCars();
        setCars(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load cars:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

  const getImageUrl = (car: Car): string => {
    if (!car.images || car.images.length === 0) return "/placeholder-car.jpg";
    const first = car.images[0];
    const path = typeof first === "string" ? first : (first as CarImage).image;
    if (!path) return "/placeholder-car.jpg";
    return path.startsWith("http") ? path : `${API_BASE_URL.replace("/api", "")}${path}`;
  };

  // Derive unique makes/brands from loaded cars
  const uniqueBrands = useMemo(
    () => Array.from(new Set(cars.map((c) => c.make).filter(Boolean))).sort() as string[],
    [cars]
  );

  // Derive models filtered by selected brand
  const uniqueModels = useMemo(() => {
    const source = filters.brand ? cars.filter((c) => c.make === filters.brand) : cars;
    return Array.from(new Set(source.map((c) => c.model).filter(Boolean))).sort() as string[];
  }, [cars, filters.brand]);

  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        if (filters.brand && car.make !== filters.brand) return false;
        if (filters.model && car.model !== filters.model) return false;
        if (filters.body_type && car.body_type !== filters.body_type) return false;
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
      })
      .slice(0, 100);
  }, [cars, filters]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const clearFilters = () => setFilters({ brand: "", model: "", body_type: "", search: "" });

  const formatPrice = (car: Car): string => {
    if (!car.price_from) return "Price on Request";
    const from = `KES ${Number(car.price_from).toLocaleString()}`;
    if (car.price_to) return `${from} – ${Number(car.price_to).toLocaleString()}`;
    return from;
  };

  const displayedCount = filteredCars.length;
  const hasFilters = activeFilterCount > 0;

  return (
    <section className="py-20 bg-secondary/40 dark:bg-muted/20 transition-colors">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Available Cars for Import
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg">
                Handpicked, inspected, and imported directly from Japan. Every car comes fully verified.
              </p>
            </div>
          </div>
        </div>

        {/* ── Always-Visible Filter Bar ── */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search make or model…"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Brand */}
            <select
              value={filters.brand}
              onChange={(e) =>
                setFilters({ ...filters, brand: e.target.value, model: "" })
              }
              className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">All Brands</option>
              {uniqueBrands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Model */}
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

            {/* Body Type + Clear */}
            <div className="flex gap-2">
              <select
                value={filters.body_type}
                onChange={(e) => setFilters({ ...filters, body_type: e.target.value })}
                className="flex-1 border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">All Body Types</option>
                {Object.entries(BODY_TYPE_LABELS).map(([val, lbl]) => (
                  <option key={val} value={val}>{lbl}</option>
                ))}
              </select>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  title="Clear filters"
                  className="p-2.5 border border-border rounded-lg hover:border-destructive hover:text-destructive transition text-muted-foreground flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
              {filters.brand && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                  Brand: {filters.brand}
                  <button onClick={() => setFilters({ ...filters, brand: "", model: "" })}><X className="h-3 w-3" /></button>
                </span>
              )}
              {filters.model && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                  Model: {filters.model}
                  <button onClick={() => setFilters({ ...filters, model: "" })}><X className="h-3 w-3" /></button>
                </span>
              )}
              {filters.body_type && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                  {BODY_TYPE_LABELS[filters.body_type] || filters.body_type}
                  <button onClick={() => setFilters({ ...filters, body_type: "" })}><X className="h-3 w-3" /></button>
                </span>
              )}
              {filters.search && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                  "{filters.search}"
                  <button onClick={() => setFilters({ ...filters, search: "" })}><X className="h-3 w-3" /></button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing{" "}
            <span className="font-semibold text-foreground">{displayedCount}</span>{" "}
            vehicle{displayedCount !== 1 ? "s" : ""}
            {hasFilters && " matching your filters"}
            {displayedCount === 100 && (
              <span className="ml-1 text-primary font-medium">
                · Showing top 100 —{" "}
                <Link to="/car-options" className="underline underline-offset-2">view all</Link>
              </span>
            )}
          </p>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>No vehicles match your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-3 text-primary underline underline-offset-4 text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-large hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-60">
                  <img
                    src={getImageUrl(car)}
                    alt={car.name || car.body_type || "Vehicle"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="font-display text-lg font-bold text-white drop-shadow">
                      {formatPrice(car)}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {car.name ||
                      `${car.make || ""} ${car.model || ""}`.trim() ||
                      car.body_type ||
                      "Imported Vehicle"}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                    {car.body_type && (
                      <span className="flex items-center gap-1.5 capitalize">
                        <Calendar className="h-4 w-4 text-primary" />
                        {BODY_TYPE_LABELS[car.body_type] || car.body_type}
                      </span>
                    )}
                    {car.import_type && (
                      <span className="flex items-center gap-1.5 capitalize">
                        <Fuel className="h-4 w-4 text-primary" />
                        {IMPORT_LABELS[car.import_type] || car.import_type}
                      </span>
                    )}
                    {car.drive_side && (
                      <span className="flex items-center gap-1.5 uppercase">
                        <Gauge className="h-4 w-4 text-primary" />
                        {car.drive_side}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/car-options/${car.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="text-center">
            <Link
              to="/car-options"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-xl font-display font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Vehicles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;