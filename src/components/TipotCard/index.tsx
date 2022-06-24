import { db, storage } from '@api/firebase';
import TipotDate from '@components/TipotDate';
import { Tipot } from '@utils/types/tipot';
import { ref } from 'firebase/storage';
import { Link, useNavigate } from 'react-router-dom';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import TipotThumbnail from '@components/TipotThumbnail';
import { FiImage, FiStar, FiTrash } from 'react-icons/fi';
import { TEXT_BASE } from '@utils/constants/theme';
import { doc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';
import UploadTipotPhotoModal from '@components/UploadTipotPhotoModal';
import { Rating } from 'flowbite-react';
import { twMerge } from 'tailwind-merge';
import RatingModal from '@components/RatingModal';
import Card from '@components/Card';
import { ActionButton } from '@utils/types/card';

interface Props {
    tipot: Tipot;
}

export default function TipotCard({ tipot }: Props) {
    const [showUploadTipotPhotoModal, setShowUploadTipotPhotoModal] = useState<boolean>(false);
    const [showRatingModal, setShowRatingModal] = useState<boolean>(false);
    const [thumbnail, loading, error] = useDownloadURL(
        ref(storage, `tipot-thumbnails/${tipot.id}`),
    );
    let navigate = useNavigate();

    const deleteTipot = async () => {
        try {
            await deleteDoc(doc(db, 'tipots', tipot.id));
            navigate('/tipots');
        } catch (e) {
            console.error(e);
        }
    };

    const toggleTipotPhotoUploadModal = () => {
        setShowUploadTipotPhotoModal((p) => !p);
    };

    const toggleRatingModal = () => {
        setShowRatingModal((p) => !p);
    };

    const [actionButtons] = useState<ActionButton[]>([
        { title: 'CHANGE RATING', onClick: toggleRatingModal, icon: FiStar },
        { title: 'UPLOAD PHOTO', onClick: toggleTipotPhotoUploadModal, icon: FiImage },
        { title: 'DELETE TIPOT', onClick: deleteTipot, icon: FiTrash },
    ]);

    return (
        <Card
            actionButtons={actionButtons}
            content={
                <>
                    <Link to={tipot.id}>
                        <div className='w-32 h-32 aspect-square mr-auto justify-center items-center flex'>
                            <TipotThumbnail
                                url={thumbnail}
                                loading={loading}
                                error={showUploadTipotPhotoModal || !!error}
                            />
                        </div>
                    </Link>
                    <div className='flex flex-col flex-1 p-6 justify-between'>
                        <h2 className='font-montserrat text-xl text-textPrimary truncate w-48'>
                            {tipot.title}
                        </h2>
                        <div className='flex flex-row items-center justify-between'>
                            <TipotDate timestamp={tipot.createdAt} />
                            <Rating title={tipot.rating?.toString()}>
                                <Rating.Star />
                                <p className='ml-1 text-sm font-medium font-montserrat text-gray-600'>
                                    {tipot.rating || '-'}
                                </p>
                                <p className={twMerge(TEXT_BASE + ' text-sm')}>/5</p>
                            </Rating>
                        </div>
                    </div>
                </>
            }>
            <UploadTipotPhotoModal
                tipot={tipot}
                show={showUploadTipotPhotoModal}
                toggle={toggleTipotPhotoUploadModal}
                tipotThumbnailUrl={thumbnail}
            />
            <RatingModal tipot={tipot} show={showRatingModal} toggle={toggleRatingModal} />
        </Card>
    );
}
