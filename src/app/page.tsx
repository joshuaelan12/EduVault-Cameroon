import Contact from "@/components/landing/Contact";
import ExamCategories from "@/components/landing/ExamCategories";
import Faq from "@/components/landing/Faq";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";

export default function Home() {
  return (
    <>
      <Hero />
      <ExamCategories />
      <Pricing />
      <Faq />
      <Contact />
    </>
  );
}
