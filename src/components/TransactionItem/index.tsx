import TButton from '@components/TButton';
import TransactionModal from '@components/TransactionModal';
import useHover from '@hooks/useHover';
import { DEFAULT_ICON_COLOR, ICON_SIZE, TRANSITION_BASE } from '@utils/constants/theme';
import { TransactionItem as TransactionItemType } from '@utils/types/tipot';
import { Tooltip } from 'flowbite-react';
import { useState } from 'react';
import { FiPlusCircle, FiTrash } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface Props {
    onDelete?: () => void;
    updateTransaction?: (newTransaction: TransactionItemType) => void;
    transaction?: TransactionItemType;
    className?: string;
    onClick?: () => void;
}

export default function TransactionItem({
    transaction,
    onDelete,
    onClick,
    updateTransaction,
    className,
}: Props) {
    const [showInputModal, setShowInputModal] = useState<boolean>(false);
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();

    const toggleInputModal = () => {
        setShowInputModal((p) => !p);
    };

    const handleTransactionInputConfirmation = (newTransaction: TransactionItemType) => {
        updateTransaction && updateTransaction(newTransaction);
    };

    const calculateBorder = () => {
        if (!transaction) return;
        if (transaction.value > 0)
            return 'border-green-400 hover:border-green-400 hover:shadow-green-300';
        if (transaction.value < 0)
            return 'border-red-400 hover:border-red-400 hover:shadow-red-300';
    };

    return (
        <div
            onClick={onClick}
            ref={hoverRef}
            className={twMerge(
                'bg-slate-300 rounded border-2 w-14 flex border-slate-200 hover:border-slate-100 hover:shadow items-center justify-center relative',
                calculateBorder(),
                className,
            )}>
            {transaction !== undefined ? (
                <Tooltip content={transaction.description || '-'} placement='left'>
                    <button
                        className='px-2 font-montserrat text-textPrimary font-bold'
                        onClick={toggleInputModal}>
                        {transaction.value}
                    </button>
                </Tooltip>
            ) : (
                <FiPlusCircle
                    size={ICON_SIZE.XSMALL}
                    className={DEFAULT_ICON_COLOR}
                />
            )}

            {onDelete && (
                <TButton
                    className={twMerge(
                        TRANSITION_BASE,
                        'p-1.5 absolute -right-4 -top-4 bg-slate-50 hover:bg-slate-100',
                        isHovered && 'opacity-100',
                    )}
                    onClick={onDelete}>
                    <FiTrash size={ICON_SIZE.XXSMALL} className={DEFAULT_ICON_COLOR} />
                </TButton>
            )}

            <TransactionModal
                onConfirm={handleTransactionInputConfirmation}
                showInputModal={showInputModal}
                toggleInputModal={toggleInputModal}
                transaction={transaction || { value: 0, description: '' }}
            />
        </div>
    );
}
