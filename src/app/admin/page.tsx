
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useAdmin } from '@/hooks/use-admin';
import { collection } from 'firebase/firestore';
import { UsersTable } from '@/components/admin/UsersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminPage() {
  const { isAdmin } = useAdmin();
  const firestore = useFirestore();

  const usersQuery = useMemoFirebase(() => {
    if (!isAdmin) return null;
    return collection(firestore, 'users');
  }, [firestore, isAdmin]);

  const { data: users, isLoading: usersLoading } = useCollection(usersQuery);

  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">View and manage all registered users.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Activate or deactivate user accounts.</CardDescription>
        </CardHeader>
        <CardContent>
          {usersLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <UsersTable users={users || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
