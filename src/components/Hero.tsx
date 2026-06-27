import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-white text-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-6 sm:px-10 sm:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Text */}
          <div className="space-y-4 sm:w-1/2">
            <h1 className="text-xl font-semibold leading-tight sm:text-3xl">
              Welcome to the Xplore family!
            </h1>
            <p className="text-base leading-7 text-slate-700">
              A high quality car gives you confindence in ownership. That's why we import high grade cars (4.5 and above) with low mileage (below 50K Km). Don't just import, insist on HIGH QUALITY!
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/car-options"
                className="inline-flex items-center justify-center rounded bg-[#1B8F5A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#157a4b] transition-colors"
              >
                Browse Imported Cars
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded border border-[#0A2240] px-6 py-3 text-sm text-[#0A2240] hover:bg-[#0A2240] hover:text-white transition-colors"
              >
                Get to know us
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="sm:w-1/2">
            <img
              src="/hero-tinguan.jpg"
              alt="Imported vehicle"
              className="w-full h-56 mx-auto rounded object-cover sm:h-[28rem]"
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;