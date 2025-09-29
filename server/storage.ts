import { type User, type InsertUser, type Product, type InsertProduct, type Quote, type InsertQuote, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsByBrand(brand: string): Promise<Product[]>;
  
  createQuote(quote: InsertQuote): Promise<Quote>;
  getQuotes(): Promise<Quote[]>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private quotes: Map<string, Quote>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.quotes = new Map();
    this.contacts = new Map();
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const newProducts: Partial<Omit<Product, 'id'>>[] = [
      // AIRE ACONDICIONADO SPLIT MURO
      {
        name: "Aire Acondicionado Split Muro Fresh Air 9.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Fresh Air",
        description: "Equipo Split de muro con capacidad de frío de 9000 BTUH y refrigerante R32. Tecnología INVERTER con bomba de calor, alimentación monofásica 220V/50Hz. Opera en calefacción hasta -15°C exterior y refrigeración hasta 60°C exterior. Incluye capacidad de toma de aire exterior y extracción de CO2, filtro combinado HEPA y carbón activado, más luz UVC para eliminación de virus y bacterias.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "GES9E-R32-FA",
        priceCents: Math.round(619.00 * 1.3 * 100), // USD 804.70
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro Fresh Air 12.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Fresh Air",
        description: "Equipo Split de muro con capacidad de frío de 12000 BTUH y refrigerante R32. Tecnología INVERTER con bomba de calor, alimentación monofásica 220V/50Hz. Opera en calefacción hasta -15°C exterior y refrigeración hasta 60°C exterior. Incluye capacidad de toma de aire exterior y extracción de CO2, filtro combinado HEPA y carbón activado, más luz UVC para eliminación de virus y bacterias.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "GES12E-R32-FA",
        priceCents: Math.round(665.00 * 1.3 * 100), // USD 864.50
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro EcoFlow 9.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "ANWO",
        description: "Split Muro Inverter ECOFLOW R32 con diseño renovado y compacto. Clasificación A en eficiencia energética, control remoto renovado y WiFi integrado compatible con App Anwo Home. Incluye 7 velocidades de ventilador, protección anticorrosiva integral del equipo con tratamiento Blue Fin, y función Auto Random Restart para evitar impacto en la red eléctrica.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "GES9ECOFLOW-R32",
        priceCents: Math.round(338.23 * 1.3 * 100), // USD 439.70
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro Infinity 9.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Infinity",
        description: "Mini Split Muro Bomba de Calor 9000 BTUH INVERTER R32. Equipo con clasificación de eficiencia A, alimentación monofásica 220V/50Hz. Incluye kit de cañería de 4 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "INF-9K-R32",
        priceCents: Math.round(359.00 * 1.3 * 100), // USD 466.70
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro EcoFlow 12.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "ANWO",
        description: "Split Muro Inverter ECOFLOW R32 con diseño renovado y compacto. Clasificación A en eficiencia energética, control remoto renovado y WiFi integrado compatible con App Anwo Home. Incluye 7 velocidades de ventilador, protección anticorrosiva integral del equipo con tratamiento Blue Fin, y función Auto Random Restart.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "GES12ECOFLOW-R32",
        priceCents: Math.round(369.77 * 1.3 * 100), // USD 480.70
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro Infinity 12.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Infinity",
        description: "Mini Split Muro Bomba de Calor 12000 BTUH INVERTER R32. Equipo con clasificación de eficiencia A, alimentación monofásica 220V/50Hz. Incluye kit de cañería de 4 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "INF-12K-R32",
        priceCents: Math.round(392.00 * 1.3 * 100), // USD 509.60
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro EcoFlow 18.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "ANWO",
        description: "Split Muro Inverter ECOFLOW R32 con diseño renovado y compacto. Clasificación A en eficiencia energética, control remoto renovado y WiFi integrado compatible con App Anwo Home. Incluye 7 velocidades de ventilador, protección anticorrosiva integral del equipo con tratamiento Blue Fin, y función Auto Random Restart.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "GES18ECOFLOW-R32",
        priceCents: Math.round(528.38 * 1.3 * 100), // USD 686.89
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro Infinity 18.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Infinity",
        description: "Mini Split Muro Bomba de Calor 18000 BTUH INVERTER R32. Equipo con clasificación de eficiencia A, alimentación monofásica 220V/50Hz. Incluye kit de cañería de 4 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "INF-18K-R32",
        priceCents: Math.round(560.00 * 1.3 * 100), // USD 728.00
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro EcoFlow 24.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "ANWO",
        description: "Split Muro Inverter ECOFLOW R32 con diseño renovado y compacto. Clasificación A en eficiencia energética, control remoto renovado y WiFi integrado compatible con App Anwo Home. Incluye 7 velocidades de ventilador, protección anticorrosiva integral del equipo con tratamiento Blue Fin, y función Auto Random Restart.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "GES24ECOFLOW-R32",
        priceCents: Math.round(663.32 * 1.3 * 100), // USD 862.32
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro Infinity 24.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Infinity",
        description: "Mini Split Muro Bomba de Calor 24000 BTUH INVERTER R32. Equipo con clasificación de eficiencia A, alimentación monofásica 220V/50Hz. Incluye kit de cañería de 4 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "INF-24K-R32",
        priceCents: Math.round(703.00 * 1.3 * 100), // USD 913.90
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro 18.000 BTUH ON-OFF R32",
        category: "Climatización",
        brand: "Standard",
        description: "Mini Split Muro Bomba de Calor 18000 BTUH ON-OFF R32. Equipo con clasificación de eficiencia A, alimentación monofásica 220V/50Hz. Incluye kit de cañería de 4 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "STD-18K-ON-OFF-R32",
        priceCents: Math.round(481.00 * 1.3 * 100), // USD 625.30
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro 24.000 BTUH ON-OFF R32",
        category: "Climatización",
        brand: "Standard",
        description: "Mini Split Muro Bomba de Calor 24000 BTUH ON-OFF R32. Equipo con clasificación de eficiencia A, alimentación monofásica 220V/50Hz. Incluye kit de cañería de 4 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "STD-24K-ON-OFF-R32",
        priceCents: Math.round(622.00 * 1.3 * 100), // USD 808.60
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro 9.000 BTUH Inverter R410A New Cool Design",
        category: "Climatización",
        brand: "ANWO",
        description: "Mini Split Muro Bomba de Calor 9000 BTUH R410A Inverter New Cool Design. Equipo con clasificación de eficiencia A, panel gris con diseño elegante y WiFi integrado compatible con Apps Anwo Home. Alimentación monofásica 220V/50Hz. Incluye kit de cañería de 4 metros.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "NCD-9K-R410A",
        priceCents: Math.round(554.00 * 1.3 * 100), // USD 720.20
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro 12.000 BTUH Inverter R410A New Cool Design",
        category: "Climatización",
        brand: "ANWO",
        description: "Mini Split Muro Bomba de Calor 12000 BTUH R410A Inverter New Cool Design. Equipo con clasificación de eficiencia A, panel gris con diseño elegante y WiFi integrado compatible con Apps Anwo Home. Alimentación monofásica 220V/50Hz. Incluye kit de cañería de 4 metros.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "NCD-12K-R410A",
        priceCents: Math.round(590.00 * 1.3 * 100), // USD 767.00
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Muro 18.000 BTUH Inverter R410A New Cool Design",
        category: "Climatización",
        brand: "ANWO",
        description: "Mini Split Muro Bomba de Calor 18000 BTUH R410A Inverter Aphro Virus Protect. Equipo con clasificación de eficiencia A, alimentación monofásica 220V/50Hz, y filtro de iones de plata. Incluye kit de cañería de 4 metros.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "NCD-18K-R410A-VP",
        priceCents: Math.round(841.00 * 1.3 * 100), // USD 1093.30
        currency: "USD",
        pricingModel: "fixed"
      },

      // AIRE ACONDICIONADO SPLIT PISO CIELO
      {
        name: "Aire Acondicionado Split Piso Cielo 12.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Piso Cielo Bomba de Calor 12000 BTUH R32. Alimentación monofásica 220V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "PC-12K-R32",
        priceCents: Math.round(1084.00 * 1.3 * 100), // USD 1409.20
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Piso Cielo 18.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Piso Cielo Bomba de Calor 18000 BTUH R32. Alimentación monofásica 220V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "PC-18K-R32",
        priceCents: Math.round(1106.00 * 1.3 * 100), // USD 1437.80
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Piso Cielo 24.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Piso Cielo Bomba de Calor 24000 BTUH R32. Alimentación monofásica 220V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "PC-24K-R32",
        priceCents: Math.round(1262.00 * 1.3 * 100), // USD 1640.60
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Piso Cielo 36.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Piso Cielo Bomba de Calor 36000 BTUH R32. Alimentación monofásica 220V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "PC-36K-R32",
        priceCents: Math.round(1617.00 * 1.3 * 100), // USD 2102.10
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Piso Cielo 48.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Piso Cielo Bomba de Calor 48000 BTUH R32. Alimentación trifásica 380V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "PC-48K-R32",
        priceCents: Math.round(2111.00 * 1.3 * 100), // USD 2744.30
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Piso Cielo 60.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Piso Cielo Bomba de Calor 60000 BTUH R32. Alimentación trifásica 380V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "PC-60K-R32",
        priceCents: Math.round(2458.00 * 1.3 * 100), // USD 3195.40
        currency: "USD",
        pricingModel: "fixed"
      },

      // AIRE ACONDICIONADO SPLIT DUCTO
      {
        name: "Aire Acondicionado Split Ducto Baja Silueta 12.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Ducto Baja Silueta Bomba de Calor 12000 BTUH R32. Alimentación monofásica 220V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "SD-12K-R32",
        priceCents: Math.round(1030.00 * 1.3 * 100), // USD 1339.00
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Ducto Baja Silueta 18.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Ducto Baja Silueta Bomba de Calor 18000 BTUH R32. Alimentación monofásica 220V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "SD-18K-R32",
        priceCents: Math.round(1062.00 * 1.3 * 100), // USD 1380.60
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Ducto Baja Silueta 24.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Ducto Baja Silueta Bomba de Calor 24000 BTUH R32. Alimentación monofásica 220V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "SD-24K-R32",
        priceCents: Math.round(1237.00 * 1.3 * 100), // USD 1608.10
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Ducto Baja Silueta 36.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Ducto Baja Silueta Bomba de Calor 36000 BTUH R32. Alimentación monofásica 220V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "SD-36K-R32",
        priceCents: Math.round(1633.00 * 1.3 * 100), // USD 2122.90
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Ducto Baja Silueta 48.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Ducto Baja Silueta Bomba de Calor 48000 BTUH R32. Alimentación trifásica 380V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "SD-48K-R32",
        priceCents: Math.round(2133.00 * 1.3 * 100), // USD 2772.90
        currency: "USD",
        pricingModel: "fixed"
      },
      {
        name: "Aire Acondicionado Split Ducto Baja Silueta 60.000 BTUH Inverter R32",
        category: "Climatización",
        brand: "Industrial",
        description: "Split Ducto Baja Silueta Bomba de Calor 60000 BTUH R32. Alimentación trifásica 380V/50Hz. Incluye kit de cañería de 5 metros para instalación completa.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "SD-60K-R32",
        priceCents: Math.round(2331.00 * 1.3 * 100), // USD 3030.30
        currency: "USD",
        pricingModel: "fixed"
      },

      // CÁMARAS DE SEGURIDAD
      {
        name: "Cámara Bullet TC-C32WS 2.8mm",
        category: "Telecomunicaciones",
        brand: "TechCam",
        description: "Cámara tipo bullet de 2MP con tecnología Color Maker, lente fijo de 2.8mm y sensor de 1/2.8\" CMOS. Soporta PoE, cuenta con IR hasta 50 metros, ONVIF y chasis externo de metal y plástico. Pertenece a la familia de cámaras Lite para proyectos SMB o de mayor envergadura.",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "TC-C32WS-2.8"
      },
      {
        name: "Cámara Bullet TC-C34GN 4MP",
        category: "Telecomunicaciones",
        brand: "TechCam",
        description: "Cámara tipo Bullet 4MP, lente fijo de 4mm y sensor 1/2,7\" CMOS. Soporta PoE af, cuenta con IR de hasta 50 metros, ONVIF, chasis de plástico y metal. Incluye detección de movimiento, salida de alarma y captura de disparo. Pertenece a la familia SuperLite.",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "TC-C34GN"
      },
      {
        name: "Cámara Bullet TC-C34GS 4MP Starlight",
        category: "Telecomunicaciones",
        brand: "TechCam",
        description: "Cámara tipo bullet de 4MP con tecnología Starlight, lente fijo de 2.8mm y sensor de 1/2.7\" CMOS. Soporta PoE, cuenta con IR hasta 50 metros, ONVIF y chasis externo de metal y plástico. Pertenece a la familia de cámaras Superlite, enfocada en proyectos SMB.",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "TC-C34GS"
      },
      {
        name: "Cámara PTZ TC-H324S 2MP Zoom 25x",
        category: "Telecomunicaciones",
        brand: "TechCam",
        description: "Cámara PTZ de 2MP con tecnología Starlight, zoom óptico de hasta 25X con longitud focal de 4.8-120mm y sensor de 1/2.8\" CMOS. Soporta PoE, cuenta con IR hasta 150 metros, ONVIF y chasis externo de metal. Pertenece a la familia de cámaras SMD para proyectos SMB o de mayor envergadura.",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "TC-H324S"
      },
      {
        name: "NVR TC-R3104 4 Canales",
        category: "Telecomunicaciones",
        brand: "TechCam",
        description: "NVR de 4 canales que soporta anchos de banda de 60/40Mbps (in/out), soporta PoE+, máxima resolución de cámara de 6MP, 1 puerto SATA con capacidad de hasta 6TB por disco. Salidas simultáneas de video por HDMI y VGA, detección de movimiento y soporta ONVIF. Familia de NVR's de entrada AK para proyectos SMB.",
        imageUrl: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "TC-R3104"
      },
      {
        name: "NVR TC-R3108 8 Canales",
        category: "Telecomunicaciones",
        brand: "TechCam",
        description: "NVR de 8 canales que soporta anchos de banda de 60/40Mbps (in/out), soporta PoE+, máxima resolución de cámara de 6MP, 1 puerto SATA con capacidad de hasta 6TB por disco. Salidas simultáneas de video por HDMI y VGA, detección de movimiento y soporta ONVIF. Familia de NVR's de entrada AK para proyectos SMB.",
        imageUrl: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "TC-R3108"
      },

      // CABLEADO ESTRUCTURADO
      {
        name: "Cable F/UTP Categoría 6A Blindado LSZH 305m",
        category: "Telecomunicaciones",
        brand: "3Z",
        description: "Cable F/UTP Cat 6A de 4 pares con conductor 100% cobre sólido AWG23. Cumple normas ISO/IEC 11801 y ANSI/TIA-568.2-D, ofrece ancho de banda de 500 MHz y soporte para velocidades hasta 10 Gbps. Blindaje reduce interferencias EMI/RFI. Cubierta LSZH retardante de llama, ideal para redes LAN, telecomunicaciones, CCTV y aplicaciones 10G Ethernet.",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "3Z-F/UTP-CAT6A-305M"
      },
      {
        name: "Cable U/UTP Categoría 6 LSZH Blanco 305m",
        category: "Telecomunicaciones",
        brand: "3Z",
        description: "Cable U/UTP Categoría 6 con conductor 100% cobre sólido 24 AWG. Cumple normas ISO/IEC11801 y ANSI/TIA-568.2-D. Cubierta LSZH retardante de llama garantiza transmisión estable y segura para redes LAN y aplicaciones Gigabit Ethernet. Carrete de 305 metros.",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "3Z-U/UTP-CAT6-305M"
      },
      {
        name: "Módulo Jack RJ45 CAT6 Keystone Blanco",
        category: "Telecomunicaciones",
        brand: "3Z",
        description: "Módulos Cat6 RJ-45 UTP con enganche tipo keystone diseñados para alto rendimiento y montaje fácil. Admite aplicaciones de Gigabit Ethernet, cumple y supera normativas ANSI/TIA 568-C.2 e ISO/IEC 11801. Diseño estrecho y compacto con conexión a 180°, permite altas densidades en placas patch de 48 puertos en 1 unidad de Racks.",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "3Z-MOD-CAT6-WHT"
      },
      {
        name: "Patch Cord CAT6 U/UTP 1 Metro Azul",
        category: "Telecomunicaciones",
        brand: "3Z",
        description: "Patch Cord CAT 6 UTP construido con los estándares más altos de calidad, permitiendo exceder el rendimiento indicado por las normativas ANSI/TIA e ISO/IEC para Categoría 6. Fabricación con cable multifilar para mayor flexibilidad y manejo. Incluye bota de seguridad en los conectores para protección en curvaturas.",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "3Z-PC-CAT6-1M-BLU"
      },
      {
        name: "Faceplate 2 Puertos Blanco Keystone",
        category: "Telecomunicaciones",
        brand: "LS Simple",
        description: "Placa de montaje para pared (FacePlate) para módulos RJ45 hembra con enganche tipo Keystone. Construida en plástico de alta resistencia, permite el montaje perfecto de los módulos. Diseño para 2 puertos, color blanco.",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "LS-FP-2P-WHT"
      }
    ];

    newProducts.forEach(product => {
      const id = randomUUID();
      const fullProduct: Product = {
        id,
        name: product.name!,
        category: product.category!,
        brand: product.brand!,
        description: product.description ?? null,
        imageUrl: product.imageUrl ?? null,
        code: product.code ?? null,
        specifications: product.specifications ?? {},
        dimensions: product.dimensions ?? {},
        materials: product.materials ?? null,
        certifications: product.certifications ?? null,
        applications: product.applications ?? null,
        features: product.features ?? null,
        warranty: product.warranty ?? null,
        installationGuide: product.installationGuide ?? null,
        dataSheetUrl: product.dataSheetUrl ?? null,
        model: product.model ?? null,
        series: product.series ?? null,
        availability: product.availability ?? "available",
        priceCents: product.priceCents ?? null,
        currency: product.currency ?? "CLP",
        pricingModel: product.pricingModel ?? "quote",
        minOrderQuantity: product.minOrderQuantity ?? 1
      };
      this.products.set(id, fullProduct);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      description: insertProduct.description ?? null,
      imageUrl: insertProduct.imageUrl ?? null,
      code: insertProduct.code ?? null,
      specifications: insertProduct.specifications ?? {},
      dimensions: insertProduct.dimensions ?? {},
      materials: insertProduct.materials ?? null,
      certifications: insertProduct.certifications ?? null,
      applications: insertProduct.applications ?? null,
      features: insertProduct.features ?? null,
      warranty: insertProduct.warranty ?? null,
      installationGuide: insertProduct.installationGuide ?? null,
      dataSheetUrl: insertProduct.dataSheetUrl ?? null,
      model: insertProduct.model ?? null,
      series: insertProduct.series ?? null,
      availability: insertProduct.availability ?? "available",
      priceCents: insertProduct.priceCents ?? null,
      currency: insertProduct.currency ?? "CLP",
      pricingModel: insertProduct.pricingModel ?? "quote",
      minOrderQuantity: insertProduct.minOrderQuantity ?? 1
    };
    this.products.set(id, product);
    return product;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery) ||
      product.code?.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery)
    );
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product =>
      product.category === category
    );
  }

  async getProductsByBrand(brand: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product =>
      product.brand === brand
    );
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = { 
      ...insertQuote,
      id, 
      status: "pending",
      createdAt: new Date(),
      company: insertQuote.company ?? null,
      customerMessage: insertQuote.customerMessage ?? null
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
