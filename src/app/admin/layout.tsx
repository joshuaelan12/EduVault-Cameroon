
'use client';

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
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, LogOut, GraduationCap } from 'lucide-react';
import { useAdmin } from '@/hooks/use-admin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdmin();
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !isAdminLoading) {
      if (!user) {
        router.push('/login');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, isUserLoading, isAdmin, isAdminLoading, router]);

  const handleLogout = () => {
    signOut(auth);
    router.push('/login');
  };
  
  if (isUserLoading || isAdminLoading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <GraduationCap className="h-12 w-12 animate-pulse text-primary" />
                <p className="text-muted-foreground">Verifying access...</p>
            </div>
        </div>
    )
  }

  if (!isAdmin) {
    // This will be caught by the useEffect, but as a fallback,
    // we can show a message or just null.
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Admin Panel</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/admin" asChild isActive={true}>
                <Link href="/admin">
                  <Users />
                  User Management
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
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="">EduVault</span>
            </Link>
            <SidebarTrigger>
                <span className="sr-only">Toggle Menu</span>
            </SidebarTrigger>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
