import { storage } from '@api/firebase';
import ModalFooter from '@components/ModalFooter';
import TButton from '@components/TButton';
import { TEXT_BASE } from '@utils/constants/theme';
import { Tipot } from '@utils/types/tipot';
import { ref } from 'firebase/storage';
import { Avatar, FileInput, Modal, Progress } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';

interface Props {
    show: boolean;
    toggle: () => void;
    tipot: Tipot;
    tipotThumbnailUrl?: string;
}

export default function UploadTipotPhotoModal({ show, toggle, tipot, tipotThumbnailUrl }: Props) {
    const [image, setImage] = useState<File>();
    const [uploadFile, _, snapshot] = useUploadFile();

    useEffect(() => {
        // Close the modal automatically after an image is sucessfully uploaded
        if (snapshot && snapshot?.bytesTransferred === snapshot?.totalBytes) toggle();
    }, [snapshot?.bytesTransferred, snapshot?.totalBytes]);

    const handleTipotPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files ? e.target.files[0] : undefined);
    };

    const uploadTipotImage = async () => {
        try {
            const imageRef = ref(storage, `tipot-thumbnails/${tipot.id}`);
            await uploadFile(imageRef, image!);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal show={show} onClose={toggle}>
            <Modal.Header>Upload a photo for "{tipot.title}"</Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <h2 className={TEXT_BASE}>Current thumbnail:</h2>
                        <div className='overflow-y-auto max-h-96 scrollbar'>
                            <Avatar img={tipotThumbnailUrl} size='xxl' className='aspect-square' />
                        </div>
                    </div>
                    <FileInput onChange={handleTipotPhotoChange} />
                    {snapshot && (
                        <Progress
                            progress={Math.round(
                                (snapshot.bytesTransferred * 100) / snapshot.totalBytes,
                            )}
                            color='blue'
                            label='Uploading...'
                            labelPosition='outside'
                            labelProgress={true}
                        />
                    )}
                </div>
            </Modal.Body>
            <ModalFooter onCancel={toggle} onConfirm={uploadTipotImage} confirmDisabled={!image} />
        </Modal>
    );
}
