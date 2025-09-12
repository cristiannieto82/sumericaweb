import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { useQuoteCart } from "@/hooks/use-quote-cart";
import QuoteModal from "@/components/quote-modal";
import sumericaLogo from "@/assets/logosumerica.png"; // <-- 1. IMPORTA LA IMAGEN

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Catálogo", href: "/catalog" },
  { name: "Servicios", href: "/servicios" },
  { name: "Industrias", href: "/industrias" },
  { name: "Contacto", href: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { items } = useQuoteCart();

  return (
    <>
      <header className="bg-white shadow-sm border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <img
                src={sumericaLogo} // <-- 2. USA LA VARIABLE IMPORTADA
                alt="Sumerica Logo"
                className="h-16 w-auto cursor-pointer"
                data-testid="link-logo"
              />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`font-medium transition-colors hover:text-primary cursor-pointer ${
                      location === item.href
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                    data-testid={`link-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA Button & Quote Counter */}
            <div className="flex items-center space-x-4">
              {items.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="relative"
                  data-testid="button-quote-counter"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  {items.length} productos
                </Button>
              )}

              <Button
                className="sumerica-yellow"
                onClick={() => setIsQuoteModalOpen(true)}
                data-testid="button-quote-now"
              >
                Cotizar Ahora
              </Button>

              {/* Mobile menu button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    data-testid="button-mobile-menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <span
                          className={`block font-medium transition-colors hover:text-primary cursor-pointer ${
                            location === item.href
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                          data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
