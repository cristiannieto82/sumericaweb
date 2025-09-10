import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Catálogo", href: "/catalog" },
  { name: "Servicios", href: "#servicios" },
  { name: "Industrias", href: "#industrias" },
  { name: "Contacto", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-foreground mb-4">
              <span className="text-primary">SUMERICA</span>
            </div>
            <p className="text-muted-foreground mb-4" style={{ fontSize: '16px' }}>
              SUMERICA es proveedor de confianza en climatización, telecomunicaciones y suministros industriales en Chile. Con más de 10 años de experiencia y alianzas estratégicas, entregamos soluciones rápidas, flexibles y certificadas para empresas líderes.
            </p>
            <div className="mb-4">
              <p className="text-sm font-medium text-muted-foreground">
                <span className="text-primary font-semibold">Horarios de atención:</span> Lunes a Viernes · 9:00–18:00 hrs
              </p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-primary hover:text-yellow-600 transition-colors duration-300" 
                data-testid="link-linkedin"
                aria-label="Visitar perfil de LinkedIn de SUMERICA"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-primary hover:text-yellow-600 transition-colors duration-300" 
                data-testid="link-facebook"
                aria-label="Visitar página de Facebook de SUMERICA"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-primary hover:text-yellow-600 transition-colors duration-300" 
                data-testid="link-instagram"
                aria-label="Visitar perfil de Instagram de SUMERICA"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Explora</h3>
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className="block text-muted-foreground hover:text-primary cursor-pointer" data-testid={`link-footer-${item.name.toLowerCase()}`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>+56 9 1234 5678</p>
              <p>contacto@sumerica.cl</p>
              <p>Av. Providencia 1234<br />Providencia, Santiago</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 SUMERICA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
