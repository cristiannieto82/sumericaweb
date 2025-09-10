import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
    alt: "Operación minera a gran escala con maquinaria pesada"
  },
  {
    url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
    alt: "Sitio de construcción con grúas y materiales"
  },
  {
    url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
    alt: "Torre de telecomunicaciones con equipos modernos"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = heroImages[currentSlide];

  return (
    <section className="relative h-[600px] hero-carousel">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${currentImage.url}')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Soluciones que Impulsan tu Industria
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Desde climatización especializada hasta el suministro integral para tu faena
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalog">
                <Button className="sumerica-yellow px-8 py-4 text-lg font-semibold" data-testid="button-hero-catalog">
                  Ver Catálogo de Productos
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-black"
                  data-testid="button-hero-contact"
                >
                  Hablar con un Especialista
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-opacity ${
              index === currentSlide ? 'bg-white opacity-100' : 'bg-white opacity-50'
            }`}
            onClick={() => setCurrentSlide(index)}
            data-testid={`button-carousel-indicator-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
