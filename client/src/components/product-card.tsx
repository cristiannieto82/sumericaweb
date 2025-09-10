import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";
import { useQuoteCart } from "@/hooks/use-quote-cart";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow" data-testid={`card-product-${product.id}`}>
      <img 
        src={product.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"} 
        alt={product.name} 
        className="w-full h-48 object-cover" 
      />
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-1" data-testid={`text-product-brand-${product.id}`}>
          Marca: {product.brand}
        </p>
        {product.code && (
          <p className="text-xs text-muted-foreground mb-3" data-testid={`text-product-code-${product.id}`}>
            Código: {product.code}
          </p>
        )}
        <Button 
          className="w-full sumerica-yellow"
          onClick={handleAddToQuote}
          data-testid={`button-add-to-quote-${product.id}`}
        >
          Añadir a Cotización
        </Button>
      </CardContent>
    </Card>
  );
}
