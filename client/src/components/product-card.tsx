import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";
import { useQuoteCart } from "@/hooks/use-quote-cart";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useQuoteCart();
  const { toast } = useToast();

  const handleAddToQuote = () => {
    addItem(product);
    toast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado a tu cotización.`,
    });
  };

  const formatPrice = (priceCents: number | null, currency: string = 'CLP') => {
    if (priceCents === null || priceCents === undefined) return 'Consultar precio';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
    }).format(priceCents / 100);
  };

  return (
    <Card className="group overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300" data-testid={`card-product-${product.id}`}>
      {/* Clickable Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden cursor-pointer">
          <img 
            src={product.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"} 
            alt={product.name} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        {/* Clickable Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold mb-2 hover:text-primary transition-colors cursor-pointer" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
        </Link>
        
        <div className="space-y-1 mb-3">
          <p className="text-sm text-muted-foreground" data-testid={`text-product-brand-${product.id}`}>
            Marca: {product.brand}
          </p>
          {product.code && (
            <p className="text-xs text-muted-foreground" data-testid={`text-product-code-${product.id}`}>
              Código: {product.code}
            </p>
          )}
          
          {/* Price Display */}
          <p className="text-lg font-bold text-gray-900" data-testid={`text-product-price-${product.id}`}>
            {formatPrice(product.priceCents, product.currency || 'CLP')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            asChild
            variant="outline" 
            className="flex-1"
          >
            <Link 
              href={`/product/${product.id}`}
              data-testid={`button-view-product-${product.id}`}
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver Detalles
            </Link>
          </Button>
          <Button 
            className="flex-1 sumerica-yellow"
            onClick={handleAddToQuote}
            data-testid={`button-add-to-quote-${product.id}`}
          >
            Cotizar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
