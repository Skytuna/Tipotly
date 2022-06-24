import TButton from '@components/TButton';
import { TEXT_BASE } from '@utils/constants/theme';
import { Modal } from 'flowbite-react';
import { twMerge } from 'tailwind-merge';

interface Props {
    onCancel: () => void;
    onConfirm: () => void;
    confirmDisabled?: boolean;
}

export default function ModalFooter({ onConfirm, onCancel, confirmDisabled }: Props) {
    return (
        <Modal.Footer>
            <div className='flex-row w-full justify-end flex gap-2'>
                <TButton
                    onClick={onCancel}
                    className='bg-transparent hover:bg-slate-50 shadow-none'>
                    <h4 className={TEXT_BASE}>CANCEL</h4>
                </TButton>
                <TButton
                    className={twMerge(
                        'bg-primary hover:bg-primaryHover',
                        confirmDisabled && 'cursor-not-allowed',
                    )}
                    onClick={confirmDisabled ? undefined : onConfirm}
                    disabled={confirmDisabled}>
                    <h4 className={TEXT_BASE}>CONFIRM</h4>
                </TButton>
            </div>
        </Modal.Footer>
    );
}
