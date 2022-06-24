import { db, storage } from '@api/firebase';
import TipotDate from '@components/TipotDate';
import { ref } from 'firebase/storage';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import TipotThumbnail from '@components/TipotThumbnail';
import { FiTrash } from 'react-icons/fi';
import { doc, DocumentReference, updateDoc } from 'firebase/firestore';
import Card from '@components/Card';
import { User } from '@utils/types/user';
import useStore from '@store/useStore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

interface Props {
    friend: User;
}

export default function FriendCard({ friend }: Props) {
    const userId = useStore((s) => s.user?.id!);
    const [thumbnail, loading, error] = useDownloadURL(ref(storage, `user-avatars/${friend.id}`));
    const [user] = useDocumentData(doc(db, `users/${userId}`) as DocumentReference<User>);

    const deleteFriend = async () => {
        try {
            const userRef = doc(db, 'users', user?.id!);
            const oldFriends = user?.friends;
            const updatedFriends = oldFriends
                ? [...oldFriends.filter((user) => user.id !== friend.id)]
                : [];
            await updateDoc(userRef, { friends: updatedFriends });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Card
            actionButtons={[{ title: 'REMOVE FRIEND', onClick: deleteFriend, icon: FiTrash }]}
            content={
                <>
                    <div className='w-32 h-32 aspect-square mr-auto justify-center items-center flex'>
                        <TipotThumbnail url={thumbnail} loading={loading} error={!!error} />
                    </div>
                    <div className='flex flex-col flex-1 p-6 justify-between'>
                        <h2 className='font-montserrat text-xl text-textPrimary truncate w-48'>
                            {friend.name}
                        </h2>
                        <div className='flex flex-row items-center justify-between'>
                            <TipotDate timestamp={friend.createdAt} />
                        </div>
                    </div>
                </>
            }
        />
    );
}
