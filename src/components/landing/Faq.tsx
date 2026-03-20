
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Cameroon Past Questions?",
    answer: "Cameroon Past Questions is an online platform that provides students with access to a vast library of past examination questions from various Cameroonian examination bodies like the GCE Board, University of Buea, and University of Bamenda.",
  },
  {
    question: "How much does it cost?",
    answer: "Access to our entire library requires a one-time activation fee of 500 XAF. There are no recurring subscriptions or hidden fees. Pay once, and get lifetime access.",
  },
  {
    question: "How do I make the payment?",
    answer: "After registering, you will be prompted to make the payment. You can pay using mobile money (MTN or Orange) and upload a screenshot of your transaction as proof. Our team will then verify your payment and activate your account.",
  },
  {
    question: "How long does account activation take?",
    answer: "Once you upload your payment proof, our admin team will review it. Account activation is typically completed within 24 hours. You will receive an email notification once your account is active.",
  },
  {
    question: "Can I download questions on multiple devices?",
    answer: "Yes, once your account is activated, you can log in and download past questions from any device, including your phone, tablet, or computer.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
