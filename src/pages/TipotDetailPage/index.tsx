import { useParams } from 'react-router-dom';
import { doc, DocumentReference } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '@api/firebase';
import { Tipot } from '@utils/types/tipot';
import TipotDetail from '@components/TipotDetail';
import Spinner from '@components/Spinner';

export default function TipotDetailPage() {
    const { tipotId } = useParams<{ tipotId: string; }>();

    const tipotRef = doc(db, `tipots/${tipotId}`) as DocumentReference<Tipot>;
    const [tipot, loading, error] = useDocumentData<Tipot>(tipotRef);

    if (loading) return <Spinner isFull />;
    if (error) return <>{JSON.stringify(error)}</>;
    return <TipotDetail tipot={tipot!} />;
}
