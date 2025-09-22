import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { insertQuoteSchema } from "@shared/schema";
import type { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Form schema for user input fields only (excluding products array)
const quoteFormSchema = insertQuoteSchema.omit({ products: true }).extend({
  quantity: z.number().int().positive().min(1, "La cantidad debe ser al menos 1"),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface QuoteRequestModalProps {
  product: Product;
  trigger?: React.ReactNode;
}

export default function QuoteRequestModal({ product, trigger }: QuoteRequestModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      customerMessage: "",
      quantity: 1,
    },
  });

  const createQuoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      // Transform form data to match the expected API format
      const quoteData = {
        name: data.name,
        email: data.email,
        company: data.company || undefined,
        phone: data.phone,
        customerMessage: data.customerMessage || undefined,
        products: [{
          productId: product.id,
          quantity: data.quantity,
          notes: `Solicitud para: ${product.name} - ${product.brand} ${product.model || ''}`
        }]
      };
      
      return await apiRequest('/api/quotes', {
        method: 'POST',
        body: quoteData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
      toast({
        title: "Cotización enviada con éxito",
        description: "Hemos recibido tu solicitud de cotización. Te contactaremos pronto con la información solicitada.",
      });
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      console.error('Error creating quote:', error);
      toast({
        title: "Error al enviar cotización",
        description: "Hubo un problema al procesar tu solicitud. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    createQuoteMutation.mutate(data);
  };

  const defaultTrigger = (
    <Button className="sumerica-yellow flex-1" size="lg" data-testid="button-request-quote">
      <MessageCircle className="w-5 h-5 mr-2" />
      Solicitar Cotización
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Solicitar Cotización</DialogTitle>
          <DialogDescription>
            Completa el formulario para recibir una cotización personalizada para <strong>{product.name}</strong>
          </DialogDescription>
        </DialogHeader>

        {/* Product Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
          <div className="flex items-start space-x-4">
            {product.imageUrl && (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{product.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {product.brand} {product.model && `- ${product.model}`}
              </p>
              {product.code && (
                <p className="text-xs text-gray-500">Código: {product.code}</p>
              )}
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" data-testid="input-quote-name" {...field} />
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
                    <FormLabel>Correo electrónico *</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@empresa.com" type="email" data-testid="input-quote-email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de tu empresa" data-testid="input-quote-company" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormDescription>Campo opcional</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono *</FormLabel>
                    <FormControl>
                      <Input placeholder="+56 9 1234 5678" data-testid="input-quote-phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad requerida *</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="number" 
                        min="1"
                        className="w-24"
                        data-testid="input-quote-quantity"
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                      <Label className="text-sm text-gray-600">unidades</Label>
                      {product.minOrderQuantity && product.minOrderQuantity > 1 && (
                        <span className="text-xs text-gray-500">
                          (Mín: {product.minOrderQuantity})
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Requirements */}
            <FormField
              control={form.control}
              name="customerMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requisitos adicionales</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe cualquier requerimiento específico, condiciones de entrega, plazos, etc."
                      className="min-h-[80px]"
                      data-testid="textarea-quote-message"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Campo opcional - ayúdanos a preparar una cotización más precisa
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                data-testid="button-quote-cancel"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="sumerica-yellow"
                disabled={createQuoteMutation.isPending}
                data-testid="button-quote-submit"
              >
                {createQuoteMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Solicitud
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}