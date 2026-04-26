import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Phone, MessageCircle, Mail, ArrowLeft, Car, Gauge,
  Settings, Fuel, Calendar, PaintBucket, ChevronLeft, ChevronRight, Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { fadeUp } from "../animations/fadeUp";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { fetchCars } from "../services/api";
import CarInventoryEnquiry from "../components/CarInventoryEnquiry";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

interface CarData {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  price_from: number;
  price_to?: number;
  price_display: string;
  engine_type: string;
  transmission: string;
  mileage: number;
  color: string;
  grade?: string;
  status?: string;
  features?: string;
  description?: string;
  images?: any[];
}

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [carData, setCarData] = useState<CarData | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);

  useEffect(() => {
    async function loadCarDetails() {
      setLoading(true);
      try {
        const cars = await fetchCars();
        const foundCar = cars.find((car: CarData) => String(car.id) === id);
        if (!foundCar) return setCarData(null);

        setCarData(foundCar);

        const fullImages = (foundCar.images || []).map((img: any) => {
          const src = typeof img === "string" ? img : img.image;
          return src?.startsWith("http") ? src : `${API_BASE_URL.replace('/api', '')}${src}`;
        });
        setImages(fullImages);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast({ title: "Error loading car details." });
      } finally {
        setLoading(false);
      }
    }
    loadCarDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!carData) return <Navigate to="/car-options" replace />;

  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${carData.name || `${carData.make} ${carData.model}`} listed on your website.`
    );
    window.open(`https://wa.me/254757356989?text=${message}`, "_blank");
  };

  const handleCall = () => { window.location.href = `tel:+254757356989`; };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Inquiry about ${carData.name || carData.make}`);
    const body = encodeURIComponent(`Hello, I'm interested in this vehicle. Please provide more details.`);
    window.location.href = `mailto:localsays@gmail.com?subject=${subject}&body=${body}`;
  };

  const priceDisplay = () => {
    if (!carData.price_from) return "Price on Request";
    const from = `KES ${Number(carData.price_from).toLocaleString()}`;
    if (carData.price_to) return `${from} – ${Number(carData.price_to).toLocaleString()}`;
    return from;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      <Navbar />

      <motion.main variants={fadeUp} initial="hidden" animate="visible" className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-secondary py-4 transition-colors">
          <div className="container mx-auto px-4">
            <Link
              to="/car-options"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Car Options
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Image Section */}
            <div className="relative rounded-xl overflow-hidden border border-border shadow-soft transition-colors">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[currentImageIndex]}
                    alt={carData.name || `${carData.make} ${carData.model}`}
                    className="w-full h-[420px] object-cover transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-car.jpg"; }}
                  />

                  {images.length > 1 && (
                    <>
                      <button onClick={handlePrevImage}
                        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-colors">
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button onClick={handleNextImage}
                        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-colors">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {images.length > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-3 p-3 flex-wrap bg-secondary/50">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                            currentImageIndex === idx ? "border-primary scale-105" : "border-border hover:border-primary"
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-16 w-20 object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <img src="/placeholder-car.jpg" alt="No car image" className="w-full h-[420px] object-cover" />
              )}

              {carData.status && (
                <Badge className="absolute top-4 left-4 capitalize bg-primary/90">
                  {carData.status}
                </Badge>
              )}
            </div>

            {/* Car Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
                  {carData.name || `${carData.make} ${carData.model}`}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{carData.year}</Badge>
                  <Badge variant="outline">{carData.make}</Badge>
                  <Badge variant="outline">{carData.model}</Badge>
                </div>

                {/* Price range */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-3 inline-block">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Price</p>
                  <p className="text-3xl font-display font-bold text-primary">
                    {priceDisplay()}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Specs */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-foreground">Specifications</h2>
                <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-primary flex-shrink-0" />
                    <span><strong>Engine:</strong> {carData.engine_type || "—"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary flex-shrink-0" />
                    <span><strong>Transmission:</strong> {carData.transmission || "—"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-primary flex-shrink-0" />
                    <span><strong>Mileage:</strong> {carData.mileage?.toLocaleString() || "—"} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PaintBucket className="h-4 w-4 text-primary flex-shrink-0" />
                    <span><strong>Color:</strong> {carData.color || "—"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                    <span><strong>Year:</strong> {carData.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <span><strong>Grade:</strong> {carData.grade || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary flex-shrink-0" />
                    <span><strong>Status:</strong> {carData.status || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              {carData.features && (
                <>
                  <Separator />
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-foreground">Features</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {carData.features.split("\n").filter((f) => f.trim()).map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <Separator />

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={() => setSelectedCar(carData)} className="bg-blue-600 hover:bg-blue-700">
                  <Mail className="mr-2 h-4 w-4" /> Enquiry
                </Button>
                <Button onClick={handleWhatsApp} className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </Button>
                <Button onClick={handleCall} variant="outline">
                  <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Car Description</CardTitle>
            </CardHeader>
            <CardContent>
              {carData.description ? (
                <div className="prose dark:prose-invert max-w-none leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{carData.description}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  No detailed description is available for this vehicle.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.main>

      {/* Enquiry Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-card rounded-2xl max-h-[90vh] overflow-y-auto w-full max-w-xl shadow-large">
            <CarInventoryEnquiry car={selectedCar} onClose={() => setSelectedCar(null)} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CarDetail;