import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Globe, Zap, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import HeroCarFilter from "./HeroCarFilter";

const HERO_IMAGES = [
  "/image1.webp",
  "/image2.webp",
  "/image.png",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center">

      {/* Background slides */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 z-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ))}

      {/* Dark overlay — lighter than before */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">

          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
            Import Your Dream Car
            <span className="block text-accent mt-1">
              Directly from Japan
            </span>
          </h1>

          <p className="text-white/75 text-lg max-w-xl mx-auto leading-relaxed">
            At <span className="text-white font-semibold">Xplore Imports</span>, we handle car importations from Japan 
            for our clients. We take care of the entire processm, from sourcing to delivery, ensuring a seamless experience.
            We are government licenced importers. Our team of experts will help you find the perfect car and handle the process in a transparent 
            and efficient manner. 
          </p>

          {/* Filter */}
          <div className="pt-4">
            <HeroCarFilter />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="hero" size="lg" asChild>
              <Link to="/about">
                About us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="green" size="lg" asChild>
              <Link to="/car-options">Browse All Cars</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-2xl mx-auto">
            {[
              { icon: CheckCircle, label: "Quality", sub: "Assured", color: "text-blue-300" },
              { icon: Zap, label: "Fast", sub: "Service", color: "text-accent" },
              { icon: Globe, label: "Global", sub: "Sourcing", color: "text-blue-300" },
              { icon: Shield, label: "Secure", sub: "Process", color: "text-accent" },
            ].map(({ icon: Icon, label, sub, color }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 text-center"
              >
                <Icon className={`h-7 w-7 ${color} mx-auto mb-1.5`} />
                <p className={`text-xs font-semibold ${color}`}>{label}</p>
                <p className="text-xs text-white/50">{sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;