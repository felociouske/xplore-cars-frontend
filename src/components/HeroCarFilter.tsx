import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { fetchCars } from "../services/api";

interface Car {
  make?: string;
  model?: string;
  year?: number;
}

const HeroCarFilter = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetchCars().then((data) => setCars(Array.isArray(data) ? data : []));
  }, []);

  const makes = Array.from(new Set(cars.map((c) => c.make).filter(Boolean))).sort() as string[];

  const models = Array.from(
    new Set(
      cars
        .filter((c) => !make || c.make === make)
        .map((c) => c.model)
        .filter(Boolean)
    )
  ).sort() as string[];

  const years = Array.from(
    new Set(
      cars
        .filter((c) => (!make || c.make === make) && (!model || c.model === model))
        .map((c) => c.year)
        .filter(Boolean)
    )
  ).sort((a, b) => (b as number) - (a as number)) as number[];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    if (year) params.set("year", year);
    navigate(`/car-options${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const selectClass =
    "w-full bg-white text-gray-800 border-0 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none cursor-pointer";

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-full max-w-3xl mx-auto">
      <p className="text-white/80 text-xs font-medium uppercase tracking-widest mb-3 text-center">
        Find Your Car
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <div className="flex flex-col gap-1">
          <label className="text-white/70 text-xs font-medium pl-1">Make</label>
          <select
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel(""); setYear(""); }}
            className={selectClass}
          >
            <option value="">All Makes</option>
            {makes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/70 text-xs font-medium pl-1">Model</label>
          <select
            value={model}
            onChange={(e) => { setModel(e.target.value); setYear(""); }}
            className={selectClass}
            disabled={!make}
          >
            <option value="">All Models</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/70 text-xs font-medium pl-1">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={selectClass}
            disabled={!model}
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        <Search className="h-4 w-4" />
        Search Available Cars
      </button>
    </div>
  );
};

export default HeroCarFilter;