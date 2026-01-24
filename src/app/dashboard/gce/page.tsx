
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
import { Download, Book, Calendar, Layers, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const oLevelSubjects = [
  'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 
  'History', 'Geography', 'Economics', 'Computer Science', 'French'
];
const aLevelSubjects = [
  'Chemistry', 'Pure Mathematics with Mechanics', 'Computer Science', 'Information and Communication Technology',
  'Physics', 'Biology', 'Food Science and Nutrition', 'Religious Studies', 'Geography'
];
const availableYears = [
  '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', 
  '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', 
  '2002', '2001', '2000'
];

type Document = {
  id: string;
  title: string;
  level: 'O-Level' | 'A-Level';
  subject: string;
  year: string;
  filePath: string;
  examType: 'GCE';
};

// Hardcoded documents list
const documents: Document[] = [
  {
    id: 'gce-alevel-chem-2024-p1',
    title: 'A-Level Chemistry Paper 1 2024',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2024',
    filePath: '/documents/gce/A-Level/Chemistry/2024/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2020-p1',
    title: 'A-Level Chemistry Paper 1 2020',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2020',
    filePath: '/documents/gce/A-Level/Chemistry/2020/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2019-p1',
    title: 'A-Level Chemistry Paper 1 2019',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2019',
    filePath: '/documents/gce/A-Level/Chemistry/2019/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2018-p1',
    title: 'A-Level Chemistry Paper 1 2018',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2018',
    filePath: '/documents/gce/A-Level/Chemistry/2018/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2015-p1',
    title: 'A-Level Chemistry Paper 1 2015',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2015',
    filePath: '/documents/gce/A-Level/Chemistry/2015/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2013-p1',
    title: 'A-Level Chemistry Paper 1 2013',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2013',
    filePath: '/documents/gce/A-Level/Chemistry/2013/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2024-p2',
    title: 'A-Level Chemistry Paper 2 2024',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2024',
    filePath: '/documents/gce/A-Level/Chemistry/2024/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2020-p2',
    title: 'A-Level Chemistry Paper 2 2020',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2020',
    filePath: '/documents/gce/A-Level/Chemistry/2020/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2019-p2',
    title: 'A-Level Chemistry Paper 2 2019',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2019',
    filePath: '/documents/gce/A-Level/Chemistry/2019/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2018-p2',
    title: 'A-Level Chemistry Paper 2 2018',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2018',
    filePath: '/documents/gce/A-Level/Chemistry/2018/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2013-p2',
    title: 'A-Level Chemistry Paper 2 2013',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2013',
    filePath: '/documents/gce/A-Level/Chemistry/2013/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2012-p2',
    title: 'A-Level Chemistry Paper 2 2012',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2012',
    filePath: '/documents/gce/A-Level/Chemistry/2012/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2010-p2',
    title: 'A-Level Chemistry Paper 2 2010',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2010',
    filePath: '/documents/gce/A-Level/Chemistry/2010/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2009-p2',
    title: 'A-Level Chemistry Paper 2 2009',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2009',
    filePath: '/documents/gce/A-Level/Chemistry/2009/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-chem-2007-p3',
    title: 'A-Level Chemistry Paper 3 2007',
    level: 'A-Level',
    subject: 'Chemistry',
    year: '2007',
    filePath: '/documents/gce/A-Level/Chemistry/2007/paper3.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-pmm-2020-p1',
    title: 'A-Level Pure Maths With Mechanics Paper 1 2020',
    level: 'A-Level',
    subject: 'Pure Mathematics with Mechanics',
    year: '2020',
    filePath: '/documents/gce/A-Level/Pure Mathematics with Mechanics/2020/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-pmm-2024-p1',
    title: 'A-Level Pure Maths With Mechanics Paper 1 2024',
    level: 'A-Level',
    subject: 'Pure Mathematics with Mechanics',
    year: '2024',
    filePath: '/documents/gce/A-Level/Pure Mathematics with Mechanics/2024/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-pmm-2016-p2',
    title: 'A-Level Pure Maths With Mechanics Paper 2 2016',
    level: 'A-Level',
    subject: 'Pure Mathematics with Mechanics',
    year: '2016',
    filePath: '/documents/gce/A-Level/Pure Mathematics with Mechanics/2016/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-pmm-2019-p2',
    title: 'A-Level Pure Maths With Mechanics Paper 2 2019',
    level: 'A-Level',
    subject: 'Pure Mathematics with Mechanics',
    year: '2019',
    filePath: '/documents/gce/A-Level/Pure Mathematics with Mechanics/2019/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-pmm-2024-p2',
    title: 'A-Level Pure Maths With Mechanics Paper 2 2024',
    level: 'A-Level',
    subject: 'Pure Mathematics with Mechanics',
    year: '2024',
    filePath: '/documents/gce/A-Level/Pure Mathematics with Mechanics/2024/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-pmm-2016-p3',
    title: 'A-Level Pure Maths With Mechanics Paper 3 2016',
    level: 'A-Level',
    subject: 'Pure Mathematics with Mechanics',
    year: '2016',
    filePath: '/documents/gce/A-Level/Pure Mathematics with Mechanics/2016/paper3.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-pmm-2019-p3',
    title: 'A-Level Pure Maths With Mechanics Paper 3 2019',
    level: 'A-Level',
    subject: 'Pure Mathematics with Mechanics',
    year: '2019',
    filePath: '/documents/gce/A-Level/Pure Mathematics with Mechanics/2019/paper3.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-pmm-2020-p3',
    title: 'A-Level Pure Maths With Mechanics Paper 3 2020',
    level: 'A-Level',
    subject: 'Pure Mathematics with Mechanics',
    year: '2020',
    filePath: '/documents/gce/A-Level/Pure Mathematics with Mechanics/2020/paper3.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-pmm-2024-p3',
    title: 'A-Level Pure Maths With Mechanics Paper 3 2024',
    level: 'A-Level',
    subject: 'Pure Mathematics with Mechanics',
    year: '2024',
    filePath: '/documents/gce/A-Level/Pure Mathematics with Mechanics/2024/paper3.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-cs-2020-p1',
    title: 'A-Level Computer Science Paper 1 2020',
    level: 'A-Level',
    subject: 'Computer Science',
    year: '2020',
    filePath: '/documents/gce/A-Level/Computer Science/2020/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-cs-2018-p2',
    title: 'A-Level Computer Science Paper 2 2018',
    level: 'A-Level',
    subject: 'Computer Science',
    year: '2018',
    filePath: '/documents/gce/A-Level/Computer Science/2018/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-cs-2020-p2',
    title: 'A-Level Computer Science Paper 2 2020',
    level: 'A-Level',
    subject: 'Computer Science',
    year: '2020',
    filePath: '/documents/gce/A-Level/Computer Science/2020/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-cs-2024-p2',
    title: 'A-Level Computer Science Paper 2 2024',
    level: 'A-Level',
    subject: 'Computer Science',
    year: '2024',
    filePath: '/documents/gce/A-Level/Computer Science/2024/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-ict-2019-p1',
    title: 'A-Level Information and Communication Technology Paper 1 2019',
    level: 'A-Level',
    subject: 'Information and Communication Technology',
    year: '2019',
    filePath: '/documents/gce/A-Level/Information and Communication Technology/2019/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-ict-2020-p1',
    title: 'A-Level Information and Communication Technology Paper 1 2020',
    level: 'A-Level',
    subject: 'Information and Communication Technology',
    year: '2020',
    filePath: '/documents/gce/A-Level/Information and Communication Technology/2020/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-ict-2024-p1',
    title: 'A-Level Information and Communication Technology Paper 1 2024',
    level: 'A-Level',
    subject: 'Information and Communication Technology',
    year: '2024',
    filePath: '/documents/gce/A-Level/Information and Communication Technology/2024/paper1.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-ict-2015-p2',
    title: 'A-Level Information and Communication Technology Paper 2 2015',
    level: 'A-Level',
    subject: 'Information and Communication Technology',
    year: '2015',
    filePath: '/documents/gce/A-Level/Information and Communication Technology/2015/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-ict-2016-p2',
    title: 'A-Level Information and Communication Technology Paper 2 2016',
    level: 'A-Level',
    subject: 'Information and Communication Technology',
    year: '2016',
    filePath: '/documents/gce/A-Level/Information and Communication Technology/2016/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-ict-2019-p2',
    title: 'A-Level Information and Communication Technology Paper 2 2019',
    level: 'A-Level',
    subject: 'Information and Communication Technology',
    year: '2019',
    filePath: '/documents/gce/A-Level/Information and Communication Technology/2019/paper2.pdf',
    examType: 'GCE',
  },
  {
    id: 'gce-alevel-ict-2024-p2',
    title: 'A-Level Information and Communication Technology Paper 2 2024',
    level: 'A-Level',
    subject: 'Information and Communication Technology',
    year: '2024',
    filePath: '/documents/gce/A-Level/Information and Communication Technology/2024/paper2.pdf',
    examType: 'GCE',
  },
  // Physics
  ...Array.from({ length: 16 }, (_, i) => 2001 + i).map(year => ({
    id: `gce-alevel-phy-${year}-p2`,
    title: `A-Level Physics Paper 2 ${year}`,
    level: 'A-Level' as const,
    subject: 'Physics',
    year: `${year}`,
    filePath: `/documents/gce/A-Level/Physics/${year}/paper2.pdf`,
    examType: 'GCE' as const,
  })),
  { id: 'gce-alevel-phy-2019-p2', title: 'A-Level Physics Paper 2 2019', level: 'A-Level', subject: 'Physics', year: '2019', filePath: '/documents/gce/A-Level/Physics/2019/paper2.pdf', examType: 'GCE' },
  // Biology
  { id: 'gce-alevel-bio-2020-p1', title: 'A-Level Biology Paper 1 2020', level: 'A-Level', subject: 'Biology', year: '2020', filePath: '/documents/gce/A-Level/Biology/2020/paper1.pdf', examType: 'GCE' },
  ...[2000, 2001, 2003, 2004, 2005, 2019, 2024].map(year => ({
    id: `gce-alevel-bio-${year}-p2`,
    title: `A-Level Biology Paper 2 ${year}`,
    level: 'A-Level' as const,
    subject: 'Biology',
    year: `${year}`,
    filePath: `/documents/gce/A-Level/Biology/${year}/paper2.pdf`,
    examType: 'GCE' as const,
  })),
  { id: 'gce-alevel-bio-2016-p3', title: 'A-Level Biology Paper 3 2016', level: 'A-Level', subject: 'Biology', year: '2016', filePath: '/documents/gce/A-Level/Biology/2016/paper3.pdf', examType: 'GCE' },
  // Food Science and Nutrition
  { id: 'gce-alevel-fsn-2024-p1', title: 'A-Level Food Science and Nutrition Paper 1 2024', level: 'A-Level', subject: 'Food Science and Nutrition', year: '2024', filePath: '/documents/gce/A-Level/Food Science and Nutrition/2024/paper1.pdf', examType: 'GCE' },
  // Religious Studies
  ...[2019, 2020].map(year => ({
    id: `gce-alevel-rs-${year}-p1`,
    title: `A-Level Religious Studies Paper 1 ${year}`,
    level: 'A-Level' as const,
    subject: 'Religious Studies',
    year: `${year}`,
    filePath: `/documents/gce/A-Level/Religious Studies/${year}/paper1.pdf`,
    examType: 'GCE' as const,
  })),
  ...[2018, 2019].map(year => ({
    id: `gce-alevel-rs-${year}-p2`,
    title: `A-Level Religious Studies Paper 2 ${year}`,
    level: 'A-Level' as const,
    subject: 'Religious Studies',
    year: `${year}`,
    filePath: `/documents/gce/A-Level/Religious Studies/${year}/paper2.pdf`,
    examType: 'GCE' as const,
  })),
  { id: 'gce-alevel-rs-2019-p3', title: 'A-Level Religious Studies Paper 3 2019', level: 'A-Level', subject: 'Religious Studies', year: '2019', filePath: '/documents/gce/A-Level/Religious Studies/2019/paper3.pdf', examType: 'GCE' },
  // Geography
  ...[2015, 2017, 2018, 2019, 2020].map(year => ({
    id: `gce-alevel-geo-${year}-p1`,
    title: `A-Level Geography Paper 1 ${year}`,
    level: 'A-Level' as const,
    subject: 'Geography',
    year: `${year}`,
    filePath: `/documents/gce/A-Level/Geography/${year}/paper1.pdf`,
    examType: 'GCE' as const,
  })),
  ...Array.from({ length: 5 }, (_, i) => 2015 + i).map(year => ({
    id: `gce-alevel-geo-${year}-p2`,
    title: `A-Level Geography Paper 2 ${year}`,
    level: 'A-Level' as const,
    subject: 'Geography',
    year: `${year}`,
    filePath: `/documents/gce/A-Level/Geography/${year}/paper2.pdf`,
    examType: 'GCE' as const,
  })),
  ...[2015, 2016, 2017, 2019, 2024].map(year => ({
    id: `gce-alevel-geo-${year}-p3`,
    title: `A-Level Geography Paper 3 ${year}`,
    level: 'A-Level' as const,
    subject: 'Geography',
    year: `${year}`,
    filePath: `/documents/gce/A-Level/Geography/${year}/paper3.pdf`,
    examType: 'GCE' as const,
  })),
];

export default function GcePage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);

  const { toast } = useToast();
  // We can use a loading state for initial render simulation
  const [documentsLoading, setDocumentsLoading] = useState(false);

  const subjects = selectedLevel === 'O-Level' ? oLevelSubjects : aLevelSubjects;

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value);
    setSelectedSubject(null); // Reset subject when level changes
  };
  
  const filteredDocuments = documents?.filter(doc => 
    (!selectedLevel || doc.level === selectedLevel) &&
    (!selectedSubject || doc.subject === selectedSubject) &&
    (!selectedYear || doc.year.toString() === selectedYear)
  ) || [];

  const handleDownload = async (doc: Document) => {
    setDownloadingDocId(doc.id);
    try {
      // Direct link to the public file
      window.open(doc.filePath, '_blank');
    } catch (error: any) {
      console.error("Download error:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "The file may not exist at the specified path.",
      });
    } finally {
      // Add a small delay to simulate a download process
      setTimeout(() => setDownloadingDocId(null), 1000);
    }
  };

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
            {documentsLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-5 w-3/4" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardContent>
                  <CardContent>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : filteredDocuments.length > 0 ? (
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
                             <Button 
                                className="w-full" 
                                onClick={() => handleDownload(doc)}
                                disabled={downloadingDocId === doc.id}
                              >
                                {downloadingDocId === doc.id ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <Download className="mr-2 h-4 w-4" />
                                )}
                                {downloadingDocId === doc.id ? 'Preparing...' : 'Download'}
                            </Button>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                    <p>No documents match your filter criteria.</p>
                    <p className="text-sm">Try adjusting your search or check back later.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
