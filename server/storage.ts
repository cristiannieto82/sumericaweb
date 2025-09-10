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
    const sampleProducts: Omit<Product, 'id'>[] = [
      {
        name: "Aire Acondicionado 24000 BTU",
        category: "Climatización",
        brand: "Carrier",
        description: "Sistema de aire acondicionado industrial de 24000 BTU para espacios grandes",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "AC-24K-CAR"
      },
      {
        name: "Router Industrial Cisco",
        category: "Telecomunicaciones",
        brand: "Cisco",
        description: "Router industrial para comunicaciones críticas",
        imageUrl: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "RTR-IND-CIS"
      },
      {
        name: "Casco de Seguridad",
        category: "EPP y Seguridad",
        brand: "3M",
        description: "Casco de protección personal para trabajos industriales",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "CAS-SEG-3M"
      },
      {
        name: "Taladro Industrial",
        category: "Ferretería Industrial",
        brand: "Bosch",
        description: "Taladro de alta potencia para aplicaciones industriales",
        imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "TAL-IND-BOS"
      },
      {
        name: "Sistema HVAC Industrial",
        category: "Climatización",
        brand: "Trane",
        description: "Sistema completo de climatización para instalaciones industriales",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "HVAC-IND-TRA"
      },
      {
        name: "Antena de Telecomunicaciones",
        category: "Telecomunicaciones",
        brand: "Motorola",
        description: "Antena de alta ganancia para comunicaciones móviles",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        code: "ANT-TEL-MOT"
      }
    ];

    sampleProducts.forEach(product => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
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
    const product: Product = { ...insertProduct, id };
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
      createdAt: new Date()
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
