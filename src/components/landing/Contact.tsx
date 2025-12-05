import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            We're here to help with any questions you may have about our services.
          </p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Mail className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">For any support or inquiries.</p>
              <a href="mailto:techknow237@gmail.com" className="text-primary font-medium hover:underline">
                techknow237@gmail.com
              </a>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Phone className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">WhatsApp Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">For quick inquiries & support.</p>
              <a href="https://wa.me/237680312275" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                +237 680 312 275
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
