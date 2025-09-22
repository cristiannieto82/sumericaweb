import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Catalog from "@/pages/catalog";
import Contact from "@/pages/contact";
import Services from "@/pages/services";
import Industries from "@/pages/industries";
import ProductPage from "@/pages/product";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import { QuoteCartProvider } from "@/hooks/use-quote-cart";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/servicios" component={Services} />
          <Route path="/industrias" component={Industries} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <QuoteCartProvider>
          <Toaster />
          <Router />
        </QuoteCartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
