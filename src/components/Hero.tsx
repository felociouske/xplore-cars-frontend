import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Globe, Zap, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden ">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-100"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div/>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 border border-primary/20 rounded-full px-4 py-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-black font-bold">Trusted Vehicle Importation Services</span>
            </div>

            <div className="bg-white/80 p-8 rounded-2xl incline-block space-y-4">
              <h1 className="text-black text-5xl md:text-6xl font-bold leading-tight">
                Trusted
                <span className="block bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent py-3">
                  Global Shipping
                </span>
                Partners
              </h1>
              <p className="text-black/80 font-semibold max-w-xl p-6 rounded-xl  text-lg">
                At <span className="text-black/80 font-semibold">Xplore Imports</span>, we make car importation 
                simple, transparent, and stress-free. Whether you’re buying your 
                <span className="text-black/80 font-semibold"> first car </span> 
                or expanding your 
                <span className="text-black/80 font-semibold"> taxi business</span>, we help you source 
                <span className="text-black/80 font-semibold"> quality, affordable vehicles </span> 
                from <span className="text-black/80 font-semibold">Japan</span> and handle everything 
                from <span className="text-black/80 font-semibold">shipping</span> to 
                <span className="text-black/80 font-semibold"> doorstep delivery</span>. 
                We also teach our clients the ins and outs of importation through our 
                <span className="text-black/80y font-semibold"> Car Importation Masterclass</span>. 
                With us, you’re not just importing a car you’re gaining a 
                <span className="text-black/80 font-semibold"> trusted partner</span>.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="green" size="lg" asChild>
                <Link to="/car-options">Checkout Out Car Options</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-medium transition-shadow">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-xs font-semibold text-primary">Quality</p>
                <p className="text-xs text-muted-foreground">Assured</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-medium transition-shadow">
                <Zap className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-xs font-semibold text-accent">Fast</p>
                <p className="text-xs text-muted-foreground">Service</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-medium transition-shadow">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-xs font-semibold text-primary">Global</p>
                <p className="text-xs text-muted-foreground">Sourcing</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-medium transition-shadow">
                <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-xs font-semibold text-accent">Secure</p>
                <p className="text-xs text-muted-foreground">Process</p>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-large">
              <p className="text-3xl font-bold text-primary">100+</p>
              <p className="text-sm text-muted-foreground">Cars Imported</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
