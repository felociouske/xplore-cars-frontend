import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "../animations/fadeUp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  const [expandedImage, setExpandedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      <Navbar />

      <main className="flex-1">
        <section className="vintage-hero border-b border-border overflow-hidden justify-center">
          <div className="container mx-auto px-4 max-w-6xl py-16 md:py-24">
            <div className="flex justify-center">
              <div className="space-y-6 max-w-3xl mx-auto text-center">
                <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground leading-tight tracking-[-0.03em]">
                  Our Signature
                </h1>
                <p className="max-w-2xl text-base md:text-lg leading-relaxed text-foreground/85">
                  Xplore is not your regular car importer! We pride ourselves in quality cars that give you peace of mind for many years.
                   We specialize in sourcing high grade cars with low mileage below 50,000 Km. We conduct heavy due diligence to ensure all our cars
                   have no accident history, hailstone damage, open manufaturer recall, or multiple past owners.
                   Looking to own a car with confidence? Try Xplore Imports.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  What makes our imports stand out?
                </h2>
                <div className="space-y-4 pt-2">
                  {[
                    {
                      title: "We source the car with you",
                      body: "Before we purchase the car from our suppliers or auction, we analyze it thoroughly until you are 100% satisfied and give us the green light to proceed. In short, we only purchase what you want and not what is being sold.",
                    },
                    {
                      title: "We go beyond the photos",
                      body: "Xplore conducts due diligence beyond just the photos. We check the car's past ownership and usage to detect any red flags that could compromise its quality. We never purchase a car without an auction sheet.",
                    },
                    {
                      title: "Flexible payment",
                      body: "We offer flexible payment in two equal instalments of 50% each, giving you time to put your finances together.",
                    },
                    {
                      title: "Open communication and reassurance",
                      body: "The Xplore team is very open about sharing information and keeping you updated on your car's progress. We understand that importing your first car can be daunting, so we share every detail you need to feel confident that the process is under control.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="space-y-1">
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Looking to own a car with confidence? Try Xplore Imports.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      src: "/suzuki.jpg",
                      alt: "Suzuki Alto with premium import styling",
                      title: "Suzuki Alto",
                      label: "Big",
                    },
                    {
                      src: "/mazdaa.jpg",
                      alt: "Premium Mazda Cx5",
                      title: "Mazda CX5",
                      label: "Bigger",
                    },
                  ].map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setExpandedImage(index)}
                      className="group relative overflow-hidden rounded-[1.75rem] shadow-card focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-white">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-start">{image.label}</p>
                        <p className="mt-2 text-lg font-semibold text-start">{image.title}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols">
                  {[
                    {
                      src: "/prado.jpg",
                      alt: "Bigger Toyota Prado",
                      title: "Toyota Prado",
                    },
                    {
                      src: "/prado.jpeg",
                      alt: "Bigger Toyota Prado",
                      title: "Toyota Prado",
                    },
                  ].map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setExpandedImage(index + 2)}
                      className="group relative overflow-hidden rounded-[1.75rem] shadow-card focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-white">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-start">Biggest</p>
                        <p className="mt-2 text-lg font-semibold text-start">{image.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {expandedImage !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
              <button
                type="button"
                onClick={() => setExpandedImage(null)}
                className="absolute right-4 top-4 rounded-full bg-white/90 p-3 text-foreground shadow-lg"
                aria-label="Close image preview"
              >
                ×
              </button>
              <div className="max-w-[90vw] max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={["/suzuki.jpg", "/mazdaa.jpg", "/suzuki.jpg", "/prado.jpeg"][expandedImage]}
                  alt="Expanded gallery image"
                  className="w-full h-full object-contain bg-black"
                />
              </div>
            </div>
          )}
        </section>

        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                Core values we value most
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="vintage-card p-8"
              >
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Honesty
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  We source cars from verified auctions in Japan, inspect them, and give you full
                  pricing details before you commit.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="vintage-card p-8"
              >
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Communication
                </h3>
                <p>
                  We give clear information and keeping you updated on your car's progress every step of the way. 
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="vintage-card p-8"
              >
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Trust
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Customers return because we treat every order like a handshake: clear, honest and
                  backed by experience.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col justify-center items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  How we import your car, step by step.
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl mb-5">
                  A straightforward process built around you — from the first conversation to the moment your car pulls up at your door.
                </p>
              </div>

              <div className="space-y-8">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="vintage-dot" />
                    <span className="h-full w-px bg-border" />
                  </div>
                  <div className="vintage-panel p-8">
                    <p className="text-sm uppercase tracking-[0.26em] text-foreground/60 mb-3">Step 1</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Contact us and tell us exactly what you're looking for. We discuss every detail make, model, budget, and preferences, and answer all your questions before you commit to anything.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="vintage-dot" />
                    <span className="h-full w-px bg-border" />
                  </div>
                  <div className="vintage-panel p-8">
                    <p className="text-sm uppercase tracking-[0.26em] text-foreground/60 mb-3">Step 2</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Once you're ready to proceed, you pay a security deposit. This kickstarts the search, we begin bidding at auction or browsing trusted Japanese dealers on your behalf.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="vintage-dot" />
                    <span className="h-full w-px bg-border" />
                  </div>
                  <div className="vintage-panel p-8">
                    <p className="text-sm uppercase tracking-[0.26em] text-foreground/60 mb-3">Step 3</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      We present you with the best available option. You review it, ask any questions, and only when you're happy do we bid and secure the car with our professional guidance throughout.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="vintage-dot" />
                    <span className="h-full w-px bg-border" />
                  </div>
                  <div className="vintage-panel p-8">
                    <p className="text-sm uppercase tracking-[0.26em] text-foreground/60 mb-3">Step 4</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Pay the remaining balance (full invoice value minus your deposit) and we ship your car immediately. No delays, no surprises.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="vintage-dot" />
                    <span className="h-full w-px bg-border" />
                  </div>
                  <div className="vintage-panel p-8">
                    <p className="text-sm uppercase tracking-[0.26em] text-foreground/60 mb-3">Step 5</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      We keep you updated as your car makes its journey to Mombasa port. You'll always know where it is and when to expect it.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="vintage-dot" />
                    <span className="h-full w-px bg-border" />
                  </div>
                  <div className="vintage-panel p-8">
                    <p className="text-sm uppercase tracking-[0.26em] text-foreground/60 mb-3">Step 6</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      We handle customs clearance at Mombasa and arrange doorstep delivery straight to you wherever you are in Kenya.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="vintage-dot" />
                  </div>
                  <div className="vintage-panel p-8">
                    <p className="text-sm uppercase tracking-[0.26em] text-foreground/60 mb-3">Step 7</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      We'd love to hear how it went. Share your feedback and, if you're happy, a car review video with us. Your experience helps the next buyer trust the process just as you did.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="vintage-card overflow-hidden p-10 lg:p-14">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                    Are you ready to import your perfect car with us?.
                  </h2>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                  <Link to="/contact" className="btn-outline">
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;