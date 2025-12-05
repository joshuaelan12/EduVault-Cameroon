import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, School } from "lucide-react";

const categories = [
  {
    title: "GCE Board",
    description: "Past questions for O-Level and A-Level examinations.",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
  },
  {
    title: "University of Buea",
    description: "Entrance and course materials for UB students.",
    icon: <School className="w-8 h-8 text-primary" />,
  },
  {
    title: "University of Bamenda",
    description: "Find resources for UBa entrance and degree programs.",
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
  },
];

export default function ExamCategories() {
  return (
    <section id="exams" className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Comprehensive Exam Coverage
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            We gather past questions from major examination bodies across Cameroon.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.title} className="bg-card/50 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  {category.icon}
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
