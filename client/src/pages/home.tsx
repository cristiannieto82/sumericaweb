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

      {/* Value Proposition Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 sumerica-yellow rounded-full flex items-center justify-center">
                <Snowflake className="text-2xl text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Especialistas en Clima y Telecom</h3>
              <p className="text-muted-foreground">Asesoría experta y precios competitivos para tus proyectos más técnicos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 sumerica-yellow rounded-full flex items-center justify-center">
                <Truck className="text-2xl text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Logística Rápida y Confiable</h3>
              <p className="text-muted-foreground">Entendemos que tu proyecto no puede esperar. Entregamos a tiempo, siempre</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 sumerica-yellow rounded-full flex items-center justify-center">
                <CreditCard className="text-2xl text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Crédito para tu Empresa</h3>
              <p className="text-muted-foreground">Ofrecemos flexibilidad financiera para apoyar el crecimiento de nuestros socios</p>
            </div>
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
