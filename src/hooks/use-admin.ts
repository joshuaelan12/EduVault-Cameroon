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
 * It checks for the existence of a document in the 'roles_admin' collection
 * with the user's UID as the document ID.
 *
 * @returns {UseAdminResult} An object containing the admin status and loading state.
 */
export function useAdmin(): UseAdminResult {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // Memoize the document reference to prevent re-renders
  const adminDocRef = useMemoFirebase(() => {
    if (!user?.uid) return null;
    return doc(firestore, 'roles_admin', user.uid);
  }, [firestore, user?.uid]);
  
  const { data: adminDoc, isLoading: isDocLoading } = useDoc(adminDocRef);

  const isAdmin = useMemo(() => !!adminDoc, [adminDoc]);

  return {
    isAdmin,
    isAdminLoading: isUserLoading || isDocLoading,
  };
}
