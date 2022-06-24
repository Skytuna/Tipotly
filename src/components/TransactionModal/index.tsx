import TButton from '@components/TButton';
import { TEXT_BASE } from '@utils/constants/theme';
import { TransactionItem } from '@utils/types/tipot';
import { Modal, TextInput } from 'flowbite-react';
import { useRef } from 'react';

interface Props {
    showInputModal: boolean;
    toggleInputModal: () => void;
    onConfirm: (newTransaction: TransactionItem) => void;
    transaction: TransactionItem;
}

export default function TransactionModal({
    onConfirm,
    transaction,
    toggleInputModal,
    showInputModal,
}: Props) {
    const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

    const handleConfirm = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const value = parseInt(form.get('transaction-value') as string);
        const description = form.get('transaction-description') as string;
        onConfirm({ value, description });
        toggleInputModal();
    };

    return (
        <Modal show={showInputModal} onClose={toggleInputModal}>
            <form onSubmit={handleConfirm} ref={formRef}>
                <Modal.Header>Enter a transaction value</Modal.Header>
                <Modal.Body>
                    <div className='flex flex-col gap-8'>
                        <div>
                            <label htmlFor='transaction' className={TEXT_BASE}>
                                Transaction
                            </label>
                            <TextInput
                                type='number'
                                name='transaction-value'
                                max={999}
                                min={-999}
                                placeholder='Transaction'
                                required
                                defaultValue={transaction.value}
                            />
                        </div>
                        <div>
                            <label htmlFor='transaction-description' className={TEXT_BASE}>
                                Description
                            </label>
                            <TextInput
                                type='text'
                                maxLength={50}
                                required
                                name='transaction-description'
                                placeholder='Description'
                                defaultValue={transaction.description}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <TButton
                        onClick={toggleInputModal}
                        className='bg-transparent hover:bg-slate-50 shadow-none'>
                        <h4 className={TEXT_BASE}>CANCEL</h4>
                    </TButton>
                    <TButton className='bg-primary hover:bg-primaryHover' type='submit'>
                        <h4 className={TEXT_BASE}>CONFIRM</h4>
                    </TButton>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
