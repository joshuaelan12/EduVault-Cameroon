'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AnnouncementForm } from '@/components/admin/AnnouncementForm';
import { AnnouncementsTable } from '@/components/admin/AnnouncementsTable';

export type Announcement = {
    id: string;
    title: string;
    message: string;
    startAt: { seconds: number; nanoseconds: number; };
    endAt: { seconds: number; nanoseconds: number; };
};


export default function AnnouncementsPage() {
    const firestore = useFirestore();

    const announcementsQuery = useMemoFirebase(() => {
        return query(collection(firestore, 'announcements'), orderBy('startAt', 'desc'));
    }, [firestore]);

    const { data: announcements, isLoading } = useCollection<Announcement>(announcementsQuery);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Announcement Management</h1>
                <p className="text-muted-foreground">Create, view, and manage site-wide announcements.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Announcement</CardTitle>
                            <CardDescription>This will be displayed to all active users on their dashboard.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AnnouncementForm />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Existing Announcements</CardTitle>
                             <CardDescription>List of all created announcements.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             {isLoading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                ) : (
                                <AnnouncementsTable announcements={announcements || []} />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
