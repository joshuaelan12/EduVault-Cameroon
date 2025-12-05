import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-students-studying');

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/80 backdrop-brightness-75"></div>
      <div className="relative z-10 container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Unlock Your Academic Success in Cameroon
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-8">
          Access thousands of past questions from GCE, University of Buea, University of Bamenda, and more.
        </p>
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
          <Link href="/register">Get Started Now</Link>
        </Button>
      </div>
    </section>
  );
}
