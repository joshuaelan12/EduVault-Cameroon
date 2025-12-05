'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { WithId } from '@/firebase';

// Explicitly type the user object based on your backend.json entity
type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  role: string;
};

interface UsersTableProps {
  users: WithId<User>[];
}

export function UsersTable({ users }: UsersTableProps) {
  const firestore = useFirestore();

  const handleStatusChange = (userId: string, currentStatus: boolean) => {
    const userDocRef = doc(firestore, 'users', userId);
    updateDocumentNonBlocking(userDocRef, { isActive: !currentStatus });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Activate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.fullName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>
              <Badge variant={user.isActive ? 'default' : 'secondary'}>
                {user.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.role === 'admin' ? 'destructive' : 'outline'}>
                {user.role}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Switch
                checked={user.isActive}
                onCheckedChange={() => handleStatusChange(user.id, user.isActive)}
                aria-label={`Activate user ${user.fullName}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
