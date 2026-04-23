import React, { useState } from "react";
import { X } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

interface CarInventoryEnquiryProps {
  car: any;
  onClose: () => void;
}

const CarInventoryEnquiry: React.FC<CarInventoryEnquiryProps> = ({ car, onClose }) => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    vehicle_of_interest: car?.name || `${car?.make || ""} ${car?.model || ""}`.trim(),
    budget_range: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/car-enquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(onClose, 2500);
      } else {
        const data = await res.json();
        console.error("Validation error:", data);
        setError("Please check your details and try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const getImageUrl = () => {
    if (!car.images || car.images.length === 0) return "/placeholder-car.jpg";
    const img = car.images[0];
    return typeof img === "string" ? img : img.image || "/placeholder-car.jpg";
  };

  return (
    <div className="relative bg-card text-foreground rounded-2xl p-6 max-w-lg w-full">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary hover:bg-muted flex items-center justify-center transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <h2 className="font-display text-2xl font-semibold mb-1 text-foreground">
        Get a Quote
      </h2>
      <p className="text-sm text-muted-foreground font-body mb-5">
        For {car.name || `${car.make} ${car.model}`}
      </p>

      <div className="flex gap-4 mb-6 p-3 bg-secondary rounded-xl">
        <img
          src={getImageUrl()}
          alt={car.name}
          className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
        />
        <div className="font-body">
          <p className="font-semibold text-foreground text-sm">
            {car.make} {car.model} ({car.year})
          </p>
          <p className="text-accent font-semibold text-sm mt-1">
            KES {Number(car.price).toLocaleString()}
          </p>
        </div>
      </div>

      {success ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-emerald-600 font-body font-medium">Enquiry sent successfully!</p>
          <p className="text-muted-foreground font-body text-sm mt-1">We will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body text-sm"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body text-sm"
          />
          <select
            name="budget_range"
            value={form.budget_range}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg px-4 py-2.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body text-sm"
          >
            <option value="">Select Budget Range</option>
            <option value="below_1m">Below Ksh 1M</option>
            <option value="1m_2m">Ksh 1M - 2M</option>
            <option value="2m_3m">Ksh 2M - 3M</option>
            <option value="above_3m">Above Ksh 3M</option>
          </select>
          <textarea
            name="message"
            placeholder="Any specific preferences or notes..."
            value={form.message}
            onChange={handleChange}
            rows={3}
            className="w-full border border-border rounded-lg px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body text-sm resize-none"
          />

          {error && <p className="text-destructive text-sm font-body">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-foreground text-background py-3 rounded-lg font-body font-medium hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60 gold-shimmer"
          >
            {submitting ? "Sending..." : "Submit Enquiry"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CarInventoryEnquiry;
