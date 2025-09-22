import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Download, MessageCircle, Star, CheckCircle, Truck, Shield, Award, Settings, Ruler, ShieldCheck, Wrench, Briefcase, HardHat } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProductDatasheet from '@/components/pdf/ProductDatasheet';
import QuoteRequestModal from '@/components/QuoteRequestModal';
import RelatedProducts from '@/components/RelatedProducts';
import type { Product, Dimensions, Specifications } from "@shared/schema";

export default function ProductPage() {
  const [, params] = useRoute("/product/:id");
  const [location] = useLocation();
  const productId = params?.id;

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['/api/products', productId],
    enabled: !!productId,
  });

  // Update document head for SEO when product loads
  useEffect(() => {
    if (product) {
      // Update title
      document.title = `${product.name} - ${product.brand} | SUMERICA`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${product.description || product.name} - Modelo ${product.model || ''} de ${product.brand}. Especificaciones técnicas, ficha técnica PDF y cotización rápida disponible en SUMERICA.`
        );
      }
      
      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${product.name} - ${product.brand} | SUMERICA`);
      }
      
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', product.description || product.name);
      }
      
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && product.imageUrl) {
        ogImage.setAttribute('content', product.imageUrl);
      }
      
      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://sumerica.cl/product/${productId}`);
    }
  }, [product, productId]);

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
    { 
      icon: Truck, 
      title: 'Entrega Express', 
      description: 'Despacho en 24-48 horas en RM',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      icon: Shield, 
      title: 'Garantía Premium', 
      description: product.warranty || 'Garantía extendida incluida',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      icon: Award, 
      title: 'Certificaciones Internacionales', 
      description: product.certifications?.join(', ') || 'Estándares ISO y CE',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    { 
      icon: CheckCircle, 
      title: 'Instalación Especializada', 
      description: 'Soporte técnico y puesta en marcha',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
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
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden group relative border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-50 opacity-20"></div>
              <img
                src={product.imageUrl || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out relative z-10"
                loading="eager"
                data-testid="img-product-main"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-700 z-20"></div>
            </div>
            
            {/* Product Trust Indicators */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3 text-center shadow-md border border-gray-100">
                <Shield className="w-5 h-5 mx-auto text-green-600 mb-1" />
                <span className="text-xs font-medium text-gray-700">Certificado</span>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-md border border-gray-100">
                <Truck className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                <span className="text-xs font-medium text-gray-700">Envío Rápido</span>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-md border border-gray-100">
                <Star className="w-5 h-5 mx-auto text-yellow-500 mb-1" />
                <span className="text-xs font-medium text-gray-700">Premium</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-white via-yellow-50 to-white p-8 rounded-3xl border border-yellow-100 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-sm px-3 py-1 bg-gray-900 text-white">{product.category}</Badge>
                {product.availability === 'available' && (
                  <Badge variant="default" className="text-sm px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    En Stock
                  </Badge>
                )}
              </div>
              
              <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text" data-testid="text-product-name">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span className="text-xl font-semibold text-gray-800">{product.brand}</span>
                </div>
                {product.code && (
                  <span className="text-sm text-gray-600 bg-white/80 px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                    Código: <span className="font-mono font-bold">{product.code}</span>
                  </span>
                )}
              </div>
              
              {/* Price */}
              <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-lg">
                <div className="text-sm text-gray-600 mb-1">Precio desde</div>
                <span className="text-4xl font-black text-gray-900 tracking-tight" data-testid="text-product-price">
                  {formatPrice(product.priceCents, product.currency || 'CLP')}
                </span>
                <div className="text-sm text-gray-500 mt-1">IVA incluido</div>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuoteRequestModal 
                product={product}
                trigger={
                  <Button className="w-full sumerica-yellow" size="lg" data-testid="button-quote-request">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Solicitar Cotización
                  </Button>
                }
              />
              
              <PDFDownloadLink document={<ProductDatasheet product={product} />} fileName={`${product.name.replace(/[^a-z0-9]/gi, '_')}_ficha_tecnica.pdf`}>
                {({ loading, url, error, blob }) => (
                  <Button variant="outline" className="w-full" size="lg" disabled={loading} data-testid="button-pdf-download">
                    <Download className="w-5 h-5 mr-2" />
                    {loading ? 'Generando...' : 'Descargar Ficha PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Especificaciones Técnicas</h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* General Specifications */}
              {product.specifications && typeof product.specifications === 'object' && (
                <AccordionItem value="general" className="border rounded-lg px-6" data-testid="accordion-general-specs">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <Settings className="w-5 h-5 mr-3 text-primary" />
                      <span className="text-lg font-semibold">Especificaciones Generales</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications as Record<string, any>).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-gray-900">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Dimensions */}
              {product.dimensions && typeof product.dimensions === 'object' && (
                <AccordionItem value="dimensions" className="border rounded-lg px-6" data-testid="accordion-dimensions">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <Ruler className="w-5 h-5 mr-3 text-primary" />
                      <span className="text-lg font-semibold">Dimensiones y Peso</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.dimensions as Record<string, any>).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-gray-900">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Certifications */}
              {product.certifications && product.certifications.length > 0 && (
                <AccordionItem value="certifications" className="border rounded-lg px-6" data-testid="accordion-certifications">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <ShieldCheck className="w-5 h-5 mr-3 text-primary" />
                      <span className="text-lg font-semibold">Certificaciones y Normas</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Installation & Maintenance */}
              <AccordionItem value="installation" className="border rounded-lg px-6" data-testid="accordion-installation">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center">
                    <Wrench className="w-5 h-5 mr-3 text-primary" />
                    <span className="text-lg font-semibold">Instalación y Mantención</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Instalación</h4>
                      <p className="text-gray-700">Instalación especializada disponible. Coordinamos con tu equipo técnico para una implementación sin contratiempos.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Garantía</h4>
                      <p className="text-gray-700">{product.warranty || 'Garantía estándar incluida según especificaciones del fabricante.'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Soporte Técnico</h4>
                      <p className="text-gray-700">Asesoría técnica especializada y soporte post-venta disponible.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Applications */}
              <AccordionItem value="applications" className="border rounded-lg px-6" data-testid="accordion-applications">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-3 text-primary" />
                    <span className="text-lg font-semibold">Aplicaciones Recomendadas</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <HardHat className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold">Minería</h5>
                        <p className="text-sm text-gray-600">Ideal para faenas mineras y aplicaciones industriales exigentes.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold">Industrial</h5>
                        <p className="text-sm text-gray-600">Perfecto para plantas industriales y aplicaciones comerciales.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Product Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
              ¿Por qué elegir SUMERICA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Equipos industriales de <span className="font-semibold text-yellow-600">calidad superior</span> con garantías extendidas y soporte técnico especializado para proyectos exigentes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productBenefits.map((benefit, index) => (
              <Card key={index} className="relative text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden" data-testid={`benefit-card-${index}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-5`}></div>
                <CardHeader className="pb-4 relative z-10">
                  <div className={`w-20 h-20 ${benefit.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-white`}>
                    <benefit.icon className={`w-10 h-10 bg-gradient-to-br ${benefit.color} bg-clip-text text-transparent`} />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 leading-tight">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
}