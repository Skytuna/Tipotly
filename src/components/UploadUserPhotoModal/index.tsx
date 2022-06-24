import { db, storage } from '@api/firebase';
import ModalFooter from '@components/ModalFooter';
import useStore from '@store/useStore';
import { TEXT_BASE } from '@utils/constants/theme';
import { doc, updateDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { Avatar, FileInput, Modal, Progress } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDownloadURL, useUploadFile } from 'react-firebase-hooks/storage';

interface Props {
    show: boolean;
    toggle: () => void;
}

export default function UploadUserPhotoModal({ show, toggle }: Props) {
    const user = useStore((s) => s.user);
    const [image, setImage] = useState<File>();
    const [uploadFile, _, snapshot] = useUploadFile();
    const [avatarUrl] = useDownloadURL(ref(storage, `user-avatars/${user?.id}`));

    useEffect(() => {
        // Close the modal automatically after an image is sucessfully uploaded
        if (snapshot && snapshot?.bytesTransferred === snapshot?.totalBytes) toggle();
    }, [snapshot?.bytesTransferred, snapshot?.totalBytes]);

    useEffect(() => {
        const updateUserPhoto = async () => {
            const userRef = doc(db, 'users', user?.id!);
            await updateDoc(userRef, {
                photoURL: avatarUrl,
            });
        };
        updateUserPhoto();
    }, [avatarUrl]);

    const handleTipotPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files ? e.target.files[0] : undefined);
    };

    const uploadAvatar = async () => {
        try {
            const imageRef = ref(storage, `user-avatars/${user?.id}`);
            await uploadFile(imageRef, image!);
        } catch (e: any) {
            alert(e.message);
        }
    };

    return (
        <Modal show={show} onClose={toggle}>
            <Modal.Header>Upload an avatar for "{user?.name}"</Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <h2 className={TEXT_BASE}>Current avatar:</h2>
                        <div className='overflow-y-auto max-h-96 scrollbar'>
                            <Avatar img={avatarUrl} size='xxl' className='aspect-square' />
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
            <ModalFooter onCancel={toggle} onConfirm={uploadAvatar} confirmDisabled={!image} />
        </Modal>
    );
}
