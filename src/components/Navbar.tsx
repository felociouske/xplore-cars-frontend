import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Car Options", path: "/car-options" },
    { name: "Blogs", path: "/blog" },
    { name: "Testimonials", path: "/#testimonials" },
    { name: "About Us", path: "/about" },
  ];

  const isActive = (path: string) =>
    location.pathname === path || location.hash === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/logo.jpg"
                alt="Xplore Car Imports"
                className="h-10 w-10 object-contain transition-transform group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-lg text-foreground">
                Xplore Car Imports
              </span>
              <span className="text-xs text-muted-foreground font-body">
                Import from Japan with ease
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) =>
              link.name === "Services" ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-body font-medium flex items-center gap-1 transition-colors ${
                      isServicesOpen
                        ? "text-accent"
                        : "text-foreground hover:text-accent"
                    }`}
                  >
                    {link.name} <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div
                    className={`absolute left-0 mt-1 w-64 bg-card border border-border rounded-xl shadow-large py-2 z-50 transition-all duration-200 ${
                      isServicesOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                  </div>
                </div>
              ) : link.name === "Testimonials" ? (
                <HashLink
                  key={link.path}
                  smooth
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-body font-medium transition-colors ${
                    isActive(link.path) ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.name}
                </HashLink>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-body font-medium transition-colors ${
                    isActive(link.path) ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}

            <div className="flex items-center gap-3 ml-4">
              <ThemeToggle />
              <Link
                to="/contact"
                className="bg-foreground text-background px-5 py-2 rounded-lg text-sm font-body font-medium hover:bg-accent hover:text-accent-foreground transition-colors gold-shimmer"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-border pt-3">
            {navLinks.map((link) =>
              link.name === "Services" ? (
                <div key={link.name}>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="w-full text-left px-4 py-2.5 rounded-md text-sm font-body font-medium text-foreground hover:text-accent flex justify-between items-center transition-colors"
                  >
                    Services <ChevronDown className="h-4 w-4" />
                  </button>
                  {isServicesOpen && (
                    <div className="pl-4 mt-1 space-y-1">
                      <Link
                        to="/services/car-importation"
                        onClick={() => { setIsOpen(false); setIsServicesOpen(false); }}
                        className="block px-4 py-2 text-sm font-body text-foreground hover:text-accent transition-colors"
                      >
                        Car Importation
                      </Link>
                      <Link
                        to="/services/taxi-masterclass"
                        onClick={() => { setIsOpen(false); setIsServicesOpen(false); }}
                        className="block px-4 py-2 text-sm font-body text-foreground hover:text-accent transition-colors"
                      >
                        Kenya Taxi Business Advisory
                      </Link>
                    </div>
                  )}
                </div>
              ) : link.name === "Testimonials" ? (
                <HashLink
                  key={link.path}
                  smooth
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-md text-sm font-body font-medium transition-colors ${
                    isActive(link.path) ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.name}
                </HashLink>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-md text-sm font-body font-medium transition-colors ${
                    isActive(link.path) ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
            <div className="px-4 pt-3">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-foreground text-background px-4 py-3 rounded-lg text-sm font-body font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Get Started Today
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
