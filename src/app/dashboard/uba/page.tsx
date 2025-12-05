'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Book, Calendar, Building, School } from 'lucide-react';

// Placeholder data for University of Bamenda structure
const ubaData = [
  {
    school: 'Faculty of Health Sciences',
    icon: <Building className="w-5 h-5 text-primary" />,
    departments: [
      {
        name: 'Nursing',
        documents: [
          { id: 'uba-fhs-nur-1', title: 'Anatomy & Physiology I', year: '2023', code: 'NUR 201' },
          { id: 'uba-fhs-nur-2', title: 'Pharmacology', year: '2022', code: 'NUR 305' },
        ],
      },
      {
        name: 'Medical Laboratory Sciences',
        documents: [
          { id: 'uba-fhs-mls-1', title: 'Clinical Chemistry', year: '2023', code: 'MLS 301' },
          { id: 'uba-fhs-mls-2', title: 'Hematology I', year: '2022', code: 'MLS 211' },
        ],
      },
    ],
  },
  {
    school: 'Faculty of Science',
    icon: <School className="w-5 h-5 text-primary" />,
    departments: [
      {
        name: 'Computer Science',
        documents: [
          { id: 'uba-fs-csc-1', title: 'Data Structures & Algorithms', year: '2023', code: 'CSC 201' },
          { id: 'uba-fs-csc-2', title: 'Operating Systems', year: '2022', code: 'CSC 303' },
        ],
      },
      {
        name: 'Mathematics',
        documents: [
          { id: 'uba-fs-mat-1', title: 'Linear Algebra II', year: '2023', code: 'MAT 302' },
        ],
      },
    ],
  },
   {
    school: 'Higher Technical Teacher Training College (HTTTC)',
    icon: <Building className="w-5 h-5 text-primary" />,
    departments: [
      {
        name: 'Civil Engineering',
        documents: [
          { id: 'uba-htc-civ-1', title: 'Strength of Materials', year: '2023', code: 'CEE 203' },
          { id: 'uba-htc-civ-2', title: 'Structural Analysis', year: '2022', code: 'CEE 301' },
        ],
      },
      {
        name: 'Electrical Engineering',
        documents: [
          { id: 'uba-htc-eee-1', title: 'Circuit Theory II', year: '2023', code: 'EEE 201' },
        ],
      },
    ],
  },
];

export default function UbaPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold tracking-tight">University of Bamenda</h1>
        <p className="text-muted-foreground">
          Browse past questions by faculty and department.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faculties & Departments</CardTitle>
          <CardDescription>
            Expand a faculty to see its departments and available documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full space-y-2">
            {ubaData.map((faculty) => (
              <AccordionItem key={faculty.school} value={faculty.school} className="border rounded-md bg-background/50">
                <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    {faculty.icon}
                    {faculty.school}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                  <Accordion type="multiple" className="space-y-2">
                    {faculty.departments.map((dept) => (
                      <AccordionItem key={dept.name} value={dept.name} className="border rounded-md px-4">
                        <AccordionTrigger className="hover:no-underline">{dept.name}</AccordionTrigger>
                        <AccordionContent className="pt-2">
                            {dept.documents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {dept.documents.map(doc => (
                                        <div key={doc.id} className="p-4 border rounded-lg flex justify-between items-center">
                                            <div className="space-y-1">
                                                <p className="font-semibold">{doc.title}</p>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1"><Book /> {doc.code}</span>
                                                    <span className="flex items-center gap-1"><Calendar /> {doc.year}</span>
                                                </div>
                                            </div>
                                            <Button disabled> 
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No documents available for this department yet.</p>
                            )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
