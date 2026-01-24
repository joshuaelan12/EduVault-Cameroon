'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';
import { useMemo } from 'react';

type Announcement = {
    id: string;
    title: string;
    message: string;
    startAt: { seconds: number; nanoseconds: number; }; // Firestore timestamp
    endAt: { seconds: number; nanoseconds: number; }; // Firestore timestamp
};

export function Announcements() {
  const firestore = useFirestore();

  const announcementsQuery = useMemoFirebase(() => {
    // We only want to show announcements that are currently active.
    // So we'll fetch the 5 most recent announcements that have started.
    return query(
        collection(firestore, 'announcements'),
        orderBy('startAt', 'desc'),
        limit(5)
    );
  }, [firestore]);

  const { data: announcements, isLoading } = useCollection<Announcement>(announcementsQuery);

  const activeAnnouncements = useMemo(() => {
    if (!announcements) return [];
    const now = new Date();
    return announcements.filter(ann => {
        const startDate = new Date(ann.startAt.seconds * 1000);
        startDate.setHours(0, 0, 0, 0); // Normalize to start of day for accurate comparison

        const endDate = new Date(ann.endAt.seconds * 1000);
        endDate.setHours(23, 59, 59, 999); // Set to the very end of the selected day

        return startDate <= now && endDate >= now;
    });
  }, [announcements]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Latest Announcements
        </CardTitle>
        <CardDescription>Stay updated with the latest news from EduVault.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <>
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/4" />
            </div>
             <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </>
        ) : activeAnnouncements && activeAnnouncements.length > 0 ? (
          activeAnnouncements.map(ann => (
            <div key={ann.id} className="p-4 rounded-md border bg-background/50">
                <p className="font-semibold">{ann.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{ann.message}</p>
                 <p className="text-xs text-muted-foreground/80 mt-2">
                    Posted on: {format(new Date(ann.startAt.seconds * 1000), 'PPP')}
                </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No new announcements at the moment.</p>
        )}
      </CardContent>
    </Card>
  );
}
