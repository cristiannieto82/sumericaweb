import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/56912345678";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      data-testid="button-whatsapp-float"
    >
      <Button
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </a>
  );
}
