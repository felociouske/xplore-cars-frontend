import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "../animations/fadeUp";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock,
  MessageCircle, Facebook, Instagram, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import EnquiryForm from "@/components/EnquiryForm";

// ── Update these paths with your actual images ──
const GALLERY_IMAGES = [
  { src: "/images/xplore/gallery-01.jpg", alt: "Xplore Cars delivery 1" },
  { src: "/images/xplore/gallery-02.jpg", alt: "Xplore Cars delivery 2" },
  { src: "/images/xplore/gallery-03.jpg", alt: "Xplore Cars delivery 3" },
  { src: "/images/xplore/gallery-04.jpg", alt: "Xplore Cars delivery 4" },
  { src: "/images/xplore/gallery-05.jpg", alt: "Xplore Cars delivery 5" },
  { src: "/images/xplore/gallery-06.jpg", alt: "Xplore Cars delivery 6" },
  { src: "/images/xplore/gallery-07.jpg", alt: "Xplore Cars delivery 7" },
  { src: "/images/xplore/gallery-08.jpg", alt: "Xplore Cars delivery 8" },
  { src: "/images/xplore/gallery-09.jpg", alt: "Xplore Cars delivery 9" },
  { src: "/images/xplore/gallery-10.jpg", alt: "Xplore Cars delivery 10" },
  { src: "/images/xplore/gallery-11.jpg", alt: "Xplore Cars delivery 11" },
  { src: "/images/xplore/gallery-12.jpg", alt: "Xplore Cars delivery 12" },
  { src: "/images/xplore/gallery-13.jpg", alt: "Xplore Cars delivery 13" },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      <Navbar />

      {/* ── HERO with background image ── */}
      <section className="relative min-h-[480px] flex items-center overflow-hidden">
        <img
          src="/image.png"
          alt="Xplore Cars Kenya"
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

        <div className="relative z-10 container flex float-col justify-center items-center mx-auto px-4 py-24">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-2xl">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              Government Registered · Nairobi, Kenya
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              About <span className="text-primary">Xplore Cars</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-xl">
              Making it easy for Kenyans to own quality cars imported directly from
              verified auctions in Japan, handled end to end, and delivered to your door.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-1">

        {/* ── Our Story ── */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-14 items-start">

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                  Our Story
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Importing Your Dream Car,<br />Made Simple
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
                  <p>
                    At <strong className="text-foreground">Xplore Cars Imports</strong> we make
                    it easy for Kenyans to own their cars by importing cars for them. We choose
                    high quality cars from trusted and verified car auctioneers in Japan. We make
                    sure that the car meets the requirements before we bid it. We also advise on
                    the best cars to choose based on your conditions.
                  </p>
                  <p>
                    We handle importation, custom clearance and delivery to Nairobi from Mombasa.
                  </p>
                  <p>
                    We make car importation simple, transparent and stress free with everyday
                    updates of the whereabouts of the car.
                  </p>
                  <p className="font-semibold text-foreground text-base">
                    Import your dream car with Xplore Cars Importers.
                  </p>
                </div>

                {/* Trust badge */}
                <div className="mt-8 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl px-5 py-4 w-fit">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Government Registered Company</p>
                    <p className="text-xs text-muted-foreground">Licensed & compliant with Kenyan law</p>
                  </div>
                </div>

                {/* Handpick CTA */}
                <div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-6">
                  <p className="font-display text-lg font-bold text-foreground mb-2">
                    Handpick your dream car
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse our full inventory of quality vehicles imported directly from Japan 
                    filtering by make, model, body type and budget.
                  </p>
                  <Link
                    to="/car-options"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Browse Inventory
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Contact details + form */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-5"
              >
                {/* Contact cards */}
                {[
                  {
                    icon: MapPin,
                    bg: "#5DCAA5", fg: "#04342C",
                    label: "Location",
                    value: "New Rain, along Kenyatta Road, Nairobi",
                    href: null,
                  },
                  {
                    icon: Phone,
                    bg: "#378ADD", fg: "#042C53",
                    label: "Call / WhatsApp",
                    value: "+254 757 356 989",
                    href: "tel:+254757356989",
                  },
                  {
                    icon: Mail,
                    bg: "#EF9F27", fg: "#412402",
                    label: "Email",
                    value: "localsays@gmail.com",
                    href: "mailto:localsays@gmail.com",
                  },
                  {
                    icon: Clock,
                    bg: "#7F77DD", fg: "#26215C",
                    label: "Business Hours",
                    value: "Mon–Fri: 8:00 AM – 6:00 PM\nSat: 9:00 AM – 4:00 PM",
                    href: null,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 bg-card border border-border rounded-2xl px-5 py-4 hover:border-primary/40 hover:shadow-sm transition-all"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: item.bg }}
                      >
                        <Icon className="h-5 w-5" style={{ color: item.fg }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-foreground whitespace-pre-line">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* WhatsApp */}
                <a
                  href="https://wa.me/254757356989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-2xl px-5 py-4 font-semibold transition-colors"
                >
                  <MessageCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">Chat on WhatsApp — we respond fast!</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                {/* Social media */}
                <div className="bg-card border border-border rounded-2xl px-5 py-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Follow Us
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.facebook.com/XploreImports"
                      target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.instagram.com/xplorecar_imports/"
                      target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@explore_254k3"
                      target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-colors"
                      aria-label="TikTok"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Enquiry Form ── */}
        <section className="py-16 bg-secondary/40 dark:bg-muted/20">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                Get In Touch
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground text-sm">
                Tell us what car you're looking for and we'll get back to you shortly.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <EnquiryForm />
            </motion.div>
          </div>
        </section>

        {/* ── Gallery ── */}

        {/* ── Map ── */}
        <section className="pb-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="rounded-3xl overflow-hidden border border-border shadow-sm" style={{ height: "360px" }}>
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

export default About;