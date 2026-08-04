import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TaxCalculatorPromo from "@/components/TaxCalculatorPromo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TaxCalculatorPromo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;