import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuoteCart } from "@/hooks/use-quote-cart";
import { apiRequest } from "@/lib/queryClient";
import { insertQuoteSchema } from "@shared/schema";
import { X } from "lucide-react";

const quoteFormSchema = insertQuoteSchema;

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const { toast } = useToast();
  const { items, clearCart } = useQuoteCart();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof quoteFormSchema>>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      products: [],
    },
  });

  const quoteMutation = useMutation({
    mutationFn: (data: z.infer<typeof quoteFormSchema>) => {
      const quoteData = {
        ...data,
        products: items.map(item => item.id)
      };
      return apiRequest("POST", "/api/quotes", quoteData);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      clearCart();
      toast({
        title: "Cotización enviada",
        description: "Hemos recibido tu solicitud. Te contactaremos pronto.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo enviar la cotización. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof quoteFormSchema>) => {
    quoteMutation.mutate(data);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="modal-quote">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Solicitar Cotización
            <Button variant="ghost" size="sm" onClick={handleClose} data-testid="button-close-quote-modal">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">¡Cotización enviada!</h3>
            <p className="text-muted-foreground">Te contactaremos pronto con los detalles.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Selected Products */}
            {items.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Productos seleccionados ({items.length})</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {items.map((item) => (
                    <Card key={item.id} className="p-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.brand}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Quote Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-quote-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} data-testid="input-quote-company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} data-testid="input-quote-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} data-testid="input-quote-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full sumerica-yellow"
                  disabled={quoteMutation.isPending}
                  data-testid="button-submit-quote"
                >
                  {quoteMutation.isPending ? "Enviando..." : "Enviar Solicitud de Cotización"}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
