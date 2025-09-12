import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  HardHat, 
  Building, 
  Zap, 
  Factory, 
  Fuel,
  Waves,
  CheckCircle,
  Phone,
  Users,
  TrendingUp,
  Award
} from "lucide-react";

const industries = [
  {
    id: "mineria",
    name: "Minería",
    description: "Soluciones especializadas para faenas mineras: climatización para túneles, telecomunicaciones en terreno y EPP certificado para condiciones extremas.",
    icon: HardHat,
    challenges: [
      "Ambientes extremos y polvorientos",
      "Comunicación en túneles profundos", 
      "Equipos resistentes a vibraciones",
      "Cumplimiento normativo estricto"
    ],
    solutions: [
      "Sistemas HVAC anti-explosión",
      "Redes de telecomunicaciones robustas",
      "EPP certificado para minería",
      "Mantención en terreno"
    ],
    stats: {
      projects: "50+",
      experience: "8 años",
      companies: "15+"
    },
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    clientLogos: ["CODELCO", "Anglo American", "Antofagasta Minerals"]
  },
  {
    id: "construccion",
    name: "Construcción",
    description: "Equipamiento y herramientas para obras de gran escala: desde ferretería especializada hasta sistemas de climatización para edificios corporativos.",
    icon: Building,
    challenges: [
      "Plazos de entrega ajustados",
      "Coordinación en obra",
      "Equipos de alta durabilidad",
      "Logística en altura"
    ],
    solutions: [
      "Ferretería industrial completa",
      "Sistemas HVAC para edificios",
      "Herramientas profesionales",
      "Logística especializada"
    ],
    stats: {
      projects: "75+",
      experience: "10 años",
      companies: "25+"
    },
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    clientLogos: ["SACYR", "BESALCO", "Grupo Pais"]
  },
  {
    id: "energia",
    name: "Energía",
    description: "Tecnología avanzada para plantas energéticas: climatización de precisión, telecomunicaciones críticas y mantención especializada.",
    icon: Zap,
    challenges: [
      "Operación continua 24/7",
      "Precisión en climatización",
      "Comunicaciones críticas",
      "Seguridad extrema"
    ],
    solutions: [
      "Climatización de precisión",
      "Sistemas de comunicación redundantes",
      "Equipos anti-explosión",
      "Mantención predictiva"
    ],
    stats: {
      projects: "30+",
      experience: "6 años", 
      companies: "10+"
    },
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    clientLogos: ["ENEL", "ENGIE", "AES Andes"]
  },
  {
    id: "petroleo-gas",
    name: "Petróleo y Gas",
    description: "Soluciones técnicas para refinería y distribución: equipos certificados anti-explosión y sistemas de comunicación en zonas peligrosas.",
    icon: Fuel,
    challenges: [
      "Ambientes explosivos",
      "Certificaciones ATEX",
      "Operaciones críticas",
      "Mantenimiento complejo"
    ],
    solutions: [
      "Equipos certificados ATEX",
      "Comunicaciones intrínsecamente seguras",
      "Mantención especializada",
      "EPP para zonas peligrosas"
    ],
    stats: {
      projects: "20+",
      experience: "5 años",
      companies: "8+"
    },
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    clientLogos: ["COPEC", "Shell", "Petrobras"]
  },
  {
    id: "agua-saneamiento",
    name: "Agua y Saneamiento",
    description: "Tecnología para plantas de tratamiento: sistemas de automatización, control ambiental y equipos resistentes a la corrosión.",
    icon: Waves,
    challenges: [
      "Ambientes corrosivos",
      "Automatización compleja",
      "Monitoreo continuo",
      "Cumplimiento ambiental"
    ],
    solutions: [
      "Equipos resistentes a corrosión",
      "Sistemas de automatización",
      "Monitoreo ambiental",
      "Telecomunicaciones robustas"
    ],
    stats: {
      projects: "25+",
      experience: "4 años",
      companies: "12+"
    },
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9d42e27e6c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    clientLogos: ["Aguas Andinas", "ESVAL", "Nuevosur"]
  },
  {
    id: "industrial-general",
    name: "Industrial General",
    description: "Soluciones versátiles para manufactura y procesos: desde climatización estándar hasta telecomunicaciones industriales básicas.",
    icon: Factory,
    challenges: [
      "Diversidad de procesos",
      "Optimización de costos",
      "Flexibilidad operacional",
      "Mantenimiento eficiente"
    ],
    solutions: [
      "Climatización industrial estándar",
      "Telecomunicaciones básicas",
      "Ferretería general",
      "Soporte técnico integral"
    ],
    stats: {
      projects: "100+",
      experience: "10 años",
      companies: "40+"
    },
    imageUrl: "https://images.unsplash.com/photo-1565789444216-1e1d75a0bc7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    clientLogos: ["CCU", "Nestlé", "Carozzi"]
  }
];

const industryFeatures = [
  {
    icon: Award,
    title: "Especialización Técnica",
    description: "Equipos con experiencia específica en cada sector industrial"
  },
  {
    icon: Users,
    title: "Equipos Dedicados",
    description: "Profesionales especializados por industria y aplicación"
  },
  {
    icon: TrendingUp,
    title: "Mejora Continua",
    description: "Optimización constante basada en experiencia de campo"
  }
];

export default function Industries() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sectores <span className="text-primary">Industriales</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8" style={{ fontSize: '20px' }}>
            Experiencia especializada en los principales sectores de la economía chilena. 
            Soluciones técnicas diseñadas para cada industria específica.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-primary/20 text-primary text-sm px-4 py-2">
              200+ Proyectos Completados
            </Badge>
            <Badge variant="secondary" className="bg-primary/20 text-primary text-sm px-4 py-2">
              6 Sectores Especializados
            </Badge>
            <Badge variant="secondary" className="bg-primary/20 text-primary text-sm px-4 py-2">
              110+ Empresas Atendidas
            </Badge>
          </div>
        </div>
      </section>

      {/* Industry Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industryFeatures.map((feature, index) => (
              <div
                key={index}
                className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                data-testid={`feature-${index}`}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600" style={{ fontSize: '16px' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Sectores que Atendemos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Especialización profunda en cada industria para entregar soluciones técnicas precisas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                className="group bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                data-testid={`card-industry-${industry.id}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={industry.imageUrl}
                    alt={industry.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <industry.icon className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{industry.name}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(industry.stats).map(([key, value]) => (
                        <Badge key={key} variant="secondary" className="bg-white/20 text-white text-xs">
                          {value} {key === 'projects' ? 'proyectos' : key === 'experience' ? 'experiencia' : 'empresas'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontSize: '16px' }}>
                    {industry.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Desafíos Técnicos:</h4>
                      <ul className="space-y-2">
                        {industry.challenges.map((challenge, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-red-400 rounded-full mr-2 mt-2 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Nuestras Soluciones:</h4>
                      <ul className="space-y-2">
                        {industry.solutions.map((solution, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Empresas que confían en nosotros:</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.clientLogos.map((client, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {client}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-black font-semibold py-3 transition-all duration-300"
                      aria-label={`Consultar por soluciones para ${industry.name}`}
                      data-testid={`button-consult-${industry.id}`}
                    >
                      Consultar por {industry.name}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sumerica-yellow">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">
            ¿Tu Industria Requiere una Solución Específica?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90" style={{ fontSize: '20px' }}>
            Cuéntanos sobre tu sector y diseñaremos la solución técnica perfecta
          </p>
          <Link href="/contact">
            <Button className="bg-white text-black px-10 py-4 text-lg font-bold hover:bg-gray-100 hover:shadow-xl transition-all duration-300">
              <Phone className="mr-2 h-5 w-5" />
              Conversar con Especialista
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}