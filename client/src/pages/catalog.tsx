import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import ProductCard from "@/components/product-card";
import { Product } from "@shared/schema";

const categories = [
  "Climatización",
  "Telecomunicaciones", 
  "EPP y Seguridad",
  "Ferretería Industrial",
  "Construcción"
];

const brands = [
  "Carrier",
  "Cisco",
  "3M",
  "Bosch",
  "Trane",
  "Motorola"
];

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Filter products based on search and filters using useMemo
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.code?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      );
    }

    return filtered;
  }, [products, searchQuery, selectedCategories, selectedBrands]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Cargando productos...</div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Catálogo de Productos</h1>
          <p className="text-xl text-muted-foreground">Encuentra exactamente lo que necesitas para tu proyecto</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Input
              type="text"
              placeholder="Encuentra tu producto por nombre, marca o código"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 pr-12 text-lg"
              data-testid="input-search-products"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filtros</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categoría</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                          data-testid={`checkbox-category-${category}`}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Marca</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                          data-testid={`checkbox-brand-${brand}`}
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
          
          {/* Products Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No se encontraron productos que coincidan con tu búsqueda.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
