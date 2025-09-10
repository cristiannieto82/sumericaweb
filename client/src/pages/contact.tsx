import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { Phone, Mail, MessageSquare, MapPin } from "lucide-react";

const contactFormSchema = insertContactSchema;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: z.infer<typeof contactFormSchema>) =>
      apiRequest("POST", "/api/contacts", data),
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    contactMutation.mutate(data);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contacta con Nosotros</h1>
          <p className="text-xl text-muted-foreground">Estamos aquí para ayudarte con tu próximo proyecto</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Envíanos un Mensaje</h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="text-green-600 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">¡Mensaje enviado!</h3>
                  <p className="text-muted-foreground">Te contactaremos pronto.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-contact-name" />
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
                            <Input type="email" {...field} data-testid="input-contact-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asunto</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-contact-subject" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje</FormLabel>
                          <FormControl>
                            <Textarea rows={5} {...field} data-testid="textarea-contact-message" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full sumerica-yellow"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {contactMutation.isPending ? "Enviando..." : "Enviar Mensaje"}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Información de Contacto</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-6 text-primary mr-4" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <a href="tel:+56912345678" className="text-primary hover:underline">
                        +56 9 1234 5678
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="w-6 text-primary mr-4" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:contacto@sumerica.cl" className="text-primary hover:underline">
                        contacto@sumerica.cl
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MessageSquare className="w-6 text-primary mr-4" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <a href="https://wa.me/56912345678" className="text-primary hover:underline">
                        +56 9 1234 5678
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-6 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-medium">Dirección Comercial</p>
                      <p className="text-muted-foreground">
                        Av. Providencia 1234, Oficina 567<br />
                        Providencia, Santiago, Chile
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Google Maps Integration */}
            <Card>
              <div className="overflow-hidden rounded-lg">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="text-4xl mb-2 mx-auto" />
                    <p>Mapa de Google Maps</p>
                    <p className="text-sm">Av. Providencia 1234, Providencia</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
