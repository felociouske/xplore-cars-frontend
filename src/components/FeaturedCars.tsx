import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Fuel, Gauge, Calendar, SlidersHorizontal, X, Search } from "lucide-react";
import { fetchCars } from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

interface CarImage {
  id: number;
  image: string;
}

interface Car {
  id: number;
  name: string;
  make: string;
  model: string;
  year: string;
  price: number;
  engine_type: string;
  transmission: string;
  mileage: number;
  status?: string;
  images?: (string | CarImage)[];
}

const STATUS_COLORS: Record<string, string> = {
  available: "bg-emerald-500 text-white",
  reserved: "bg-amber-400 text-stone-900",
  new: "bg-blue-600 text-white",
};

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    engine_type: "",
    status: "",
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

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.engine_type && car.engine_type !== filters.engine_type) return false;
      if (filters.status && car.status !== filters.status) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !car.make?.toLowerCase().includes(q) &&
          !car.model?.toLowerCase().includes(q) &&
          !car.name?.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    }).slice(0, 6);
  }, [cars, filters]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const clearFilters = () => setFilters({ engine_type: "", status: "", search: "" });

  return (
    <section className="py-20 bg-secondary/40 dark:bg-muted/20 transition-colors">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
              Our Inventory
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Featured Vehicles
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Handpicked, inspected, and imported directly from Japan. Every car comes fully verified.
            </p>
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl bg-card text-foreground hover:border-primary transition font-medium text-sm self-start md:self-auto"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-card border border-border rounded-2xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search make or model..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <select
              value={filters.engine_type}
              onChange={(e) => setFilters({ ...filters, engine_type: e.target.value })}
              className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">All Engine Types</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>
            <div className="flex gap-2">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="flex-1 border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">All Statuses</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="new">New</option>
              </select>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="p-2.5 border border-border rounded-lg hover:border-destructive hover:text-destructive transition text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>No vehicles match your filters.</p>
            <button onClick={clearFilters} className="mt-3 text-primary underline underline-offset-4 text-sm">
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
                {/* Image — tall and prominent */}
                <div className="relative overflow-hidden h-60">
                  <img
                    src={getImageUrl(car)}
                    alt={car.name || `${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {car.status && (
                    <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold capitalize ${STATUS_COLORS[car.status] || "bg-gray-600 text-white"}`}>
                      {car.status}
                    </span>
                  )}

                  {/* Price on image */}
                  <div className="absolute bottom-3 left-4">
                    <p className="font-display text-xl font-bold text-white drop-shadow">
                      {car.price ? `KES ${Number(car.price).toLocaleString()}` : "Price on Request"}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {car.name || `${car.make} ${car.model}`}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      {car.year || "—"}
                    </span>
                    <span className="flex items-center gap-1.5 capitalize">
                      <Fuel className="h-4 w-4 text-primary" />
                      {car.engine_type || "—"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Gauge className="h-4 w-4 text-primary" />
                      {car.mileage ? `${car.mileage.toLocaleString()} km` : "—"}
                    </span>
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

        {/* View all link */}
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