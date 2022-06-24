import { db } from '@api/firebase';
import ModalFooter from '@components/ModalFooter';
import { Tipot } from '@utils/types/tipot';
import { doc, updateDoc } from 'firebase/firestore';
import { Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

interface Props {
    show: boolean;
    toggle: () => void;
    tipot: Tipot;
}

export default function RatingModal({ show, toggle, tipot }: Props) {
    const [rating, setRating] = useState<number>(tipot.rating || 0);

    const handleRatingChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setRating(e.target.valueAsNumber);
    };

    const updateRating = async () => {
        try {
            const tipotRef = doc(db, 'tipots', tipot.id);
            await updateDoc(tipotRef, { rating });
            toggle();
        } catch (e: any) {
            alert(e.message);
        }
    };

    return (
        <Modal show={show} onClose={toggle}>
            <Modal.Header>Change rating of "{tipot.title}"</Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-6'>
                    <TextInput
                        type='number'
                        value={rating}
                        onChange={handleRatingChange}
                        placeholder='rating...'
                        max={5}
                        min={0}
                    />
                </div>
            </Modal.Body>
            <ModalFooter
                onCancel={toggle}
                onConfirm={updateRating}
                confirmDisabled={rating === undefined}
            />
        </Modal>
    );
}
