import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Youtube, Instagram, MessageCircle, Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background transition-colors border-t border-border/10">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/favicon.ico" alt="Logo" className="h-10 w-10 rounded-lg object-contain" />
              <div>
                <h3 className="font-display font-bold text-lg text-background">Xplore Car Imports</h3>
                <p className="text-xs text-background/60 font-body">Import From Japan With Ease</p>
              </div>
            </div>
            <p className="text-sm text-background/60 font-body leading-relaxed">
              Your trusted partner for importing quality vehicles from Japan to Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-widest text-accent mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-body text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Car Options", path: "/car-options" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-widest text-accent mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5 font-body text-sm">
              {[
                { name: "Car Importation", path: "/services/car-importation" },
                { name: "Taxi Business Advisory", path: "/services/taxi-masterclass" },
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-widest text-accent mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3 font-body text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                <span>New Rain, along Kenyatta Road — Nairobi</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                <a href="tel:+254757356989" className="hover:text-accent transition-colors">
                  +254 757 356 989
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                <a href="mailto:localsays@gmail.com" className="hover:text-accent transition-colors">
                  localsays@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-12 flex justify-center gap-6">
          {[
            { Icon: Facebook, color: "#1877F2", href: "https://www.facebook.com/XploreImports", label: "Facebook" },
            { Icon: Youtube, color: "#FF0000", href: "https://www.youtube.com/@Explore254Discover", label: "YouTube" },
            { Icon: Music, color: "#ffffff", href: "https://www.tiktok.com/@explore_254k3", label: "TikTok" },
            { Icon: Instagram, color: "#E1306C", href: "https://www.instagram.com/xplorecar_imports/", label: "Instagram" },
            { Icon: MessageCircle, color: "#25D366", href: "https://wa.me/254757356989", label: "WhatsApp" },
          ].map(({ Icon, color, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:scale-110 transition-transform"
            >
              <Icon className="h-5 w-5" style={{ color }} />
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-10 pt-6 text-center font-body text-sm text-background/50">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-accent font-medium">Xplore Car Imports</span>. All rights reserved.
          </p>
          <p className="mt-1">
            Powered by{" "}
            <a
              href="https://wa.me/254757356989"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-4"
            >
              CodeConjurer Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
