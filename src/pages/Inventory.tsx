import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchCars } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

interface CarImage { id: number; image: string; }
interface CarItem {
  id: number;
  name?: string;
  make?: string;
  model?: string;
  price_from?: number | string | null;
  price_display?: string | null;
  images?: CarImage[];
  body_type?: string;
  import_type?: string;
  drive_side?: string;
  car_section?: string;
}

const BODY_TYPES: Record<string, string> = {
  hatchback: "Hatchback", sedan: "Sedan", suv: "SUV", crossover: "Crossover",
  wagon: "Wagon", minivan: "Minivan", pickup: "Pickup", coupe: "Coupe",
  convertible: "Convertible", van: "Van",
};

const SECTIONS: Record<string, string> = {
  available_to_import: "Available to Import",
  successful_import: "Successful Import",
  popular_import: "Popular Import",
};

const getPriceDisplay = (car: CarItem): string | null => {
  if (car.price_display?.trim()) return car.price_display;
  if (car.price_from === null || car.price_from === undefined || car.price_from === "") return null;

  const price = Number(car.price_from);
  return Number.isFinite(price) ? `KES ${price.toLocaleString()}` : null;
};

function Inventory() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCars().then((data) => { setCars(data); setLoading(false); });
  }, []);

  const getImageUrl = (car: CarItem): string => {
    if (!car.images || car.images.length === 0) return "/placeholder-car.jpg";
    const img = car.images[0];
    const path = typeof img === "string" ? img : img.image;
    if (!path) return "/placeholder-car.jpg";
    return path.startsWith("http") ? path : `${API_BASE_URL.replace("/api", "")}${path}`;
  };

  const filteredCars = useMemo(() => {
    if (!search) return cars;
    const q = search.toLowerCase();
    return cars.filter((car) =>
      car.make?.toLowerCase().includes(q) ||
      car.model?.toLowerCase().includes(q) ||
      car.name?.toLowerCase().includes(q)
    );
  }, [cars, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground font-sans text-sm">Loading vehicles…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-12">

        {/* Page intro, no hero block */}
        <div className="max-w-2xl mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-3">
            Cars We Have Imported
          </h1>
          <p className="font-sans text-muted-foreground leading-relaxed">
            Take a look at the premium-quality cars we have successfully imported for our happy clients. Will yours be next?
          </p>
        </div>

        {/* Search by make/model */}
        <div className="max-w-md mb-10">
          <label className="block text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Search by make or model
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="e.g. Toyota, Mazda Demio…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-border rounded bg-white text-foreground text-sm font-sans
                         focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <p className="text-sm font-sans text-muted-foreground mb-6">
          Showing <span className="font-semibold text-foreground">{filteredCars.length}</span>{" "}
          vehicle{filteredCars.length !== 1 ? "s" : ""}
          {search && ` matching "${search}"`}
        </p>

        {filteredCars.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-sans">
            <p>No imports match that search.</p>
            <button onClick={() => setSearch("")} className="mt-3 text-accent underline underline-offset-4 text-sm">
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredCars.map((car) => {
              const priceDisplay = getPriceDisplay(car);

              return (
              <Link
                key={car.id}
                to={`/car-options/${car.id}`}
                className="card-clean rounded overflow-hidden group transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={getImageUrl(car)}
                    alt={car.name || "Imported vehicle"}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
                  />
                  {car.car_section && SECTIONS[car.car_section] && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-wide bg-[#071828]/80 text-white px-2.5 py-1 rounded">
                        {SECTIONS[car.car_section]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 text-center">

                  <h3 className="font-display text-base font-semibold text-primary mb-1 group-hover:text-accent transition-colors leading-snug">
                    {car.name || `${car.make || ""} ${car.model || ""}`.trim() || "Imported Vehicle"}
                  </h3>
                  <span className="inline-flex items-center justify-center rounded-md bg-[#1B8F5A] px-6 py-3 mb-3 mt-3 text-sm font-semibold text-white hover:bg-[#157a4b] transition-colors">
                    View Details →
                  </span>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    {priceDisplay ? (
                      <div>
                        <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">Imported value</p>
                        <p className="price-tag">{priceDisplay}</p>
                      </div>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Inventory;
