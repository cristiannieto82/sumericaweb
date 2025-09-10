import HeroCarousel from "@/components/hero-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Snowflake, Truck, CreditCard, HardHat, Building, Zap, Factory } from "lucide-react";
import { Link } from "wouter";

const categories = [
  {
    id: "climatizacion",
    name: "Climatización",
    description: "Sistemas HVAC industriales, aire acondicionado de precisión y soluciones de climatización para faenas y plantas.",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    buttonText: "Explorar Climatización",
    icon: "❄️",
    priority: 1
  },
  {
    id: "telecomunicaciones",
    name: "Telecomunicaciones",
    description: "Redes, cableado estructurado y antenas industriales para máxima conectividad en terreno.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    buttonText: "Ver soluciones de Telecom",
    icon: "📡",
    priority: 2
  },
  {
    id: "epp-seguridad",
    name: "EPP y Seguridad",
    description: "Protección personal certificada: cascos, guantes, calzado y equipos de seguridad industrial.",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    buttonText: "Cotizar EPP ahora",
    icon: "🦺",
    priority: 3
  },
  {
    id: "ferreteria",
    name: "Ferretería Industrial",
    description: "Todo en herramientas, tornillería y accesorios para proyectos de construcción y minería.",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    buttonText: "Explorar Ferretería",
    icon: "🛠️",
    priority: 4
  },
  {
    id: "construccion",
    name: "Construcción",
    description: "Materiales, maquinaria y equipos especializados para obras de gran escala.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    buttonText: "Ver productos de Construcción",
    icon: "🏗️",
    priority: 5
  }
];

const industries = [
  { 
    name: "Minería", 
    icon: HardHat,
    description: "Insumos y equipos especializados para faenas en terreno."
  },
  { 
    name: "Construcción", 
    icon: Building,
    description: "Materiales y herramientas para obras a gran escala."
  },
  { 
    name: "Energía", 
    icon: Zap,
    description: "Soluciones eléctricas y climatización para plantas energéticas."
  },
  { 
    name: "Industrial", 
    icon: Factory,
    description: "Ferretería, seguridad y telecomunicaciones para la industria general."
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroCarousel />

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1: Especialistas en Clima y Telecom */}
            <div
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-gray-300 cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
              data-analytics="benefit-clima"
              data-testid="card-benefit-clima"
              onClick={(e) => {
                if (!(e.target as Element)?.closest('a')) {
                  window.location.href = '/services#climatizacion-telecom';
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !(e.target as Element)?.closest('a')) {
                  e.preventDefault();
                  window.location.href = '/services#climatizacion-telecom';
                }
              }}
            >
              <div className="flex items-center justify-center w-8 h-8 mb-6">
                <Snowflake className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Especialistas en Clima y Telecom
              </h3>
              <p className="text-base mb-6" style={{ color: '#5B5F66' }}>
                Asesoría técnica y precios competitivos para proyectos exigentes. Split/VRF, ductos, cableado y conectividad. Importación a pedido.
              </p>
              <a
                href="/services#climatizacion-telecom"
                className="inline-flex items-center text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded"
                aria-label="Ver soluciones de Clima y Telecom"
                data-testid="link-clima-solutions"
                onClick={(e) => e.stopPropagation()}
              >
                Ver soluciones de Clima y Telecom →
              </a>
            </div>

            {/* Benefit 2: Logística Rápida y Confiable */}
            <div
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-gray-300 cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
              data-analytics="benefit-logistica"
              data-testid="card-benefit-logistica"
              onClick={(e) => {
                if (!(e.target as Element)?.closest('a')) {
                  window.location.href = '/contact#logistica';
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !(e.target as Element)?.closest('a')) {
                  e.preventDefault();
                  window.location.href = '/contact#logistica';
                }
              }}
            >
              <div className="flex items-center justify-center w-8 h-8 mb-6">
                <Truck className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Logística Rápida y Confiable
              </h3>
              <p className="text-base mb-6" style={{ color: '#5B5F66' }}>
                Despacho prioritario 24–72 h a obra o faena*. Seguimiento y coordinación directa con tu equipo.
              </p>
              <a
                href="/contact#logistica"
                className="inline-flex items-center text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded"
                aria-label="Tiempos y cobertura"
                data-testid="link-logistics-info"
                onClick={(e) => e.stopPropagation()}
              >
                Tiempos y cobertura →
              </a>
            </div>

            {/* Benefit 3: Crédito para tu Empresa */}
            <div
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-gray-300 cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
              data-analytics="benefit-credito"
              data-testid="card-benefit-credito"
              onClick={(e) => {
                if (!(e.target as Element)?.closest('a')) {
                  window.location.href = '/contact#credito';
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !(e.target as Element)?.closest('a')) {
                  e.preventDefault();
                  window.location.href = '/contact#credito';
                }
              }}
            >
              <div className="flex items-center justify-center w-8 h-8 mb-6">
                <CreditCard className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Crédito para tu Empresa
              </h3>
              <p className="text-base mb-6" style={{ color: '#5B5F66' }}>
                Flexibilidad financiera para tus compras recurrentes. Boleta o factura y opciones de crédito (sujeto a evaluación).
              </p>
              <a
                href="/contact#credito"
                className="inline-flex items-center text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded"
                aria-label="Solicitar evaluación de crédito"
                data-testid="link-credit-evaluation"
                onClick={(e) => e.stopPropagation()}
              >
                Solicitar evaluación de crédito →
              </a>
            </div>
          </div>
          
          {/* Footnote */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              *Plazos referenciales; sujetos a stock y región.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nuestras Especialidades</h2>
            <p className="text-xl text-muted-foreground">Soluciones integrales para todas las industrias</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="group category-card overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
                data-testid={`card-category-${category.id}`}
              >
                <div className="relative">
                  <img 
                    src={category.imageUrl} 
                    alt={category.name} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <Button 
                      className="sumerica-yellow px-6 py-3 font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      aria-label={`${category.buttonText} - ${category.name}`}
                      data-testid={`button-view-products-${category.id}`}
                    >
                      {category.buttonText}
                    </Button>
                  </div>
                  
                  {/* Category Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center text-xl">
                    {category.icon}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-base text-gray-600 mb-4 leading-relaxed" style={{ fontSize: '16px' }}>
                    {category.description}
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full border border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-medium"
                    aria-label={`${category.buttonText} - ${category.name}`}
                    data-testid={`button-secondary-${category.id}`}
                  >
                    {category.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button 
                className="sumerica-yellow px-8 py-3 text-lg font-bold shadow-lg hover:shadow-xl transition-all" 
                data-testid="button-view-all-categories"
                aria-label="Ver todas las categorías de productos"
              >
                Ver Todas las Categorías
              </Button>
            </Link>
          </div>
          
          {/* Sticky CTA for Mobile */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-40 md:hidden">
            <Link href="/catalog">
              <Button 
                className="sumerica-yellow w-full py-3 text-lg font-bold" 
                data-testid="button-view-all-categories-mobile"
                aria-label="Ver todas las categorías de productos"
              >
                Ver Todas las Categorías
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust and Social Proof Section */}
      <section className="py-16 bg-muted pb-20 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Soluciones Industriales Certificadas para Minería, Energía y Construcción en Chile
            </h2>
            <p className="text-xl text-gray-600" style={{ fontSize: '18px' }}>
              Más de 100 proyectos entregados con puntualidad y respaldo técnico. Empresas líderes confían en nosotros.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {industries.map((industry) => (
              <div key={industry.name} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                  <industry.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">{industry.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontSize: '16px' }}>
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sumerica-yellow">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">
            ¿Tienes un Requerimiento Complejo o Urgente?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90" style={{ fontSize: '20px' }}>
            Nuestro equipo responde en menos de 24 h hábiles y diseña la mejor solución para tu empresa.
          </p>
          <Link href="/contact">
            <Button 
              className="bg-white text-black px-10 py-4 text-lg font-bold hover:bg-gray-100 hover:shadow-xl transition-all duration-300 shadow-lg"
              data-testid="button-request-quote"
              aria-label="Solicitar cotización personalizada para tu empresa"
            >
              <span className="mr-2">💬</span>
              Solicitar Cotización Personalizada
            </Button>
          </Link>
        </div>
      </section>

      {/* Partners and Certifications Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Empresas que confían en SUMERICA
            </h3>
            <p className="text-gray-600" style={{ fontSize: '16px' }}>
              Respaldados por certificaciones y alianzas estratégicas
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {/* Placeholder logos - these would be replaced with actual partner/certification logos */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-16">
              <span className="text-gray-400 font-medium text-sm">ISO 9001</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-16">
              <span className="text-gray-400 font-medium text-sm">CODELCO</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-16">
              <span className="text-gray-400 font-medium text-sm">ENGIE</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-16">
              <span className="text-gray-400 font-medium text-sm">ENEL</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-16">
              <span className="text-gray-400 font-medium text-sm">SACYR</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-16">
              <span className="text-gray-400 font-medium text-sm">COPEC</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
