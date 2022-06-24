import { db } from '@api/firebase';
import Spinner from '@components/Spinner';
import TButton from '@components/TButton';
import TipotCard from '@components/TipotCard';
import useStore from '@store/useStore';
import { TEXT_BASE } from '@utils/constants/theme';
import { Tipot } from '@utils/types/tipot';
import { collection, Query, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';

export default function TipotsPage() {
    const userId = useStore((s) => s.user?.id);
    const tipotsRef = collection(db, 'tipots');
    const q = query(tipotsRef, where('user.id', '==', userId)) as Query<Tipot>;
    const [tipots, loading, error] = useCollectionData<Tipot>(q);

    if (loading) return <Spinner isFull />;
    if (error) return <>{JSON.stringify(error)}</>;
    return (
        <>
            <header className='flex flex-col gap-4 sm:flex-row items-center justify-center sm:justify-between'>
                <h1 className='font-montserrat text-2xl text-textPrimary'>MY TIPOTS</h1>
                <Link to='new'>
                    <TButton>
                        <p className={TEXT_BASE}>NEW TIPOT</p>
                    </TButton>
                </Link>
            </header>
            <div className='grid md:grid-cols-fill-20 sm:grid-cols-1 gap-4 mt-8'>
                {tipots?.map((tipot) => (
                    <TipotCard key={tipot.id} tipot={tipot} />
                ))}
            </div>
        </>
    );
}
