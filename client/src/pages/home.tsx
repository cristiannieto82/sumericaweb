import HeroCarousel from "@/components/hero-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Snowflake, Truck, CreditCard, HardHat, Building, Zap, Factory } from "lucide-react";
import { Link } from "wouter";

const categories = [
  {
    id: "climatizacion",
    name: "Climatización",
    description: "Sistemas HVAC industriales, aires acondicionados, y soluciones de climatización especializadas",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    featured: true,
    colspan: "lg:col-span-2"
  },
  {
    id: "telecomunicaciones",
    name: "Telecomunicaciones",
    description: "Equipos de comunicación, antenas y sistemas de conectividad",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    featured: true,
    colspan: ""
  },
  {
    id: "epp-seguridad",
    name: "EPP y Seguridad",
    description: "Equipos de protección personal y sistemas de seguridad industrial",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    featured: false,
    colspan: ""
  },
  {
    id: "ferreteria",
    name: "Ferretería Industrial",
    description: "Herramientas, tornillería y accesorios para aplicaciones industriales",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    featured: false,
    colspan: ""
  },
  {
    id: "construccion",
    name: "Construcción",
    description: "Materiales de construcción, herramientas y equipos especializados",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    featured: false,
    colspan: ""
  }
];

const industries = [
  { name: "Minería", icon: HardHat },
  { name: "Construcción", icon: Building },
  { name: "Energía", icon: Zap },
  { name: "Industrial", icon: Factory }
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
                if (!e.target.closest('a')) {
                  window.location.href = '/services#climatizacion-telecom';
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
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
                if (!e.target.closest('a')) {
                  window.location.href = '/contact#logistica';
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
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
                if (!e.target.closest('a')) {
                  window.location.href = '/contact#credito';
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
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
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className={`category-card overflow-hidden shadow-lg ${category.featured ? 'featured-category' : ''} ${category.colspan}`}
                data-testid={`card-category-${category.id}`}
              >
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <h3 className={`font-bold mb-2 ${category.featured ? 'text-2xl' : 'text-xl'}`}>
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button 
                    className={category.featured ? "sumerica-yellow" : "border border-border hover:bg-muted"}
                    variant={category.featured ? "default" : "outline"}
                    data-testid={`button-view-products-${category.id}`}
                  >
                    Ver Productos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button className="sumerica-yellow px-8 py-3 text-lg" data-testid="button-view-all-categories">
                Ver Todas las Categorías
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust and Social Proof Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proveemos Soluciones Confiables a la Industria Chilena</h2>
            <p className="text-xl text-muted-foreground">Nuestros clientes confían en nosotros para sus proyectos más importantes</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {industries.map((industry) => (
              <div key={industry.name} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                  <industry.icon className="text-3xl text-gray-600" />
                </div>
                <h4 className="font-semibold">{industry.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sumerica-yellow">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">¿Tienes un Requerimiento Complejo?</h2>
          <p className="text-xl mb-8 text-primary-foreground/80">Nuestro equipo está listo para encontrar la solución perfecta para ti</p>
          <Link href="/contact">
            <Button 
              className="bg-white text-black px-10 py-4 text-lg font-semibold hover:bg-gray-100"
              data-testid="button-request-quote"
            >
              Solicitar Cotización Personalizada
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
