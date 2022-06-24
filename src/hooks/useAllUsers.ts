import { db } from '@api/firebase';
import { UserBase } from '@utils/types/user';
import { collection, FirestoreError, Query, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export type UsersHookResult = [UserBase[] | undefined, boolean, FirestoreError | undefined];

/**
 * @description A hook to fetch all users from the database.
 * @returns user "base" info along with the status of fetch request.
 */
export default function useAllUsers(): UsersHookResult {
    const usersRef = collection(db, 'users');
    const q = query(usersRef) as Query<UserBase>;
    const [users, loading, error] = useCollectionData<UserBase>(q);

    return [users, loading, error];
}
