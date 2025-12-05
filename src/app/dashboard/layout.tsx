'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { GraduationCap, LogOut } from 'lucide-react';
import Link from 'next/link';

type UserData = {
  fullName: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const auth = useAuth();

  const userDocRef = useMemoFirebase(() => {
    if (!user?.uid) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user?.uid]);

  const { data: userData, isLoading: isDocLoading } = useDoc<UserData>(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = () => {
    signOut(auth);
    router.push('/login');
  };

  if (isUserLoading || isDocLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <GraduationCap className="h-12 w-12 animate-pulse text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="">EduVault</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <span className="font-medium text-sm text-muted-foreground hidden sm:inline-block">
            {userData?.fullName || user?.email}
          </span>
          <Button onClick={handleLogout} variant="outline" size="icon">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </header>
      <main className="p-4 sm:px-6 sm:py-0">{children}</main>
    </div>
  );
}
