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
            <p className="text-muted-foreground mb-4">
              Proveedor líder de soluciones industriales integrales en Chile. Especializados en climatización y telecomunicaciones con más de 10 años de experiencia en el mercado.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary" data-testid="link-linkedin">
                <Linkedin className="text-xl" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" data-testid="link-facebook">
                <Facebook className="text-xl" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" data-testid="link-instagram">
                <Instagram className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navegación</h3>
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
