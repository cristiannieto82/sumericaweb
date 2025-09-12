import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Snowflake, 
  Radio, 
  Shield, 
  Wrench, 
  Building, 
  Clock, 
  CheckCircle, 
  Phone,
  Settings,
  Headphones
} from "lucide-react";

const services = [
  {
    id: "climatizacion",
    title: "Climatización Industrial",
    description: "Diseño, instalación y mantención de sistemas HVAC para faenas mineras, plantas energéticas y complejos industriales.",
    icon: Snowflake,
    features: [
      "Aire acondicionado de precisión",
      "Sistemas de ventilación industrial",
      "Climatización para salas técnicas",
      "Mantención preventiva y correctiva"
    ],
    benefits: "Controla temperatura y humedad en ambientes críticos, mejorando productividad y protegiendo equipos sensibles.",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    deliveryTime: "15-30 días",
    coverage: "Nacional"
  },
  {
    id: "telecomunicaciones",
    title: "Telecomunicaciones Industriales",
    description: "Conectividad robusta para operaciones críticas: redes, radiocomunicación y sistemas de datos en terreno.",
    icon: Radio,
    features: [
      "Cableado estructurado categoría 6/6A",
      "Redes inalámbricas industriales",
      "Antenas y radiocomunicación",
      "Fibra óptica para larga distancia"
    ],
    benefits: "Comunicación confiable en entornos extremos, garantizando operaciones continuas y seguras.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    deliveryTime: "10-20 días",
    coverage: "Nacional"
  },
  {
    id: "seguridad-industrial",
    title: "Seguridad Industrial Integral",
    description: "Protección completa para trabajadores: desde EPP certificado hasta sistemas de control de acceso.",
    icon: Shield,
    features: [
      "EPP certificado (cascos, guantes, calzado)",
      "Equipos de protección colectiva",
      "Señalética de seguridad",
      "Sistemas de detección de gases"
    ],
    benefits: "Cumplimiento normativo y protección máxima del personal en ambientes de alto riesgo.",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    deliveryTime: "5-15 días",
    coverage: "Nacional"
  },
  {
    id: "mantenimiento",
    title: "Mantención Especializada",
    description: "Servicios de mantención preventiva y correctiva para equipos industriales críticos.",
    icon: Settings,
    features: [
      "Mantención de sistemas HVAC",
      "Inspección de equipos de seguridad",
      "Calibración de instrumentos",
      "Soporte técnico especializado"
    ],
    benefits: "Maximiza vida útil de equipos, reduce tiempos de parada y asegura operaciones continuas.",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    deliveryTime: "2-7 días",
    coverage: "Nacional"
  }
];

const serviceProcess = [
  {
    step: 1,
    title: "Evaluación Técnica",
    description: "Nuestros especialistas evalúan tus requerimientos específicos",
    icon: CheckCircle
  },
  {
    step: 2,
    title: "Propuesta Personalizada",
    description: "Diseñamos la solución perfecta para tu operación",
    icon: Settings
  },
  {
    step: 3,
    title: "Implementación",
    description: "Ejecutamos el proyecto con equipos certificados",
    icon: Wrench
  },
  {
    step: 4,
    title: "Soporte Continuo",
    description: "Mantención y soporte técnico especializado",
    icon: Headphones
  }
];

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Servicios Industriales <span className="text-primary">Especializados</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8" style={{ fontSize: '20px' }}>
            Soluciones técnicas integrales para climatización, telecomunicaciones y mantención industrial. 
            Más de 10 años respaldando operaciones críticas en Chile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button className="sumerica-yellow px-8 py-4 text-lg font-bold hover:shadow-xl transition-all">
                <Phone className="mr-2 h-5 w-5" />
                Solicitar Evaluación Técnica
              </Button>
            </Link>
            <div className="flex items-center text-gray-300">
              <Clock className="mr-2 h-5 w-5" />
              <span>Respuesta en 24h hábiles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Nuestros Servicios Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluciones técnicas diseñadas específicamente para las demandas del sector industrial chileno
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                data-testid={`card-service-${service.id}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <service.icon className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {service.deliveryTime}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {service.coverage}
                    </Badge>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontSize: '16px' }}>
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Incluye:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600" style={{ fontSize: '15px' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <strong>Beneficio clave:</strong> {service.benefits}
                    </p>
                  </div>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-black font-semibold py-3 transition-all duration-300"
                      aria-label={`Solicitar cotización para ${service.title}`}
                      data-testid={`button-quote-${service.id}`}
                    >
                      Solicitar Cotización
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Metodología probada que garantiza resultados excepcionales en cada proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceProcess.map((step, index) => (
              <div
                key={step.step}
                className="text-center"
                data-testid={`process-step-${step.step}`}
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <step.icon className="w-8 h-8 text-black" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 text-primary rounded-full flex items-center justify-center border-2 border-primary text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed" style={{ fontSize: '15px' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sumerica-yellow">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">
            ¿Necesitas una Solución Técnica Específica?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90" style={{ fontSize: '20px' }}>
            Nuestro equipo de especialistas diseña la solución perfecta para tu operación
          </p>
          <Link href="/contact">
            <Button className="bg-white text-black px-10 py-4 text-lg font-bold hover:bg-gray-100 hover:shadow-xl transition-all duration-300">
              <Phone className="mr-2 h-5 w-5" />
              Contactar Especialista
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}