import { db } from '@api/firebase';
import GoBackButton from '@components/GoBackButton';
import TipotForm from '@forms/TipotForm';
import useStore from '@store/useStore';
import { NewTipot } from '@utils/types/tipot';
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function NewTipotPage() {
    const user = useStore((s) => s.user);
    let navigate = useNavigate();

    const createNewTipot = async (newTipot: NewTipot) => {
        try {
            const docRef = await addDoc(collection(db, 'tipots'), newTipot);
            await updateDoc(docRef, {
                id: docRef.id,
                createdAt: serverTimestamp(),
                user,
                tipotRows: [],
            });
            navigate(-1);
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <div className='flex flex-col gap-8'>
            <header className='flex flex-row items-center justify-center'>
                <div className='mr-auto'>
                    <GoBackButton />
                </div>
                <h2 className='mr-auto font-montserrat font-medium text-xl'>ADD TIPOT</h2>
            </header>
            <TipotForm onSubmit={createNewTipot} />
        </div>
    );
}
