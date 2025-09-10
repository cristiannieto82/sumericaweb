import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@shared/schema";

interface QuoteCartContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const QuoteCartContext = createContext<QuoteCartContextType | undefined>(undefined);

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    setItems(prev => {
      // Check if product is already in cart
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <QuoteCartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (context === undefined) {
    throw new Error("useQuoteCart must be used within a QuoteCartProvider");
  }
  return context;
}
