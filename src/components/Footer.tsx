import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background transition-colors border-t border-border/10">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-lg object-contain" />
              <div>
                <h3 className="font-display font-bold text-lg text-background">Xplore Car Imports</h3>
                <p className="text-xs text-background/60">Import From Japan With Ease</p>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Your trusted partner for importing quality vehicles from Japan to Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-primary mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Car Options", path: "/car-options" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link to={path} className="text-background/70 hover:text-primary transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-primary mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Car Importation", path: "/services/car-importation" },
                { name: "Taxi Business Advisory", path: "/services/taxi-masterclass" },
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link to={path} className="text-background/70 hover:text-primary transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-primary mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>New Rain, along Kenyatta Road — Nairobi</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+254757356989" className="hover:text-primary transition-colors">
                  +254 757 356 989
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="mailto:localsays@gmail.com" className="hover:text-primary transition-colors">
                  localsays@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-12 flex justify-center gap-5">

          <a href="https://www.facebook.com/XploreImports" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1877F2] hover:opacity-90 hover:scale-110 transition-all">
            <FaFacebookF className="h-4 w-4 text-white" />
          </a>

          <a href="https://www.youtube.com/@Explore254Discover" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FF0000] hover:opacity-90 hover:scale-110 transition-all">
            <FaYoutube className="h-4 w-4 text-white" />
          </a>

          <a href="https://www.tiktok.com/@explore_254k3" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#010101] border border-white/10 hover:opacity-90 hover:scale-110 transition-all">
            <FaTiktok className="h-4 w-4 text-white" />
          </a>

          <a href="https://www.instagram.com/xplorecar_imports/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] hover:opacity-90 hover:scale-110 transition-all">
            <FaInstagram className="h-4 w-4 text-white" />
          </a>

          <a href="https://wa.me/254757356989" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#25D366] hover:opacity-90 hover:scale-110 transition-all">
            <FaWhatsapp className="h-4 w-4 text-white" />
          </a>

        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-10 pt-6 text-center text-sm text-background/50">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-primary font-medium">Xplore Car Imports</span>. All rights reserved.
          </p>
          <p className="mt-1">
            Powered by{" "}
            <a
              href="https://wa.me/254757356989"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4"
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