import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    iconClass: "ti ti-clipboard-search",
    color: {
      bg: "#5DCAA5",
      icon: "#04342C",
    },
    title: "Searching from the verified car auctions in Japan",
    description:
      "We tap into Japan's largest dealer networks and auction houses to find the exact make, model, grade, and trim that matches your budget and needs. Every auction sheet is verified and graded before we recommend it.",
    highlights: ["Auction sheet analysis", "Grade & mileage verification", "Budget-matched options"],
  },
  {
    number: "02",
    iconClass: "ti ti-ship",
    color: {
      bg: "#378ADD",
      icon: "#042C53",
    },
    title: "Shipping & Logistics",
    description:
      "Once your vehicle is secured, we coordinate the full freight chain from the Japanese port of departure to Mombasa. We handle RoRo or container shipping, booking, and real-time tracking so you always know where your car is.",
    highlights: ["RoRo & container shipping", "Port-to-port coordination", "Live shipment tracking"],
  },
  {
    number: "03",
    iconClass: "ti ti-receipt-2",
    color: {
      bg: "#EF9F27",
      icon: "#412402",
    },
    title: "Customs Clearance & Duty",
    description:
      "Our team manages every piece of KRA documentation, import duty calculation, KEBS roadworthiness inspection, and port release accurately and on time. No surprises, no delays.",
    highlights: ["KRA duty computation", "KEBS inspection liaison", "Port release & documentation"],
  },
  {
    number: "04",
    iconClass: "ti ti-map-pin-check",
    color: {
      bg: "#7F77DD",
      icon: "#26215C",
    },
    title: "Registration & Delivery",
    description:
      "We guide and help with NTSA registration and logbook processing to number plate assignment and final delivery, we complete the last mile so your car arrives road-legal, inspected, and delivered directly to your door anywhere in Kenya.",
    highlights: ["NTSA registration", "Logbook & plates", "Nationwide delivery"],
  },
];

const Services = () => {
  return (
    <>
      {/* Tabler Icons CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
      />

      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">

          {/* Section Header */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  How We Import<br />Your Car From Japan
                </h2>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed md:text-right">
                Every step handled by our team from finding the right vehicle at auction
                to handing you your car.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((service, index) => (
              <div
                key={service.number}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/40 hover:shadow-large hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Watermark number */}
                <span className="absolute top-4 right-6 font-display text-7xl font-black text-foreground/5 group-hover:text-primary/8 transition-colors duration-300 select-none leading-none">
                  {service.number}
                </span>

                {/* Icon */}
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: service.color.bg }}
                >
                  <i
                    className={service.iconClass}
                    style={{ color: service.color.icon, fontSize: "26px" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                    {service.description}
                  </p>

                  {/* Highlight chips */}
                  <div className="flex flex-wrap gap-2">
                    {service.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full border border-border group-hover:border-primary/20 transition-colors duration-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step connector dot */}
                {index < services.length - 1 && index % 2 === 0 && (
                  <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full border-2 items-center justify-center"
                    style={{ backgroundColor: `${service.color.bg}33`, borderColor: `${service.color.bg}66` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color.bg }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-12 bg-primary/5 border border-primary/15 rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-display text-lg font-bold text-foreground">
                Ready to import your car?
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Talk to us and we'll walk you through the process - no commitment needed.
              </p>
            </div>
            <Link
              to="/services/car-importation"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default Services;