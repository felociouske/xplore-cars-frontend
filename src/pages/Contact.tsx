import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "../animations/fadeUp";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: "Location",
    value: "Zuhura Place 2nd floor Room 207, Thika Town",
    href: null,
  },
  {
    icon: Phone,
    label: "Call / WhatsApp",
    value: "+254 757 356 989",
    href: "tel:+254757356989",
  },
  {
    icon: Mail,
    label: "Email",
    value: "localsays@gmail.com",
    href: "mailto:localsays@gmail.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon-Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM",
    href: null,
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      <Navbar />

      <main className="flex-1">

        {/* ── Page heading ── */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl py-16">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Get In Touch
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-base max-w-xl">
              Tell us what car you are looking for, or reach out with any question about an
              ongoing import. We respond fastest on WhatsApp.
            </p>
          </div>
        </section>

        {/* ── Contact details ── */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-x-10 gap-y-8"
            >
              {CONTACT_DETAILS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md border border-border flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base font-semibold text-foreground whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="https://wa.me/254757356989"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1B8F5A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#157a4b] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+254757356989"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm text-slate-800 hover:border-slate-500 transition-colors"
              >
                Call +254 757 356 989
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="rounded-md overflow-hidden border border-border" style={{ height: "360px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35846418597!2d36.70730744863279!3d-1.3028617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Xplore Cars Location"
              />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Contact;