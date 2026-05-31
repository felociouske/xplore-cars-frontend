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
  name?: string;
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

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    body_type: "",
    import_type: "",
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
      if (filters.body_type && car.body_type !== filters.body_type) return false;
      if (filters.import_type && car.import_type !== filters.import_type) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !car.name?.toLowerCase().includes(q) &&
          !car.body_type?.toLowerCase().includes(q) &&
          !car.import_type?.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    }).slice(0, 6);
  }, [cars, filters]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const clearFilters = () => setFilters({ body_type: "", import_type: "", search: "" });

  const formatPrice = (car: Car): string => {
    if (!car.price_from) return "Price on Request";
    const from = `KES ${Number(car.price_from).toLocaleString()}`;
    if (car.price_to) return `${from} – ${Number(car.price_to).toLocaleString()}`;
    return from;
  };

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
              value={filters.body_type}
              onChange={(e) => setFilters({ ...filters, body_type: e.target.value })}
              className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">All Body Types</option>
              <option value="hatchback">Hatchback</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="crossover">Crossover</option>
              <option value="wagon">Wagon</option>
              <option value="minivan">Minivan</option>
              <option value="pickup">Pickup</option>
              <option value="coupe">Coupe</option>
              <option value="convertible">Convertible</option>
              <option value="van">Van</option>
            </select>
            <div className="flex gap-2">
              <select
                value={filters.import_type}
                onChange={(e) => setFilters({ ...filters, import_type: e.target.value })}
                className="flex-1 border border-border rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">All Imports</option>
                <option value="japan_import">Japan Import</option>
                <option value="local">Local</option>
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
                {/* Image */}
                <div className="relative overflow-hidden h-60">
                  <img
                    src={getImageUrl(car)}
                    alt={car.name || car.body_type || "Vehicle"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Price on image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="font-display text-lg font-bold text-white drop-shadow">
                      {formatPrice(car)}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {car.name || car.body_type || "Imported Vehicle"}
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