import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "../animations/fadeUp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Contact us",
    body: "Contact us and tell us exactly what you're looking for. We discuss every detail make, model, budget, and preferences, and answer all your questions before you commit to anything.",
  },
  {
    title: "Pay the deposit",
    body: "Once you're ready to proceed, you pay a security deposit. This kickstarts the search, we begin bidding at auction or browsing trusted Japanese dealers on your behalf.",
  },
  {
    title: "Review your options",
    body: "We present you with the best available option. You review it, ask any questions, and only when you're happy do we bid and secure the car with our professional guidance throughout.",
  },
  {
    title: "Pay the balance",
    body: "Pay the remaining balance (full invoice value minus your deposit) and we ship your car immediately. No delays, no surprises.",
  },
  {
    title: "Track the shipment",
    body: "We keep you updated as your car makes its journey to Mombasa port. You'll always know where it is and when to expect it.",
  },
  {
    title: "Customs and delivery",
    body: "We handle customs clearance at Mombasa and arrange doorstep delivery straight to you wherever you are in Kenya.",
  },
  {
    title: "Share your experience",
    body: "We'd love to hear how it went. Share your feedback and, if you're happy, a car review video with us. Your experience helps the next buyer trust the process just as you did.",
  },
];

const ImportProcess = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      <Navbar />

      <main className="flex-1">
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col justify-center items-center">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  How we import your car, step by step.
                </h1>
                <p className="mt-5 text-foreground text-xl leading-relaxed max-w-xl mb-5">
                  A straightforward process built around you from the first conversation to the moment your car pulls up at your door.
                </p>
              </div>

              <div className="space-y-8">
                {steps.map((step, index) => {
                  const isLastStep = index === steps.length - 1;

                  return (
                    <motion.div
                      key={step.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex gap-5"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="vintage-dot" />
                        {!isLastStep && <span className="h-full w-px bg-border" />}
                      </div>
                      <div className="vintage-panel p-8">
                        <p className="text-sm uppercase tracking-[0.26em] text-foreground/60 mb-3">
                          Step {index + 1}
                        </p>
                        <p className="text-foreground text-xl leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="vintage-card overflow-hidden p-10 lg:p-14"
            >
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                    Are you ready to import your perfect car with us?
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

export default ImportProcess;