import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Clock, CreditCard, FileCheck, MapPin, CheckCircle } from "lucide-react";
import { useState } from "react";
import QuoteModal from "@/components/quote-modal";

// Single optimized hero image
const heroImage = {
  url: "https://images.unsplash.com/photo-1630683924997-fe27050a0416?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt: "Operación industrial con maquinaria y equipos especializados",
};

const categories = [
  "Climatización",
  "Telecom", 
  "EPP",
  "Ferretería"
];

const trustIndicators = [
  {
    icon: Clock,
    text: "Puntualidad garantizada"
  },
  {
    icon: CreditCard,
    text: "Crédito a empresas"
  },
  {
    icon: FileCheck,
    text: "Boleta y factura"
  },
  {
    icon: MapPin,
    text: "Cobertura nacional"
  }
];

export default function HeroCarousel() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <section className="relative h-[600px] lg:h-[700px] hero-section">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%), url('${heroImage.url}')`,
          }}
        >
          <div className="absolute inset-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-[680px] text-white">
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  Todo para tu Faena: Clima, Telecom, EPP y Construcción
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl sm:text-2xl mb-8 text-white/90 font-medium">
                  Te cotizamos hoy. Entrega rápida. Crédito para empresas disponible.
                </p>

                {/* Category Chips */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {categories.map((category) => (
                    <Badge 
                      key={category}
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="sumerica-yellow px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                    aria-label="Armar cotización de productos industriales"
                    data-testid="button-hero-quote"
                  >
                    Armar Cotización
                  </Button>
                  
                  <Link href="/catalog">
                    <Button
                      variant="secondary"
                      className="bg-white text-black px-8 py-4 text-lg font-bold hover:bg-gray-100 shadow-lg transition-all"
                      size="lg"
                      aria-label="Ver catálogo completo de productos"
                      data-testid="button-hero-catalog"
                    >
                      Ver Catálogo
                    </Button>
                  </Link>
                </div>

                {/* Microtext */}
                <p className="text-sm text-white/80 mb-8 font-medium">
                  Respuesta en &lt;24 h hábil • Cobertura nacional • Boleta y factura
                </p>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/90">
                      <indicator.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{indicator.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </>
  );
}
