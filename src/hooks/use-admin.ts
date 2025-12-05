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
 * It checks if the `role` field in the user's document is set to 'admin'.
 *
 * @returns {UseAdminResult} An object containing the admin status and loading state.
 */
export function useAdmin(): UseAdminResult {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // Memoize the document reference to prevent re-renders
  const userDocRef = useMemoFirebase(() => {
    if (!user?.uid) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user?.uid]);
  
  const { data: userDoc, isLoading: isDocLoading } = useDoc(userDocRef);

  const isAdmin = useMemo(() => {
    // Check if the user document exists and if the role is 'admin'
    return userDoc?.role === 'admin';
  }, [userDoc]);

  return {
    isAdmin,
    isAdminLoading: isUserLoading || isDocLoading,
  };
}
