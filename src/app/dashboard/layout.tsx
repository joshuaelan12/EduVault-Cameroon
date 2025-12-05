'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { GraduationCap, LogOut, School, BookOpen } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';

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
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">EduVault</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/gce" asChild>
                <Link href="/dashboard/gce">
                  <BookOpen />
                  GCE Past Questions
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/uba" asChild>
                <Link href="/dashboard/uba">
                  <School />
                  Univ. of Bamenda
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/ub" asChild>
                <Link href="/dashboard/ub">
                  <School />
                  Univ. of Buea
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-2">
            <LogOut />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 md:justify-end">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold md:hidden">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="">EduVault</span>
            </Link>
            <SidebarTrigger className="md:hidden">
                <span className="sr-only">Toggle Menu</span>
            </SidebarTrigger>
             <div className="hidden md:flex items-center gap-4">
                <span className="font-semibold text-sm">{userData?.fullName || user?.email}</span>
                 <Button onClick={handleLogout} variant="outline" size="icon">
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Logout</span>
                 </Button>
             </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
