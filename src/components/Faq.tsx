import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does car importation work?",
    answer:
      "We help you source your preferred vehicle from overseas dealers, handle the purchase, shipping, and clearance at the port before delivery to you.",
  },
  {
    question: "What documents are required to import a car?",
    answer:
      "You’ll need a valid national ID or passport, KRA PIN certificate, and proof of purchase. We’ll assist you with customs clearance documents as well.",
  },
  {
    question: "How long does the importation process take?",
    answer:
      "The average timeline is 6–8 weeks depending on the country of origin, shipping schedules, and customs clearance procedures.",
  },
  {
    question: "Do I have to pay the full amount upfront?",
    answer:
      "No. We offer flexible payment options where you can pay a deposit to initiate the process, with the balance payable upon delivery.",
  },
  {
    question: "Are there additional hidden costs?",
    answer:
      "No. We provide a transparent quotation upfront, including shipping, customs duty, port charges, and clearance fees.",
  },
  {
    question: "Can I track my vehicle during shipping?",
    answer:
      "Yes, we provide shipping details and updates so you can track your vehicle until it arrives in Kenya.",
  },
  {
    question: "What types of vehicles can I import?",
    answer:
      "We help you import cars, SUVs, vans, trucks, and even specialized vehicles, as long as they meet KEBS age and standards requirements.",
  },
  {
    question: "Are imported cars inspected before arrival?",
    answer:
      "Yes. All vehicles must pass a pre-shipment inspection (PSI) to ensure they meet safety and environmental standards.",
  },
  {
    question: "Can I finance my imported car?",
    answer:
      "We work with financial partners who can offer car import financing solutions depending on eligibility.",
  },
  {
    question: "Do imported vehicles come with a warranty?",
    answer:
      "Yes, some vehicles may come with manufacturer or dealer warranties, and we can guide you on extended warranty options.",
  },
  {
    question: "What happens if my car is damaged during shipping?",
    answer:
      "All vehicles are insured during transit. In case of damage, insurance claims can be made to cover the loss.",
  },
  {
    question: "Can you help me register the car once it arrives?",
    answer:
      "Absolutely. We assist with NTSA registration, number plate issuance, and roadworthiness certification.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm rounded-lg border hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-lg"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-600 dark:text-gray-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
