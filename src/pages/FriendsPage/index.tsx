import { db } from '@api/firebase';
import FriendCard from '@components/FriendCard';
import useStore from '@store/useStore';
import { User } from '@utils/types/user';
import {
    collection,
    CollectionReference,
    doc,
    DocumentReference,
    updateDoc,
} from 'firebase/firestore';
import { Dropdown } from 'flowbite-react';
import { useMemo } from 'react';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

export default function FriendsPage() {
    const userId = useStore((s) => s.user?.id)!;
    const userRef = doc(db, 'users', userId) as DocumentReference<User>;
    const usersRef = collection(db, 'users') as CollectionReference<User>;

    const [user, userLoading, userError, userSnapshot] = useDocumentData<User>(userRef);
    const [users, usersLoading, usersError, usersSnapshot] = useCollectionData<User>(usersRef);

    const sendFriendRequest = async (userToAdd: User) => {
        const newFriendList = [userToAdd];
        if (user?.friends) newFriendList.push(...user.friends);
        try {
            await updateDoc(userRef, { friends: newFriendList });
        } catch (e: any) {
            alert(e.message);
        }
    };

    const filteredUsers = useMemo(() => {
        return users?.filter((u) => u.id !== userId && !user?.friends?.find((a) => a.id === u.id));
    }, [userSnapshot, usersSnapshot]);

    return (
        <>
            <header className='flex flex-col gap-4 sm:flex-row items-center justify-center sm:justify-between'>
                <h1 className='font-montserrat text-2xl text-textPrimary'>MY FRIENDS</h1>
                <div className='z-10'>
                    <Dropdown label='ADD FRIEND'>
                        {filteredUsers?.map((user) => (
                            <Dropdown.Item key={user.id} onClick={() => sendFriendRequest(user)}>
                                {user.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
            </header>
            <div className='grid md:grid-cols-fill-20 sm:grid-cols-1 gap-4 mt-8'>
                {user?.friends?.map((friend) => (
                    <FriendCard key={friend.id} friend={friend} />
                ))}
            </div>
        </>
    );
}
