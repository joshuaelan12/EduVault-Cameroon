'use client';

import { useMemo } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

interface UseAdminResult {
  isAdmin: boolean;
  isAdminLoading: boolean;
}

/**
 * A hook to determine if the current user has admin privileges.
 * An admin is defined as a user who exists in Firebase Auth but
 * does NOT have a corresponding document in the 'users' collection in Firestore.
 *
 * @returns {UseAdminResult} An object containing the admin status and loading state.
 */
export function useAdmin(): UseAdminResult {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // Memoize the document reference to prevent re-renders.
  // This ref points to where a REGULAR user's document would be.
  const userDocRef = useMemoFirebase(() => {
    if (!user?.uid) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user?.uid]);

  // Attempt to fetch the document.
  const { data: userDoc, isLoading: isDocLoading } = useDoc(userDocRef);

  const isAdmin = useMemo(() => {
    // If the main user object is still loading, we can't make a decision.
    if (isUserLoading || isDocLoading) {
      return false;
    }
    
    // If a user is logged in (exists in Auth) but their document does NOT exist in Firestore,
    // they are considered an admin.
    return !!user && !userDoc;
  }, [user, userDoc, isUserLoading, isDocLoading]);

  return {
    isAdmin,
    isAdminLoading: isUserLoading || isDocLoading,
  };
}
