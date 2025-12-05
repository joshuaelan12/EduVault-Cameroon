'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Book, Calendar, Layers } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const oLevelSubjects = [
  'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 
  'History', 'Geography', 'Economics', 'Computer Science', 'French'
];
const aLevelSubjects = [
  'Pure Mathematics with Mechanics', 'Pure Mathematics with Statistics', 
  'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Economics', 'Computer Science', 'Literature in English'
];
const availableYears = ['2023', '2022', '2021', '2020', '2019', '2018'];

// Placeholder data for documents
const documents = [
  { id: 1, title: 'Mathematics Paper 1', level: 'O-Level', subject: 'Mathematics', year: '2023' },
  { id: 2, title: 'Physics Paper 2', level: 'A-Level', subject: 'Physics', year: '2022' },
  { id: 3, title: 'History Paper 1', level: 'O-Level', subject: 'History', year: '2021' },
  { id: 4, title: 'Chemistry Paper 3', level: 'A-Level', subject: 'Chemistry', year: '2023' },
  { id: 5, title: 'English Language Paper 2', level: 'O-Level', subject: 'English Language', year: '2022' },
];

export default function GcePage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const subjects = selectedLevel === 'O-Level' ? oLevelSubjects : aLevelSubjects;

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value);
    setSelectedSubject(null); // Reset subject when level changes
  };
  
  const filteredDocuments = documents.filter(doc => 
    (!selectedLevel || doc.level === selectedLevel) &&
    (!selectedSubject || doc.subject === selectedSubject) &&
    (!selectedYear || doc.year === selectedYear)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold tracking-tight">GCE Past Questions</h1>
        <p className="text-muted-foreground">
          Filter and find the exact GCE past question papers you need for your studies.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>
            Select a level, subject, and year to narrow down your search.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={handleLevelChange} value={selectedLevel || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select Level (O/A)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="O-Level">O-Level</SelectItem>
                <SelectItem value="A-Level">A-Level</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={setSelectedSubject}
              value={selectedSubject || ''}
              disabled={!selectedLevel}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedYear} value={selectedYear || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Separator />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Documents</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.length > 0 ? (
                filteredDocuments.map(doc => (
                    <Card key={doc.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">{doc.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2"><Layers /> {doc.level}</div>
                            <div className="flex items-center gap-2"><Book /> {doc.subject}</div>
                            <div className="flex items-center gap-2"><Calendar /> {doc.year}</div>
                        </CardContent>
                        <CardContent>
                             <Button className="w-full">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                    <p>No documents match your filter criteria.</p>
                    <p className="text-sm">Try adjusting your search.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
