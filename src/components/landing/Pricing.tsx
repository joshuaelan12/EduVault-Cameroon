import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const features = [
  "Lifetime access to all documents",
  "Unlimited downloads",
  "All exam types and subjects",
  "Regular updates with new papers",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <Card className="w-full max-w-md shadow-xl border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Simple, One-Time Fee</CardTitle>
              <CardDescription className="text-lg text-muted-foreground pt-2">
                Get unlimited access to our entire library. No subscriptions, no hidden costs.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="my-4 text-center">
                <span className="text-5xl font-extrabold">500</span>
                <span className="text-xl font-medium text-muted-foreground"> XAF</span>
              </div>
              <ul className="space-y-3 mt-6 w-full">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link href="/register">Register to Get Access</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
