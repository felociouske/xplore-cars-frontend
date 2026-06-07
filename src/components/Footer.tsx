import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram, FaWhatsapp } from "react-icons/fa";

const POPULAR_MAKES = ["Toyota", "Nissan", "Mazda", "Honda", "Subaru", "Mercedes-Benz", "Volkswagen", "Mitsubishi"];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background border-t border-background/10 transition-colors">

      {/* ── Main grid ── */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Xplore Car Imports" className="h-9 w-9 rounded-lg object-contain flex-shrink-0" />
              <div>
                <h3 className="font-display font-bold text-base text-background leading-tight">Xplore Car Imports</h3>
                <p className="text-[11px] text-background/50 leading-tight">Import From Japan With Ease</p>
              </div>
            </div>

            <p className="text-sm text-background/60 leading-relaxed">
              Car imports to Kenya done with verified sourcing, transparent costing, and
              end-to-end support from Japan to your doorstep.
            </p>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2">
              {["Transparent costing", "Verified sourcing", "End-to-end support"].map((chip) => (
                <span key={chip} className="text-[11px] font-medium border border-background/20 text-background/70 px-3 py-1 rounded-full">
                  {chip}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-2 pt-1">
              <Link
                to="/car-options"
                className="text-sm font-bold bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Free Quote
              </Link>
              <a
                href="https://wa.me/254757356989"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold border-2 border-background/30 text-background px-4 py-2 rounded-lg hover:border-background/60 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "Browse Cars", path: "/car-options" },
                { name: "About Us", path: "/about" },
                { name: "Blog", path: "/blog" },
                { name: "Testimonials", path: "/#testimonials" },
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link to={path} className="text-sm text-background/65 hover:text-primary transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Makes */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-primary mb-4">
              Popular Makes
            </h4>
            <ul className="space-y-2.5">
              {POPULAR_MAKES.map((make) => (
                <li key={make}>
                  <Link
                    to={`/car-options?make=${encodeURIComponent(make)}`}
                    className="text-sm text-background/65 hover:text-primary transition-colors"
                  >
                    {make}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-primary mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <p className="text-xs font-semibold text-background/50 uppercase tracking-wide mb-0.5">Office</p>
                <div className="flex items-start gap-2 text-sm text-background/65">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary" />
                  <span>New Rain, along Kenyatta Road, Nairobi</span>
                </div>
              </li>
              <li>
                <p className="text-xs font-semibold text-background/50 uppercase tracking-wide mb-0.5">Call / WhatsApp</p>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                  <a href="tel:+254757356989" className="text-background/65 hover:text-primary transition-colors font-medium">
                    +254 757 356 989
                  </a>
                </div>
              </li>
              <li>
                <p className="text-xs font-semibold text-background/50 uppercase tracking-wide mb-0.5">Email</p>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                  <a href="mailto:localsays@gmail.com" className="text-background/65 hover:text-primary transition-colors">
                    localsays@gmail.com
                  </a>
                </div>
              </li>
              <li className="pt-1">
                <p className="text-xs text-background/40 italic">Car Imports Done Right.</p>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex gap-2.5 mt-5">
              <a href="https://www.facebook.com/XploreImports" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1877F2] hover:scale-110 hover:opacity-90 transition-all">
                <FaFacebookF className="h-3.5 w-3.5 text-white" />
              </a>
              <a href="https://www.youtube.com/@Explore254Discover" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FF0000] hover:scale-110 hover:opacity-90 transition-all">
                <FaYoutube className="h-3.5 w-3.5 text-white" />
              </a>
              <a href="https://www.tiktok.com/@explore_254k3" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#010101] border border-white/10 hover:scale-110 hover:opacity-90 transition-all">
                <FaTiktok className="h-3.5 w-3.5 text-white" />
              </a>
              <a href="https://www.instagram.com/xplorecar_imports/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] hover:scale-110 hover:opacity-90 transition-all">
                <FaInstagram className="h-3.5 w-3.5 text-white" />
              </a>
              <a href="https://wa.me/254757356989" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#25D366] hover:scale-110 hover:opacity-90 transition-all">
                <FaWhatsapp className="h-3.5 w-3.5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-background/45">
            &copy; {new Date().getFullYear()} Xplore Car Imports. Nairobi, Kenya.
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;