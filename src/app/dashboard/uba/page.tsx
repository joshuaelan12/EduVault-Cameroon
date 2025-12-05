
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Book, Calendar, Building, School, Briefcase, Landmark, BookCopy, Mic, Cog, Users } from 'lucide-react';

// Updated and comprehensive data for University of Bamenda structure
const ubaData = [
  {
    school: 'College of Technology (COLTECH)',
    icon: <Cog className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Electrical and Electronic Engineering', documents: [] },
        { name: 'Mechanical Engineering', documents: [] },
        { name: 'Civil Engineering', documents: [] },
        { name: 'Computer Engineering', documents: [] },
        { name: 'Renewable Energy Engineering', documents: [] },
        { name: 'Mechatronics Engineering', documents: [] },
        { name: 'Industrial Maintenance Engineering', documents: [] },
    ],
  },
  {
    school: 'Faculty of Science (FOS)',
    icon: <School className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Mathematics', documents: [] },
        { name: 'Physics', documents: [] },
        { name: 'Chemistry', documents: [] },
        { name: 'Computer Science', documents: [] },
        { name: 'Biological Sciences', documents: [] },
        { name: 'Environmental Science', documents: [] },
    ],
  },
  {
    school: 'Faculty of Economics and Management Sciences (FEMS)',
    icon: <Briefcase className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Economics', documents: [] },
        { name: 'Management Sciences', documents: [] },
        { name: 'Accounting', documents: [] },
        { name: 'Banking and Finance', documents: [] },
        { name: 'Marketing', documents: [] },
        { name: 'Human Resource Management', documents: [] },
    ],
  },
  {
    school: 'Faculty of Arts',
    icon: <BookCopy className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'English', documents: [] },
        { name: 'French', documents: [] },
        { name: 'History', documents: [] },
        { name: 'Geography', documents: [] },
        { name: 'Philosophy', documents: [] },
        { name: 'Sociology', documents: [] },
        { name: 'Linguistics', documents: [] },
    ],
  },
  {
    school: 'Faculty of Education',
    icon: <Users className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Curriculum Studies and Teaching', documents: [] },
        { name: 'Educational Psychology', documents: [] },
        { name: 'Measurement and Evaluation', documents: [] },
        { name: 'Educational Administration and Planning', documents: [] },
    ],
  },
  {
    school: 'Faculty of Health Sciences (FHS)',
    icon: <Building className="w-5 h-5 text-primary" />,
    departments: [
      { name: 'Medicine', documents: [] },
      {
        name: 'Nursing',
        documents: [
          { id: 'uba-fhs-nur-1', title: 'Anatomy & Physiology I', year: '2023', code: 'NUR 201' },
          { id: 'uba-fhs-nur-2', title: 'Pharmacology', year: '2022', code: 'NUR 305' },
        ],
      },
      { name: 'Midwifery', documents: [] },
      {
        name: 'Medical Laboratory Sciences',
        documents: [
          { id: 'uba-fhs-mls-1', title: 'Clinical Chemistry', year: '2023', code: 'MLS 301' },
          { id: 'uba-fhs-mls-2', title: 'Hematology I', year: '2022', code: 'MLS 211' },
        ],
      },
      { name: 'Public Health', documents: [] },
      { name: 'Pharmacy', documents: [] },
    ],
  },
   {
    school: 'Faculty of Law and Political Science (FLPS)',
    icon: <Landmark className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Private Law', documents: [] },
        { name: 'Public Law', documents: [] },
        { name: 'Political Science', documents: [] },
    ],
  },
  {
    school: 'Higher Teacher Training College (HTTC / ENS Bamenda)',
    icon: <Building className="w-5 h-5 text-primary" />,
    departments: [
      { name: 'Mathematics Education', documents: [] },
      { name: 'Physics Education', documents: [] },
      { name: 'Chemistry Education', documents: [] },
      { name: 'Biology Education', documents: [] },
      { name: 'English Education', documents: [] },
      { name: 'French Education', documents: [] },
      { name: 'History Education', documents: [] },
      { name: 'Geography Education', documents: [] },
    ],
  },
  {
    school: 'National Higher Polytechnic Institute (NAHPI)',
    icon: <Building className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Civil Engineering Technology', documents: [] },
        { name: 'Electrical Engineering Technology', documents: [] },
        { name: 'Mechanical Engineering Technology', documents: [] },
        { name: 'Information and Communication Technology (ICT)', documents: [] },
        { name: 'Building Technology', documents: [] },
        { name: 'Transport and Logistics Technology', documents: [] },
    ],
  },
  {
    school: 'School of Journalism and Mass Communication (ASMAC)',
    icon: <Mic className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Journalism', documents: [] },
        { name: 'Communication Studies', documents: [] },
        { name: 'Broadcast Journalism', documents: [] },
        { name: 'Digital Media and Communication', documents: [] },
    ],
  },
  {
    school: 'Higher Institute of Commerce and Management (HICM)',
    icon: <Building className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Accounting', documents: [] },
        { name: 'Banking and Finance', documents: [] },
        { name: 'Marketing', documents: [] },
        { name: 'Management', documents: [] },
        { name: 'International Trade', documents: [] },
        { name: 'Entrepreneurship', documents: [] },
    ],
  },
  {
    school: 'School of Transport and Logistics',
    icon: <Building className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Logistics and Supply Chain Management', documents: [] },
    ],
  },
  {
    school: 'School of Tourism and Hospitality Management',
    icon: <Building className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Hotel Management', documents: [] },
        { name: 'Tourism Management', documents: [] },
    ],
  },
  {
    school: 'Institute of Agricultural Research and Development (IARD – affiliated)',
    icon: <Building className="w-5 h-5 text-primary" />,
    departments: [
        { name: 'Crop Production', documents: [] },
        { name: 'Animal Production', documents: [] },
    ],
  },
];

export default function UbaPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold tracking-tight">University of Bamenda</h1>
        <p className="text-muted-foreground">
          Browse past questions by school and department.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schools & Departments</CardTitle>
          <CardDescription>
            Expand a school to see its departments and available documents.
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
