import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarEnquiryForm from "@/components/CarEnquiryForm";
import { fadeUp } from "../animations/fadeUp";
import { motion } from "framer-motion";
import {
  Search,
  Wrench,
  Handshake,
  UserCheck,
  CarFront,
  Fuel,
  Users,
  Star,
  SearchCheck,
  CreditCard,
  DollarSign,
  ShieldCheck,
  Car,
  Zap,
} from "lucide-react";


const VehicleSourcing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-primary to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Search className="mx-auto h-12 w-12 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find the Right Car, the Right Way
            </h1>
            <p className="text-lg opacity-90 mb-8">
            We simplify the process of importing your dream car. Our team of sourcing experts handle everything from car inspection to customs compliance ensuring every import meets Kenya’s strict standards for safety, age, and specification.
            </p>
            <a
              href="#form"
              className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-full shadow hover:shadow-lg transition"
            >
              Get Free Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <main className="flex-1">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-3xl font-bold text-center mb-12"
            >
              How It Works
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Tell Us Your Needs",
                  desc: "Share your car preferences, budget, and any specific requirements you have. Our team will use this information to find the perfect match for you.",
                },
                {
                  step: "2",
                  title: "We Search From Our Japan Network",
                  desc: "We conduct an extensive search through our trusted network of Japanese dealers and auction houses to identify the best cars available.",
                },
                {
                  step: "3",
                  title: "Present Verified Options",
                  desc: "You’ll receive a curated list of verified car options that match your preferences, complete with photos and detailed specifications.",
                },
                {
                  step: "4",
                  title: "Reservation",
                  desc: "Once you’ve selected your preferred car, we reserve it for up to 2 days while you prepare for purchase.",
                },
                {
                  step: "5",
                  title: "Due Diligence",
                  desc: "Before finalizing the purchase, our experts conduct a comprehensive background check including service history, recall records, and accident reports to ensure the car’s integrity.",
                },
                {
                  step: "6",
                  title: "Secure Payment",
                  desc: "We facilitate a transparent and secure international payment process, ensuring your funds are safely transferred to the car’s seller.",
                },
                {
                  step: "7",
                  title: "Relax While We Ship",
                  desc: "Once payment is confirmed, sit back and relax as your car is shipped to Kenya typically arriving within 45 days.",
                },
                {
                  step: "8",
                  title: "Clearing and Registration",
                  desc: "Our team handles all port clearance procedures, duty payments, and NTSA registration to make the process completely hassle-free for you.",
                },
                {
                  step: "9",
                  title: "Final Delivery",
                  desc: "Your car is delivered to Nairobi, inspected, and then transported directly to your doorstep ready for the road.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i * 0.1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="p-6 text-center rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent shadow-sm hover:shadow-lg transition"
                >
                  <div className="text-4xl font-bold text-primary mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-20 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
            >
              Why Choose Our Car Importation?
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Star,
                  title: "High-Grade Quality cars",
                  desc: "We specialize in importing low-mileage, high-grade cars (Grade 4 and above) to ensure premium quality and reliability.",
                },
                {
                  icon: SearchCheck,
                  title: "Thorough Due Diligence",
                  desc: "Before any purchase, we perform a detailed background check on service history, recalls, and past accidents for complete transparency.",
                },
                {
                  icon: CreditCard,
                  title: "Flexible Payment Options",
                  desc: "Enjoy flexibility by paying 70% upfront and settle the balance once your car arrives safely at the Port of Mombasa.",
                },
                {
                  icon: DollarSign,
                  title: "Competitive Pricing",
                  desc: "We offer the best market rates by balancing your budget with exceptional car quality and value.",
                },
                {
                  icon: ShieldCheck,
                  title: "Kenya-Compliant Vehicles",
                  desc: "All sourced cars meet Kenyan import standards, including right-hand drive and the 8-year age limit requirement.",
                },
                {
                  icon: Zap,
                  title: "Fast and Reliable Sourcing",
                  desc: "We prioritize cars already inspected and approved for export to ensure a quick, seamless sourcing process.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i * 0.1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="p-6 rounded-xl bg-white dark:bg-gray-700 shadow-md border-l-4 border-primary/40 dark:border-primary-dark/40 transition-colors duration-300"
                >
                  <item.icon className="text-primary dark:text-primary-dark w-8 h-8 mb-3" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{item.title}</h3>
                  <p className="text-muted-foreground dark:text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNICAL EXPERTISE SECTION */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-3xl font-bold mb-6 text-center"
            >
              Xplore Car Imports: A Business Opportunity on Wheels
            </motion.h2>

            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              We don’t just import cars for personal use we empower entrepreneurs and
              drivers to start or expand their ride-handling businesses. Every vehicle we
              recommend for online taxi services, corporate transport, or personal hire
              has been carefully evaluated for efficiency, durability, and profitability.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Left column features */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <Car className="text-primary" /> Smart Car Selection for Ride Handling
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Fuel-efficient and reliable models ideal for platforms like Uber, Bolt, and Little Cab</li>
                  <li>Long-lasting cars with low maintenance costs and high resale value</li>
                  <li>Guidance on hybrid and economy options that maximize profit margins</li>
                  <li>Access to verified units already registered for commercial use</li>
                </ul>

                <h3 className="text-2xl font-semibold flex items-center gap-2 mt-8">
                  <UserCheck className="text-primary" /> Driver Recruitment & Partnership Support
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Assistance connecting qualified drivers with available vehicles</li>
                  <li>Flexible payment and lease plans to help new drivers get started</li>
                  <li>Consultation on driving experience, professionalism, and customer service</li>
                  <li>Guided onboarding for those seeking to build long-term transport businesses</li>
                </ul>
              </motion.div>

              {/* Right column features */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <Handshake className="text-primary" /> Business Support
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Guidance on business setup for individuals and small fleets</li>
                  <li>Advisory on tax, insurance, and operational cost management</li>
                  <li>Ongoing mentorship for sustainable car-based income</li>
                </ul>

                <h3 className="text-2xl font-semibold flex items-center gap-2 mt-8">
                  <Wrench className="text-primary" /> Local Support & Maintenance Network
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Links to trusted local garages and service centers</li>
                  <li>Access to affordable spare parts and bodywork services</li>
                  <li>Continuous technical support and maintenance guidance</li>
                  <li>After-sales support to keep your vehicle business running efficiently</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* VEHICLE TYPES */}
        <section className="py-20 bg-background dark:bg-gray-900 overflow-hidden transition-colors duration-300">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
            >
              Popular Cars We Source for Kenya
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: CarFront,
                  title: "Popular Taxi Vehicles",
                  desc: "We import efficient and durable units ideal for ride-hailing businesses such as Uber, Bolt, and Little Cab.",
                  models: ["Toyota Axio", "Toyota Fielder", "Mazda Demio", "Honda Fit", "Nissan Note", "Toyota Belta"],
                },
                {
                  icon: Fuel,
                  title: "Fuel-Efficient Hatchbacks",
                  desc: "Perfect for both private and taxi use low maintenance, great fuel economy, and easy spare parts availability.",
                  models: ["Toyota Vitz", "Mazda Demio SkyActiv", "Honda Fit Hybrid", "Suzuki Swift", "Toyota Passo"],
                },
                {
                  icon: Users,
                  title: "Family & Executive Sedans",
                  desc: "Spacious, comfortable cars suited for family and private use, balancing class with affordability.",
                  models: ["Toyota Premio", "Toyota Allion", "Nissan Sylphy", "Mazda Atenza", "Honda Grace"],
                },
                {
                  icon: Car,
                  title: "SUVs for Business or Private Use",
                  desc: "For long-distance comfort, high ground clearance, and multi-purpose usage perfect for both urban and rural areas.",
                  models: ["Toyota Harrier", "RAV4", "Honda CR-V", "Mazda CX-5", "Subaru Forester"],
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i * 0.2}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border-l-4 border-primary/40 dark:border-primary-dark/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className="w-8 h-8 text-primary dark:text-primary-dark" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground dark:text-gray-300 mb-4">{item.desc}</p>
                  <ul className="list-disc list-inside text-muted-foreground dark:text-gray-300 space-y-1 text-sm">
                    {item.models.map((model, idx) => (
                      <li key={idx}>{model}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="form">
        <div className="container mx-auto px-4 max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Enquire About Car Importation
          </h2>
          <p className="text-muted-foreground dark:text-gray-300">
            Have specific car requirements in mind? Fill out the form below and
            our team will get back to you with the best sourcing options tailored to your needs.
          </p>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          <CarEnquiryForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default VehicleSourcing;