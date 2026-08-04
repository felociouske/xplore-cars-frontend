// src/components/TaxCalculatorPromo.tsx
//
// WHAT THIS COMPONENT DOES:
// A homepage section promoting the tax calculator subdomain. Left side
// is a larger image (same pattern as your other image sections, just
// bigger). Right side is a card with a small self-looping animation:
// it cycles through mock calculation steps like a real calculation
// running, then shows a "printing" animation, then loops — purely
// decorative, no real numbers or API calls involved.

import { useEffect, useState } from "react";
import { Calculator, Printer, ArrowRight } from "lucide-react";

// Mock steps for the animation only — NOT real tax figures. Purely to
// give the impression of a calculation happening.
const MOCK_STEPS = [
  { label: "CRSP Value", value: "KES 4,200,000" },
  { label: "Customs Value", value: "KES 2,100,000" },
  { label: "Import Duty", value: "KES 735,000" },
  { label: "Excise Duty", value: "KES 708,750" },
  { label: "VAT", value: "KES 566,760" },
  { label: "Total Tax", value: "KES 2,073,510" },
];

const STEP_INTERVAL_MS = 900;
const PRINTING_DURATION_MS = 1800;

const TaxCalculatorPromo = () => {
  // "phase" drives which part of the loop we're in:
  // calculating (revealing steps one by one) -> printing -> restart
  const [phase, setPhase] = useState<"calculating" | "printing">("calculating");
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    if (phase === "calculating") {
      if (visibleSteps < MOCK_STEPS.length) {
        const timer = setTimeout(() => setVisibleSteps((n) => n + 1), STEP_INTERVAL_MS);
        return () => clearTimeout(timer);
      }
      // All steps revealed -> move to the printing phase after a short pause
      const timer = setTimeout(() => setPhase("printing"), 1000);
      return () => clearTimeout(timer);
    }

    if (phase === "printing") {
      const timer = setTimeout(() => {
        setVisibleSteps(0);
        setPhase("calculating");
      }, PRINTING_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleSteps]);

  return (
    <section className="py-16 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-16">
          {/* Image — same pattern as your other sections, sized up */}
          <div className="sm:w-1/2">
            <img
              src="/tax.jpg"
              alt="Calculate your car import tax"
              className="w-full h-72 sm:h-[32rem] mx-auto rounded-lg object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
              }}
            />
          </div>

          {/* Animated calculator card */}
          <div className="sm:w-1/2 w-full">
            <div className="bg-background border border-border rounded-2xl shadow-lg p-6 sm:p-8">

              <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                Get to know your KRA duty before you import your vehicle
              </h3>
              <p className="text-sm text-muted-foreground font-body mb-6">
                Get an instant, itemized breakdown of import duty, excise,
                VAT, and levies based on the latest KRA's official CRSP schedule 2026.
              </p>

              {/* --- The animated "calculation running" area --- */}
              <div className="relative bg-secondary/50 rounded-xl p-5 mb-6 min-h-[220px] overflow-hidden">
                {phase === "calculating" && (
                  <div className="space-y-2.5">
                    {MOCK_STEPS.map((step, i) => {
                      const isVisible = i < visibleSteps;
                      const isTotal = step.label === "Total Tax";
                      return (
                        <div
                          key={step.label}
                          className={`flex justify-between items-center text-sm transition-all duration-500 ${
                            isVisible
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2"
                          } ${isTotal ? "pt-2 mt-1 border-t border-border" : ""}`}
                        >
                          <span
                            className={
                              isTotal
                                ? "font-semibold text-foreground"
                                : "text-muted-foreground"
                            }
                          >
                            {step.label}
                          </span>
                          <span
                            className={
                              isTotal
                                ? "font-bold text-accent"
                                : "font-medium text-foreground"
                            }
                          >
                            {isVisible ? step.value : "—"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {phase === "printing" && (
                  <div className="flex flex-col items-center justify-center h-full py-6">
                    <div className="relative">
                      <Printer className="h-10 w-10 text-accent" />
                      {/* The sliding "paper" — a small rectangle that
                          animates upward out of the printer icon, then
                          fades. Keyframes defined in the <style> tag below. */}
                      <div className="tax-promo-paper absolute left-1/2 -translate-x-1/2 top-0 w-6 h-8 bg-background border border-border rounded-sm shadow-sm" />
                    </div>
                    <p className="text-sm text-muted-foreground font-body mt-4">
                      Printing your tax summary…
                    </p>
                  </div>
                )}
              </div>
              <a
                href="https://tax.xplorecarimports.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-xl py-3.5 text-sm font-bold transition-colors hover:opacity-90"
              >
                Calculate My Import Tax
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped animation keyframes — kept local to this component rather
          than added to a global CSS file, so this component is fully
          self-contained and easy to drop in or remove. */}
      <style>{`
        @keyframes tax-promo-paper-slide {
          0%   { transform: translate(-50%, 0);   opacity: 0; }
          15%  { opacity: 1; }
          80%  { transform: translate(-50%, -38px); opacity: 1; }
          100% { transform: translate(-50%, -38px); opacity: 0; }
        }
        .tax-promo-paper {
          animation: tax-promo-paper-slide 1.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default TaxCalculatorPromo;