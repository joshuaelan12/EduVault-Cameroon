'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { usePathname } from 'next/navigation';

// Metadata can't be exported from a client component, but we can declare it here.
// For dynamic metadata, you would use the `generateMetadata` function in a page or layout.
// export const metadata: Metadata = {
//   title: 'EduVault Cameroon - Past Questions & Answers',
//   description: 'Access a vast library of past questions from GCE, University of Buea, University of Bamenda, and more. Your key to academic success in Cameroon.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <title>EduVault Cameroon - Past Questions & Answers</title>
        <meta name="description" content="Access a vast library of past questions from GCE, University of Buea, University of Bamenda, and more. Your key to academic success in Cameroon." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <FirebaseClientProvider>
          <div className="flex flex-col min-h-screen">
            {!isAdminRoute && !isDashboardRoute && <Header />}
            <main className="flex-grow">
              {children}
            </main>
            {!isAdminRoute && !isDashboardRoute && <Footer />}
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
