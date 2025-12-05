
'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, LogOut, Wallet, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signOut } from 'firebase/auth';

// Explicitly type the user object based on your backend.json entity
type UserData = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  role: string;
};

function ActivationPage() {
    const auth = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        signOut(auth);
        router.push('/login');
    };

    return (
        <div className="container mx-auto py-12 px-4 flex items-center justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="w-6 h-6 text-primary" />
                        Activate Your Account
                    </CardTitle>
                    <CardDescription>
                        To get unlimited access to all past questions, you need to activate your account with a one-time fee.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">One-Time Activation Fee</p>
                        <p className="text-4xl font-bold">500 XAF</p>
                    </div>
                    <div className="space-y-4 rounded-lg border bg-card p-4">
                        <h3 className="font-semibold">Step 1: Payment</h3>
                        <p className="text-muted-foreground">
                            Please send the activation fee via Mobile Money to:
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li><strong className="font-medium">Provider:</strong> MTN Mobile Money</li>
                            <li><strong className="font-medium">Number:</strong> 654834766</li>
                            <li><strong className="font-medium">Name:</strong> Maisa Elangwe Theophilus</li>
                        </ul>
                    </div>
                     <div className="space-y-4 rounded-lg border bg-card p-4">
                        <h3 className="font-semibold">Step 2: Verification</h3>
                        <p className="text-muted-foreground">
                           After payment, send a screenshot of the transaction via WhatsApp for verification:
                        </p>
                         <a href="https://wa.me/237680312275" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                            <MessageSquare className="inline-block w-4 h-4" />
                            <span>+237 680 312 275</span>
                        </a>
                        <p className="text-xs text-muted-foreground pt-2">
                           An administrator will activate your account upon confirmation. This usually takes less than 24 hours.
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

function UserDashboard({ user }: { user: UserData }) {
     const auth = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        signOut(auth);
        router.push('/login');
    };

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.fullName}!</h1>
                <p className="text-muted-foreground">This is your dashboard. You can start searching for past questions now.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Status: <span className="font-semibold text-green-600">Active</span></p>
                    <p className="text-muted-foreground text-sm">You have full access to all resources.</p>
                </CardContent>
                 <CardFooter>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  // Memoize the document reference
  const userDocRef = useMemoFirebase(() => {
    if (!user?.uid) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user?.uid]);

  const { data: userData, isLoading: isDocLoading } = useDoc<UserData>(userDocRef);

  useEffect(() => {
    // If auth is done loading and there's no user, redirect to login
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  // Loading state
  if (isUserLoading || isDocLoading) {
    return (
        <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center bg-transparent">
            <div className="space-y-4 w-full max-w-lg p-4">
                <Skeleton className="h-12 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-4 w-full mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </CardContent>
                </Card>
            </div>
      </div>
    );
  }

  // If user data exists, decide which component to show
  if (userData) {
    return userData.isActive ? <UserDashboard user={userData} /> : <ActivationPage />;
  }
  
  // Fallback if there's a user but no doc (this covers the admin case)
  // Admins will be redirected away by the admin layout anyway.
  return null;
}
