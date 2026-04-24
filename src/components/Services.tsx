import { Button } from "./ui/button";
import { Search, CarFront, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Comprehensive Car Import Services
          </div>
          <h2 className="text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer end-to-end car importation and taxi business advisory designed to make
            your car buying journey simple, transparent, and profitable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Car Importation — with image on top */}
          <div className="group border border-border rounded-2xl overflow-hidden bg-card hover:shadow-large hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">

            {/* Content */}
            <div className="p-8">
              <div className="bg-primary/10 p-4 rounded-xl w-fit mb-5 group-hover:bg-primary transition-all duration-300">
                <Search className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                Car Importation
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We source high-quality vehicles from trusted dealers and auctions in Japan,
                ensuring every import meets strict quality and value standards tailored to your budget.
                From sourcing to doorstep delivery — we handle everything.
              </p>
              <Button asChild>
                <Link to="/services/car-importation">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Taxi Advisory */}
          <div className="group border border-border rounded-2xl p-8 bg-card hover:shadow-large hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-primary/10 p-4 rounded-xl w-fit mb-6 group-hover:bg-primary transition-all duration-300">
              <CarFront className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
              Kenya Taxi Business Advisory
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Thinking of starting a taxi or ride-hailing business? Get professional guidance on vehicle
              selection, financing, and licensing to build a profitable and sustainable taxi business in Kenya.
            </p>
            <Button asChild variant="outline">
              <Link to="/services/taxi-masterclass">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;