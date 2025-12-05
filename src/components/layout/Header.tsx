'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, GraduationCap, Shield } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/firebase';
import { useAdmin } from '@/hooks/use-admin';

const navLinks = [
  { href: '#exams', label: 'Exams' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const { isAdmin } = useAdmin();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold inline-block">EduVault Cameroon</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
          {/* Admin link will only show if the user is an admin */}
          {!isUserLoading && user && isAdmin && (
            <Link
              href="/admin"
              className="transition-colors hover:text-foreground/80 text-foreground font-semibold"
            >
              <Shield className="mr-2 h-4 w-4 inline-block" />
              Admin
            </Link>
          )}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-8">
                  <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span className="font-bold">EduVault Cameroon</span>
                  </Link>
                </div>
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {/* Admin link for mobile */}
                  {!isUserLoading && user && isAdmin && (
                    <Link
                      href="/admin"
                      className="text-lg font-medium text-foreground"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <Shield className="mr-2 h-4 w-4 inline-block" />
                      Admin
                    </Link>
                  )}
                </div>
                <div className="mt-auto flex flex-col space-y-2">
                  <Button variant="outline" asChild>
                    <Link href="/login" onClick={() => setIsSheetOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register" onClick={() => setIsSheetOpen(false)}>Register</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
