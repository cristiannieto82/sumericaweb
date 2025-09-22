import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageCircle } from "lucide-react";
import QuoteRequestModal from '@/components/QuoteRequestModal';

interface RelatedProductsProps {
  currentProduct: Product;
  maxProducts?: number;
}

export default function RelatedProducts({ currentProduct, maxProducts = 4 }: RelatedProductsProps) {
  const { data: allProducts, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Filter and sort related products
  const relatedProducts = allProducts
    ?.filter(product => product.id !== currentProduct.id) // Exclude current product
    ?.map(product => {
      let relevanceScore = 0;
      
      // Same category = higher relevance
      if (product.category === currentProduct.category) {
        relevanceScore += 10;
      }
      
      // Same brand = moderate relevance
      if (product.brand === currentProduct.brand) {
        relevanceScore += 5;
      }
      
      // Same series = high relevance
      if (product.series && currentProduct.series && product.series === currentProduct.series) {
        relevanceScore += 8;
      }
      
      // Similar price range (within 30%) = small bonus
      if (product.priceCents && currentProduct.priceCents) {
        const priceDiff = Math.abs(product.priceCents - currentProduct.priceCents) / currentProduct.priceCents;
        if (priceDiff <= 0.3) {
          relevanceScore += 2;
        }
      }
      
      return { ...product, relevanceScore };
    })
    ?.sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
    ?.slice(0, maxProducts) || []; // Limit results

  const formatPrice = (priceCents: number | null, currency: string = 'CLP') => {
    if (priceCents === null || priceCents === undefined) return 'Consultar precio';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
    }).format(priceCents / 100);
  };

  if (isLoading) {
    return (
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Productos Relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: maxProducts }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-[4/3] rounded-t-xl"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!relatedProducts.length) {
    return null; // Don't show section if no related products
  }

  return (
    <div className="mb-16" data-testid="section-related-products">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Productos Relacionados</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubre otros productos que podrían interesarte de la misma categoría y marca.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md" data-testid={`card-related-product-${product.id}`}>
            <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded"></div>
                    <p className="text-sm">Imagen no disponible</p>
                  </div>
                </div>
              )}
              
              {/* Overlay badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                {product.category === currentProduct.category && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                    {product.category}
                  </Badge>
                )}
                {product.brand === currentProduct.brand && (
                  <Badge variant="outline" className="bg-white/90 text-gray-700 text-xs">
                    {product.brand}
                  </Badge>
                )}
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm" data-testid={`text-related-product-name-${product.id}`}>
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.brand} {product.model && `- ${product.model}`}
                  </p>
                  {product.code && (
                    <p className="text-xs text-gray-400">Código: {product.code}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-sm" data-testid={`text-related-product-price-${product.id}`}>
                    {formatPrice(product.priceCents, product.currency || 'CLP')}
                  </span>
                  {product.availability === 'available' && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      Disponible
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link href={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs" data-testid={`button-view-related-${product.id}`}>
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                  </Link>
                  <QuoteRequestModal 
                    product={product}
                    trigger={
                      <Button size="sm" className="sumerica-yellow text-xs px-2" data-testid={`button-quote-related-${product.id}`}>
                        <MessageCircle className="w-3 h-3" />
                      </Button>
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show more link if there might be more products */}
      {allProducts && allProducts.length > maxProducts + 1 && (
        <div className="text-center mt-8">
          <Link href="/catalog">
            <Button variant="outline" size="lg" data-testid="button-view-all-products">
              Ver todos los productos
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}