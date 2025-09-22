import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, MessageCircle, Star, CheckCircle, Truck, Shield, Award } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import type { Product } from "@shared/schema";

export default function ProductPage() {
  const [, params] = useRoute("/product/:id");
  const [location] = useLocation();
  const productId = params?.id;

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['/api/products', productId],
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/catalog">
            <Button>Volver al catálogo</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (priceCents: number | null, currency: string = 'CLP') => {
    if (!priceCents) return 'Consultar precio';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
    }).format(priceCents / 100);
  };

  // Product benefits for display
  const productBenefits = [
    { icon: Truck, title: 'Entrega rápida', description: 'Despacho en 24-48 horas' },
    { icon: Shield, title: 'Garantía extendida', description: product.warranty || 'Garantía incluida' },
    { icon: Award, title: 'Certificaciones', description: product.certifications?.join(', ') || 'Estándares internacionales' }
  ];

  return (
    <>
      {/* SEO Head */}
      <title>{product.name} - {product.brand} | SUMERICA</title>
      <meta name="description" content={`${product.description} - Modelo ${product.model || ''} de ${product.brand}. Especificaciones técnicas, ficha técnica PDF y cotización rápida disponible.`} />
      <meta property="og:title" content={`${product.name} - ${product.brand} | SUMERICA`} />
      <meta property="og:description" content={product.description || ''} />
      <meta property="og:image" content={product.imageUrl || ''} />

      <div className="min-h-screen bg-gray-50">
        {/* Navigation Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Inicio</Link>
              <span className="text-gray-400">/</span>
              <Link href="/catalog" className="text-gray-500 hover:text-gray-700">Catálogo</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/catalog">
              <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back-catalog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al catálogo
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden group">
                <img
                  src={product.imageUrl || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  data-testid="img-product-main"
                />
              </div>
              
              {/* Product Gallery could go here */}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                  {product.availability === 'available' && (
                    <Badge variant="default" className="text-xs bg-green-100 text-green-800">En stock</Badge>
                  )}
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="text-product-name">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span><strong>Marca:</strong> {product.brand}</span>
                  {product.model && <span><strong>Modelo:</strong> {product.model}</span>}
                  {product.code && <span><strong>Código:</strong> {product.code}</span>}
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Producto certificado</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Descripción técnica</h2>
                <p className="text-gray-700 leading-relaxed" data-testid="text-product-description">
                  {product.description || 'Producto industrial de alta calidad diseñado para aplicaciones profesionales.'}
                </p>
              </div>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Características principales</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3" data-testid={`feature-${index}`}>
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing */}
              <div className="bg-gray-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Precio</p>
                    <p className="text-3xl font-bold text-gray-900" data-testid="text-product-price">
                      {formatPrice(product.priceCents, product.currency || 'CLP')}
                    </p>
                    {(product.minOrderQuantity || 1) > 1 && (
                      <p className="text-sm text-gray-600">Cantidad mínima: {product.minOrderQuantity}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="sumerica-yellow flex-1" size="lg" data-testid="button-request-quote">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Solicitar Cotización
                  </Button>
                  <Button variant="outline" size="lg" data-testid="button-download-datasheet">
                    <Download className="w-5 h-5 mr-2" />
                    Ficha PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Benefits Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir este producto?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Productos industriales de calidad superior con garantías extendidas y soporte técnico especializado.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {productBenefits.map((benefit, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300" data-testid={`benefit-card-${index}`}>
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}