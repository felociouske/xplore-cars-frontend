import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MasterclassEnquiryForm from "../components/MasterclassEnquiryForm";
import { PlayCircle } from "lucide-react";

const CarImportationMasterclass: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const YouTubeEmbed = ({ videoId, title }: { videoId: string; title: string }) => (
    <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="w-full h-[400px] rounded-2xl"
        allowFullScreen
      ></iframe>

      {/* Hover Overlay */}
      <a
        href={`https://youtu.be/${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-lg font-semibold shadow-lg">
          <PlayCircle className="w-5 h-5" />
          <span>Watch on YouTube</span>
        </div>
      </a>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-green-50 dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
              Taxi Business Masterclass
            </h1>
            <p className="mt-5 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Thinking of joining Kenya's online taxi economy? This masterclass walks you through
              everything from choosing the right vehicle and understanding platforms like Uber and
              Bolt, to cost breakdowns, documentation, and profit insights. Perfect for new drivers,
              fleet owners, or anyone starting out in Kenya’s taxi industry.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow transition-all"
              >
                Enroll Now
              </button>
            </div>
          </div>

          <div className="flex-1">
            <YouTubeEmbed
              videoId="EwYtPwQfyI8"
              title="About Xplore Imports"
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        {/* PILLAR 1 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              1. Taxi Business Masterclass
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              A hands-on, revenue-focused module that gives you everything you need to run a
              profitable taxi business whether you want to drive part-time or build a full-time fleet.
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Training:</strong> Platform setup, customer handling, and safety basics.</li>
              <li><strong>Cost & revenue analysis:</strong> Templates to calculate expenses and profits.</li>
              <li><strong>Pros & cons:</strong> Honest breakdown of platform dynamics and challenges.</li>
              <li><strong>Best cars:</strong> Reliable, fuel-efficient models for Kenya’s market.</li>
              <li><strong>Part-time vs full-time:</strong> Which approach suits your goals best?</li>
            </ul>
          </div>
        </div>

        {/* PILLAR 2 */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              2. Driver Management
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Build a dependable and professional team. Learn to recruit, train, monitor and motivate drivers
              to maintain consistency and reliability in your operations.
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Recruitment:</strong> Find and onboard reliable, well-vetted drivers.</li>
              <li><strong>Monitoring & performance:</strong> Tools to track daily performance and ratings.</li>
              <li><strong>Payment & incentives:</strong> Transparent and motivating compensation systems.</li>
              <li><strong>Retention:</strong> Keep top drivers happy through growth opportunities.</li>
            </ul>
          </div>

          <div className="md:w-1/2">
            <YouTubeEmbed
              videoId="s_OZrcpYXq8"
              title="Driver Management"
            />
          </div>
        </div>

        {/* PILLAR 3 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <YouTubeEmbed
              videoId="EwYtPwQfyI8"
              title="Documents & Compliance"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              3. Documents & Compliance
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Navigate Kenya’s regulatory landscape confidently. Learn which documents you need for
              both car and driver to stay compliant and avoid penalties.
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Car documents:</strong> Logbook, customs clearance, inspection reports.</li>
              <li><strong>Driver documents:</strong> Valid PSV licenses, contracts, and IDs.</li>
              <li><strong>Insurance & licensing:</strong> Best policies and renewal procedures.</li>
            </ul>
          </div>
        </div>

        {/* MAINTENANCE SECTION */}
        <div className="p-10 rounded-3xl shadow-md bg-green-100 dark:bg-gray-800 dark:shadow-gray-700 transition-colors duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Car Maintenance & Parts
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Proper vehicle maintenance is the backbone of a successful taxi or car hire business.
            In this section, we help you understand how to minimize downtime, reduce repair costs,
            and keep your vehicles running efficiently for longer.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm dark:shadow-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Routine Service</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Learn how to create and follow a consistent maintenance schedule, including oil changes,
                filter replacements, brake checks, and tire rotations — ensuring your cars remain roadworthy
                and fuel-efficient.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm dark:shadow-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Spare Parts Management</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Discover how to source affordable and genuine spare parts locally and abroad.
                We cover vendor selection, comparing aftermarket vs original parts, and how to track
                parts expenses to stay within budget.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm dark:shadow-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Mechanics & Vendors</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Building relationships with skilled mechanics and trusted suppliers is key to smooth operations.
                Learn how to negotiate fair rates, set service standards, and create long-term partnerships
                that keep your business sustainable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENROLL MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4 sm:px-6 overflow-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-gray-700 w-full max-w-3xl relative animate-fadeInScale transition-colors duration-300">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-3xl z-10"
            >
              &times;
            </button>

            <div className="p-6 sm:p-10">
              <MasterclassEnquiryForm />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CarImportationMasterclass;
