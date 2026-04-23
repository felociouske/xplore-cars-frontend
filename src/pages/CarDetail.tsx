import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Phone,
  MessageCircle,
  Mail,
  ArrowLeft,
  Car,
  Gauge,
  Settings,
  Fuel,
  Calendar,
  PaintBucket,
  ChevronLeft,
  ChevronRight,
  Star,
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


interface Car {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  engine_type: string;
  transmission: string;
  mileage: number;
  color: string;
  grade?: string;
  status?: string;
  features?: string;
  description?: string;
  images?: string[];
}

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [carData, setCarData] = useState<Car | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    async function loadCarDetails() {
      setLoading(true);
      try {
        const cars = await fetchCars();
        const foundCar = cars.find((car: Car) => String(car.id) === id);
        if (!foundCar) return setCarData(null);

        setCarData(foundCar);

        const fullImages = (foundCar.images || []).map((img: string) =>
          img.startsWith("http") ? img : `${API_BASE_URL.replace('/api', '')}${img}`
        );
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
      <div className="h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
        Loading car details...
      </div>
    );
  }

  if (!carData) {
    return <Navigate to="/inventory" replace />;
  }

  const handleNextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${carData.name} listed on your website.`
    );
    window.open(`https://wa.me/254757356989?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:+254757356989`;
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Inquiry about ${carData.name}`);
    const body = encodeURIComponent(
      `Hello, I'm interested in the ${carData.name}. Please provide more details.`
    );
    window.location.href = `mailto:info@xploreimports.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900 dark:text-white transition-colors">
      <Navbar />

      <motion.main
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors"
      >
        {/* Breadcrumb */}
        <div className="bg-gray-100 dark:bg-gray-800 py-4 transition-colors">
          <div className="container mx-auto px-4">
            <Link
              to="/car-options"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Car Options
            </Link>
          </div>
        </div>

        {/* Car Detail */}
        <div className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* === Image Section === */}
            <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow transition-colors">
              {images.length > 0 ? (
                <>
                  {/* Main image */}
                  <img
                    src={images[currentImageIndex]}
                    alt={carData.name}
                    className="w-full h-[400px] object-cover transition-transform duration-500 ease-in-out"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = "/placeholder-car.jpg")
                    }
                  />

                  {/* Navigation buttons */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 shadow transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 shadow transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Thumbnails */}
                  {images.length > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-3 p-3 flex-wrap">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          className={`border-2 rounded-md overflow-hidden cursor-pointer transition-all ${
                            currentImageIndex === idx
                              ? "border-primary scale-105"
                              : "border-gray-300 dark:border-gray-600 hover:border-primary"
                          }`}
                          onClick={() => setCurrentImageIndex(idx)}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="h-16 w-20 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <img
                  src="/placeholder-car.jpg"
                  alt="No car image"
                  className="w-full h-[400px] object-cover"
                />
              )}

              {carData.status && (
                <Badge className="absolute top-4 right-4 bg-primary/90 capitalize">
                  {carData.status}
                </Badge>
              )}
            </div>

            {/* === Car Info === */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2 dark:text-white">
                  {carData.name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{carData.year}</Badge>
                  <Badge variant="outline">{carData.make}</Badge>
                  <Badge variant="outline">{carData.model}</Badge>
                </div>
                <p className="text-4xl font-bold text-primary">
                  KES {Number(carData.price).toLocaleString()}
                </p>
              </div>

              <Separator />

              {/* Specs */}
              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-white">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 gap-4 text-gray-800 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-primary" />
                    <span>
                      <strong>Engine:</strong> {carData.engine_type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>
                      <strong>Transmission:</strong> {carData.transmission}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-primary" />
                    <span>
                      <strong>Mileage:</strong>{" "}
                      {carData.mileage?.toLocaleString()} km
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PaintBucket className="h-5 w-5 text-primary" />
                    <span>
                      <strong>Color:</strong> {carData.color}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>
                      <strong>Year:</strong> {carData.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>
                      <strong>Grade:</strong>{" "}
                      {carData.grade ? carData.grade : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    <span>
                      <strong>Status:</strong> {carData.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              {carData.features && (
                <>
                  <Separator />
                  <div>
                    <h2 className="text-xl font-semibold mb-2 dark:text-white">
                      Features
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      {carData.features
                        .split("\n")
                        .filter((f: string) => f.trim() !== "")
                        .map((feat: string, idx: number) => (
                          <li key={idx}>{feat}</li>
                        ))}
                    </ul>
                  </div>
                </>
              )}

              <Separator />

              {/* Inventory Enquiry Modal */}
              {selectedCar && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl max-h-[90vh] overflow-y-auto w-full max-w-2xl p-6 relative shadow-2xl animate-fadeInScale flex flex-col justify-center items-center">
                    <CarInventoryEnquiry
                      car={selectedCar}
                      onClose={() => setSelectedCar(null)}
                    />
                  </div>
                </div>
              )}

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                <Button
                  onClick={() => setSelectedCar(carData)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Mail className="mr-2 h-5 w-5" /> Enquiry
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                </Button>
                <Button onClick={handleCall} variant="outline">
                  <Phone className="mr-2 h-5 w-5" /> Call
                </Button>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card className="mt-12 bg-white dark:bg-gray-800 transition-colors">
            <CardHeader>
              <CardTitle className="dark:text-white">Car Description</CardTitle>
            </CardHeader>
            <CardContent>
              {carData.description ? (
                <div className="prose dark:prose-invert max-w-none leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {carData.description}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  No detailed description is available for this vehicle.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default CarDetail;
