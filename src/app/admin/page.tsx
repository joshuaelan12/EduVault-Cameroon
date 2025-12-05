
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useAdmin } from '@/hooks/use-admin';
import { collection } from 'firebase/firestore';
import { UsersTable } from '@/components/admin/UsersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdmin();
  const router = useRouter();
  const firestore = useFirestore();

  // Redirect logic
  useEffect(() => {
    // Wait until both user and admin status are fully loaded
    if (isUserLoading || isAdminLoading) {
      return; // Do nothing while loading
    }

    // If loading is finished, then we can safely check the user's status
    if (!user) {
      // If there's no user, redirect to login
      router.push('/login');
    } else if (!isAdmin) {
      // If the user is logged in but is NOT an admin, redirect to the homepage
      router.push('/');
    }
    // If the user exists and is an admin, this effect does nothing, and the page is rendered.
  }, [user, isUserLoading, isAdmin, isAdminLoading, router]);

  const usersQuery = useMemoFirebase(() => {
    // Only query for users if the current user is an admin
    if (!isAdmin) return null;
    return collection(firestore, 'users');
  }, [firestore, isAdmin]);

  const { data: users, isLoading: usersLoading } = useCollection(usersQuery);

  // Show a loading skeleton while we verify the user and their role
  if (isUserLoading || isAdminLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  // Render content only if the user is an admin
  // This prevents any brief flicker of admin content for non-admin users before redirection
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage all registered users.</CardDescription>
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
