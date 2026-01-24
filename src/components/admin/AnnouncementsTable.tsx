'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import type { WithId } from '@/firebase';

type Announcement = {
  title: string;
  message: string;
  startAt: { seconds: number; nanoseconds: number; };
  endAt: { seconds: number; nanoseconds: number; };
};

interface AnnouncementsTableProps {
  announcements: WithId<Announcement>[];
}

export function AnnouncementsTable({ announcements }: AnnouncementsTableProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleDelete = (announcementId: string) => {
    const announcementDocRef = doc(firestore, 'announcements', announcementId);
    deleteDocumentNonBlocking(announcementDocRef);
    toast({
      title: 'Announcement Deleted',
      description: 'The announcement has been successfully deleted.',
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Starts</TableHead>
          <TableHead>Ends</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {announcements.map((ann) => (
          <TableRow key={ann.id}>
            <TableCell className="font-medium max-w-[200px] truncate">{ann.title}</TableCell>
            <TableCell>{format(new Date(ann.startAt.seconds * 1000), 'MMM d, yyyy')}</TableCell>
            <TableCell>{format(new Date(ann.endAt.seconds * 1000), 'MMM d, yyyy')}</TableCell>
            <TableCell className="text-right">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the announcement.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(ann.id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
