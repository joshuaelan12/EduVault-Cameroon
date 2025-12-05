'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Book, Calendar, Building, School } from 'lucide-react';

// Placeholder data for University of Buea structure
const ubData = [
  {
    school: 'Faculty of Engineering and Technology',
    icon: <Building className="w-5 h-5 text-primary" />,
    departments: [
      {
        name: 'Computer Engineering',
        documents: [
          { id: 'ub-fet-cen-1', title: 'Advanced Algorithms', year: '2023', code: 'CEN 401' },
          { id: 'ub-fet-cen-2', title: 'Network Security', year: '2022', code: 'CEN 315' },
        ],
      },
      {
        name: 'Electrical and Electronic Engineering',
        documents: [
          { id: 'ub-fet-eee-1', title: 'Control Systems', year: '2023', code: 'EEE 301' },
          { id: 'ub-fet-eee-2', title: 'Digital Signal Processing', year: '2022', code: 'EEE 411' },
        ],
      },
    ],
  },
  {
    school: 'Faculty of Science',
    icon: <School className="w-5 h-5 text-primary" />,
    departments: [
      {
        name: 'Geology',
        documents: [
          { id: 'ub-fs-geo-1', title: 'Petrology', year: '2023', code: 'GLY 201' },
          { id: 'ub-fs-geo-2', title: 'Structural Geology', year: '2022', code: 'GLY 303' },
        ],
      },
      {
        name: 'Environmental Science',
        documents: [
          { id: 'ub-fs-env-1', title: 'Environmental Impact Assessment', year: '2023', code: 'ENV 302' },
        ],
      },
    ],
  },
];

export default function UbPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold tracking-tight">University of Buea</h1>
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
            {ubData.map((faculty) => (
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
