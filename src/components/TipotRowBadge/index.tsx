import { storage } from '@api/firebase';
import { TEXT_BASE } from '@utils/constants/theme';
import { UserId } from '@utils/types/user';
import { ref } from 'firebase/storage';
import { Avatar } from 'flowbite-react';
import { useDownloadURL } from 'react-firebase-hooks/storage';

interface Props {
    to: UserId;
    value: number;
}

export default function TipotRowBadge({ to, value }: Props) {
    const [toUserAvatar] = useDownloadURL(ref(storage, `user-avatars/${to}`));
    return (
        <div className='bg-slate-200 p-1 rounded-full border border-slate-400'>
            <div className='flex flex-row gap-4 items-center'>
                <Avatar img={toUserAvatar} rounded size='md' />
                <p className={TEXT_BASE + ' mr-4 font-bold'}>{Math.abs(value)}</p>
            </div>
        </div>
    );
}
