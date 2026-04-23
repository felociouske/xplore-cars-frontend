import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { submitCarEnquiry } from "@/services/api";

interface Car {
  id: number;
  name?: string;
  make?: string;
  model?: string;
}

interface CarEnquiryFormProps {
  car?: Car | null;
  onClose?: () => void;
  disableClose?: boolean;
}

const CarEnquiryForm: React.FC<CarEnquiryFormProps> = ({ car, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "Inquiry about car import",
    vehicle_of_interest: car?.name || "",
    budget_range: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const carSuggestions = [
    "Toyota Axio",
    "Toyota Vitz",
    "Mazda Demio",
    "Nissan Note",
    "Honda Fit",
    "Subaru Impreza",
  ];

  const budgetOptions = [
    { value: "below_1m", label: "Below Ksh 1M" },
    { value: "1m_2m", label: "Ksh 1M - 2M" },
    { value: "2m_3m", label: "Ksh 2M - 3M" },
    { value: "above_3m", label: "Above Ksh 3M" },
  ];

  useEffect(() => {
    if (car) {
      setFormData((prev) => ({
        ...prev,
        vehicle_of_interest: car.name,
      }));
    }
  }, [car]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await submitCarEnquiry(formData);
      setSuccess("Your car enquiry has been submitted successfully!");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "Inquiry about car import",
        vehicle_of_interest: "",
        budget_range: "",
        message: "",
      });
    } catch (err) {
      setError("Failed to submit enquiry. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 text-gray-700 dark:text-gray-200 transition-all"
        >
          ✕
        </button>
      )}

      <div className="container mx-auto px-6 max-w-3xl">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 rounded-2xl shadow-lg grid gap-6 transition-colors"
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            Enquire about {car ? car.name : "a Vehicle"}
          </h2>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Vehicle of Interest (type or choose) */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Vehicle of Interest
            </label>
            <input
              type="text"
              name="vehicle_of_interest"
              list="carSuggestions"
              value={formData.vehicle_of_interest}
              onChange={handleChange}
              placeholder="Type or select vehicle..."
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
            />
            <datalist id="carSuggestions">
              {carSuggestions.map((carName) => (
                <option key={carName} value={carName} />
              ))}
            </datalist>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Budget Range
            </label>
            <select
              name="budget_range"
              value={formData.budget_range}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">Select Budget Range</option>
              {budgetOptions.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us more about your needs..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all"
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>
          </div>

          {success && (
            <p className="text-green-600 text-center mt-4">{success}</p>
          )}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </motion.form>
      </div>
    </section>
  );
};

export default CarEnquiryForm;
