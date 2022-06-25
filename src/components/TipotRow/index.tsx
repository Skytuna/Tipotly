import { db } from '@api/firebase';
import TButton from '@components/TButton';
import TipotRowBadge from '@components/TipotRowBadge';
import TransactionItem from '@components/TransactionItem';
import useAllUsers from '@hooks/useAllUsers';
import useHover from '@hooks/useHover';
import useStore from '@store/useStore';
import { DEFAULT_ICON_COLOR, ICON_SIZE, TRANSITION_BASE } from '@utils/constants/theme';
import {
    TipotRow as TipotRowType,
    TransactionItem as TransactionItemType,
} from '@utils/types/tipot';
import { User, UserBase } from '@utils/types/user';
import { doc, DocumentReference } from 'firebase/firestore';
import { Avatar, Modal, Select } from 'flowbite-react';
import { useMemo, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { FiPlusCircle, FiTrash } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface Props {
    tipotRow?: TipotRowType;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onDelete?: React.MouseEventHandler<HTMLButtonElement>;
    onUserSelection?: (user: UserBase) => void;
    tipotRows?: TipotRowType[];
    addTransaction?: (transaction?: TransactionItemType) => void;
    deleteTransaction?: (transactionIndex: number) => void;
    updateTransaction?: (transactionIndex: number, transaction: TransactionItemType) => void;
}

export default function TipotRow({
    tipotRow,
    onClick,
    onDelete,
    onUserSelection,
    tipotRows,
    addTransaction,
    deleteTransaction,
    updateTransaction,
}: Props) {
    const [showUsersModal, setShowUsersModal] = useState<boolean>(false);
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();
    const userId = useStore((s) => s.user?.id)!;
    const [users] = useAllUsers();
    const [user, userLoading, userError, userSnapshot] = useDocumentData(
        doc(db, 'users', userId) as DocumentReference<User>,
    );

    const handleUserSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const uid = e.target.value;
        const selectedUser = users?.find((user) => user.id === uid)!;
        onUserSelection && onUserSelection(selectedUser);
        setShowUsersModal(false);
    };

    const selectableUsers = useMemo(() => {
        const allUsers = [];
        if (user) allUsers.push(...user.friends, user);
        return allUsers.filter((u) => !tipotRows?.map((r) => r.user?.id).includes(u.id));
    }, [userSnapshot?.exists()]);

    const isFirstTransactionEmpty = tipotRow?.transactions && tipotRow.transactions[0]?.value === 0;

    return (
        <div className='relative max-w-full' ref={hoverRef}>
            <div
                onClick={onClick}
                className='flex flex-col sm:flex-row w-full py-6 border-2 border-slate-200 hover:border-slate-100 rounded px-4 justify-start items-center 
             hover:shadow transition-all relative gap-6 overflow-x-auto scrollbar'>
                <>
                    {tipotRow ? (
                        <>
                            <div className='hover:cursor-pointer'>
                                <Avatar
                                    title={tipotRow?.user?.name || undefined}
                                    img={tipotRow?.user?.photoURL || undefined}
                                    rounded
                                    onClick={() => setShowUsersModal(true)}>
                                    <h3 className='font-montserrat text-sm max-w-fit hidden sm:flex'>
                                        {tipotRow?.user?.name}
                                    </h3>
                                </Avatar>
                            </div>
                            {tipotRow?.user && (
                                <>
                                    <div className='flex flex-row gap-2 sm:gap-4'>
                                        <TransactionItem
                                            className={twMerge(
                                                'h-10 w-10 cursor-pointer',
                                                isFirstTransactionEmpty && 'cursor-not-allowed',
                                            )}
                                            onClick={() =>
                                                addTransaction &&
                                                !isFirstTransactionEmpty &&
                                                addTransaction()
                                            }
                                        />
                                        {tipotRow.transactions.map((transaction, i) => (
                                            <TransactionItem
                                                key={i}
                                                transaction={transaction}
                                                updateTransaction={(t) =>
                                                    updateTransaction && updateTransaction(i, t)
                                                }
                                                onDelete={() =>
                                                    deleteTransaction && deleteTransaction(i)
                                                }
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                            <div className='ml-auto'>
                                {tipotRow.exchanges.map((exchange, i) => (
                                    <TipotRowBadge
                                        to={exchange.to}
                                        value={exchange.value}
                                        key={i}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-1 justify-center'>
                            <FiPlusCircle size={ICON_SIZE.MEDIUM} className={DEFAULT_ICON_COLOR} />
                        </div>
                    )}

                    <Modal show={showUsersModal} onClose={() => setShowUsersModal(false)}>
                        <Modal.Header>Select the user for the tipot row</Modal.Header>
                        <Modal.Body>
                            <Select
                                title='Select User'
                                onChange={handleUserSelection}
                                defaultValue={undefined}>
                                {selectableUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                                <option value={undefined}>NONE</option>
                            </Select>
                        </Modal.Body>
                    </Modal>
                </>
            </div>

            <TButton
                className={twMerge(
                    TRANSITION_BASE,
                    'p-2 absolute -right-4 -top-4 bg-slate-50 hover:bg-slate-100',
                    onDelete && isHovered && 'opacity-100',
                )}
                onClick={onDelete}>
                <FiTrash size={ICON_SIZE.XSMALL} className={DEFAULT_ICON_COLOR} />
            </TButton>
        </div>
    );
}
