import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { fadeUp } from "../animations/fadeUp";
import { motion } from "framer-motion";
import FeaturedCars from "@/components/FeaturedCars";
import FAQ from "@/components/Faq";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Hero />
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FeaturedCars />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Services />
        </motion.div>

        <motion.div
          id="testimonials"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Testimonials />
        </motion.div>
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <FAQ />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
