import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject_type: "general",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contact-enquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Your message has been sent. We will get back to you shortly.");
        setFormData({ full_name: "", email: "", phone: "", subject_type: "general", subject: "", message: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border p-8 rounded-2xl shadow-soft"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body"
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body"
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+254 700 000 000"
            className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body"
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Enquiry Type
          </label>
          <select
            name="subject_type"
            value={formData.subject_type}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body"
          >
            <option value="general">General Enquiry</option>
            <option value="masterclass">Masterclass</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            placeholder="Tell us what you need..."
            className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-body resize-none"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-foreground text-background px-10 py-3 rounded-lg font-body font-medium hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60 gold-shimmer"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>

      {success && <p className="text-emerald-600 text-center mt-4 font-body text-sm">{success}</p>}
      {error && <p className="text-destructive text-center mt-4 font-body text-sm">{error}</p>}
    </form>
  );
};

export default EnquiryForm;
