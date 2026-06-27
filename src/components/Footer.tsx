import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTiktok } from "react-icons/fa";

const SOCIAL_LINKS = [
  { name: "YouTube", href: "https://www.youtube.com/@Explore254Discover", icon: FaYoutube, bg: "#FF0000" },
  { name: "TikTok", href: "https://www.tiktok.com/@explore_254k3", icon: FaTiktok, bg: "#010101" },
];

const Footer = () => (
  <footer className="bg-[#071828] text-slate-300">
    <div className="max-w-6xl mx-auto px-6 py-14 sm:px-10">

      {/* Centered grid — 3 columns on desktop, stacks on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center text-center">

        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <img
            src="/logo.jpg"
            alt="Xplore Car Imports"
            className="h-14 w-14 rounded-md object-cover"
          />
          <p className="text-xl font-semibold text-white">Xplore Car Imports</p>
          <p className="text-base text-slate-400 max-w-xs">
            Low Mileage. High-Grade Cars.
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold text-white mb-1">Contact</p>
          <a href="tel:+254757356989" className="text-base text-slate-300 hover:text-white transition-colors">
            +254 757 356 989
          </a>
          <a href="mailto:localsays@gmail.com" className="text-base text-slate-300 hover:text-white transition-colors">
            localsays@gmail.com
          </a>
          <span className="text-base text-slate-400">Zuhura Place 2nd floor, Thika Town</span>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-semibold text-white">Follow Us</p>

          <div className="grid grid-cols-2 gap-3">
            {SOCIAL_LINKS.map(({ name, href, icon: Icon, bg }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                style={{ background: bg }}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white hover:scale-110 transition-transform"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-slate-800 pt-6 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Xplore Car Imports.
        </p>
      </div>

    </div>
  </footer>
);

export default Footer;