import { convertTimestamp } from '@utils';
import { Timestamp } from 'firebase/firestore';

interface Props {
    timestamp?: Timestamp;
}

export default function TipotDate({ timestamp }: Props) {
    return (
        <h4 className='flex flex-row gap-4 text-gray-600 font-montserrat font-thin text-sm text-center'>
            {convertTimestamp(timestamp)}
        </h4>
    );
}
