import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { fadeUp } from "../animations/fadeUp";
import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Globe, Target, Heart, PlayCircle } from "lucide-react";


const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* ===== Header Section ===== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-green-600 to-emerald-700 text-white dark:from-green-700 dark:to-emerald-800 py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-green-200 dark:text-green-300">Xplore Imports</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Making car importation{" "}
              <span className="font-semibold text-green-100 dark:text-green-200">easy, transparent,</span> and{" "}
              <span className="font-semibold text-green-100 dark:text-green-200">stress-free</span> for every Kenyan.
            </p>
          </div>
        </motion.section>

        {/* ===== Popup Stats Section ===== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="py-16 bg-white dark:bg-gray-800 -mt-10 relative z-10 transition-colors duration-300"
        >
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
              {[
                { label: "Cars Imported", value: "10+" },
                { label: "Happy Clients", value: "10+" },
                { label: "Taxi Investors Trained", value: "100+" },
                { label: "Drivers Trained", value: "200+" },
                { label: "Drivers Connected", value: "100+" },
              ].map(({ label, value }, index) => (
                <Card
                  key={index}
                  className="py-8 px-4 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600"
                >
                  <h3 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">{value}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{label}</p>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ===== About Section (Text + Image Side by Side) ===== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20"
        >
          <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Helping Kenyans Drive Their Dream Cars and Own a Stabilized Taxi Business
              </h2>
              <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                <p>
                  Xplore Imports was born out
                  of a simple idea helping everyday Kenyans find the right cars for their taxi and personal
                  businesses. Over the years, we noticed one common challenge: many people wanted to import cars but
                  didn’t know where to start or who to trust.
                </p>

                <p>
                  Our mission is to make the car importation journey easy, transparent, and stress-free. We connect
                  clients to quality and affordable cars from Japan, handling everything from sourcing, inspection,
                  shipping, and customs clearance to final delivery straight to your door.
                </p>

                <p>
                  Since 2021, we’ve been
                  offering expert Taxi Business Advising, helping hundreds of
                  drivers and entrepreneurs make smarter car investment decisions. Building on that success, in{" "}
                  2025 we expanded into{" "}
                  Car Import Services bringing the same trusted, transparent
                  approach to vehicle sourcing and delivery from Japan.
                </p>

                <p>
                  We believe in open communication and honesty every step of the way. Clients receive clear updates,
                  transparent costs, and total peace of mind knowing their cars are handled with care.
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative group rounded-2xl overflow-hidden shadow-md">
              <iframe
                src="https://www.youtube.com/embed/feO-u_WJjog"
                title="About Xplore Imports"
                className="w-full h-[400px] rounded-2xl"
                allowFullScreen
              ></iframe>

              {/* Watch on YouTube Overlay */}
              <a
               href="https://youtu.be/feO-u_WJjog?si=WusDX_6oR6UZO6Ep"
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
          </div>
        </motion.section>

        {/* ===== Our Core Values ===== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The principles that define who we are and how we serve our clients.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: CheckCircle, title: "Integrity & Transparency", description: "Honest communication and clear pricing with no hidden fees." },
                { icon: Heart, title: "Customer Care", description: "Every client is treated as a partner your satisfaction is our success." },
                { icon: Globe, title: "Global Reach", description: "Strong partnerships in Japan ensure premium selections." },
                { icon: Target, title: "Reliability", description: "We deliver what we promise on time and with care." },
                { icon: Users, title: "Community Focus", description: "We grow by empowering Kenyans to make informed car investment decisions." },
                { icon: Award, title: "Excellence", description: "Striving for quality service in every import, every client, every time." },
              ].map(({ icon: Icon, title, description }, index) => (
                <Card
                  key={index}
                  className="p-6 text-center shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-700"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{description}</p>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ===== Why Choose Us ===== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Xplore Imports is built on trust, experience, and a passion for making car importation simple.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "End-to-End Service", desc: "From vehicle sourcing to doorstep delivery we handle it all for you." },
                { title: "Trusted Markets", desc: "We only source cars from reputable and verified dealers worldwide." },
                { title: "Personal Guidance", desc: "Our team walks with you through every step of the process." },
                { title: "Affordable Pricing", desc: "We ensure competitive rates without compromising on quality." },
                { title: "Fast & Secure Delivery", desc: "Your car arrives safely, with real-time shipment updates." },
              ].map(({ title, desc }, i) => (
                <Card
                  key={i}
                  className="p-6 hover:shadow-md transition-shadow text-center bg-white dark:bg-gray-700"
                >
                  <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
