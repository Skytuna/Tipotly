import GoBackButton from '@components/GoBackButton';
import { Tipot, TipotRow as TipotRowType, TransactionItem } from '@utils/types/tipot';
import TipotRow from '@components/TipotRow';
import { useEffect, useState } from 'react';
import { UserBase } from '@utils/types/user';
import TButton from '@components/TButton';
import { doc, DocumentReference, updateDoc } from 'firebase/firestore';
import { db } from '@api/firebase';
import { useNavigate } from 'react-router-dom';
import TipotDate from '@components/TipotDate';
import { calculateTransactions } from '@utils/helpers/tipot';

interface Props {
    tipot: Tipot;
}

export default function TipotDetail({ tipot }: Props) {
    const [tipotRows, setTipotRows] = useState<TipotRowType[]>(tipot.tipotRows || []);
    let navigate = useNavigate();

    useEffect(() => {
        recalculateTipotRows(tipotRows);
    }, []);

    const recalculateTipotRows = (rows: TipotRowType[]) => {
        const recalculatedTipotRows = calculateTransactions(rows);
        setTipotRows(recalculatedTipotRows);
    };

    const addEmptyTipotRow = () => {
        setTipotRows((prevRows) => [
            ...prevRows,
            { transactions: [], exchanges: [], user: undefined },
        ]);
    };

    const deleteTipotRow = (index: number) => {
        setTipotRows((prevRows) => [...prevRows].filter((_, i) => i !== index));
    };

    const handleUserSelection = (index: number, user: UserBase) => {
        setTipotRows((prevRows) => {
            let newRows = [...prevRows];
            newRows[index].user = user;
            return newRows;
        });
    };

    const addTransaction = (tipotRowIndex: number, transaction?: TransactionItem) => {
        let newRows = [...JSON.parse(JSON.stringify(tipotRows))];
        let oldTipotRow = newRows[tipotRowIndex];
        newRows[tipotRowIndex] = {
            ...oldTipotRow,
            transactions: [
                ...oldTipotRow.transactions,
                transaction || { value: 0, description: '' },
            ],
        };
        recalculateTipotRows(newRows);
    };

    const deleteTransaction = (tipotRowIndex: number, transactionIndex: number) => {
        let newRows = [...JSON.parse(JSON.stringify(tipotRows))];
        let oldTipotRow = newRows[tipotRowIndex];
        newRows[tipotRowIndex] = {
            ...oldTipotRow,
            transactions: [...oldTipotRow.transactions].filter((_, i) => i !== transactionIndex),
        };
        recalculateTipotRows(newRows);
    };

    const updateTransaction = (
        tipotRowIndex: number,
        transactionIndex: number,
        transaction: TransactionItem,
    ) => {
        let newRows = [...JSON.parse(JSON.stringify(tipotRows))];
        let oldTipotRow = newRows[tipotRowIndex];
        let newTransactions = [...oldTipotRow.transactions];
        newTransactions[transactionIndex] = transaction;
        newRows[tipotRowIndex] = {
            ...oldTipotRow,
            transactions: newTransactions,
        };
        recalculateTipotRows(newRows);
    };

    const handleSubmitTipot = async () => {
        try {
            const tipotRef = doc(db, `tipots/${tipot.id}`) as DocumentReference<Tipot>;
            await updateDoc(tipotRef, { tipotRows });
            navigate(-1);
        } catch (e) {
            console.warn(e);
        }
    };

    return (
        <div className='flex flex-col gap-8 h-full w-full'>
            <header className='flex flex-row items-center justify-center'>
                <div className='mr-auto'>
                    <GoBackButton />
                </div>
                <h2 className='mr-auto font-montserrat font-bold text-xl'>TIPOT DETAIL</h2>
            </header>
            <div className='md:m-auto flex flex-1 flex-col justify-center items-center w-full h-full'>
                <div className='flex flex-col gap-4 p-8 rounded-md bg-slate-300 relative shadow-xl h-full w-full md:w-5/6 2xl:w-4/6'>
                    <div className='flex flex-col sm:flex-row items-center justify-between'>
                        <h1 className='font-montserrat text-2xl font-medium pb-2'>{tipot.title}</h1>
                        <TipotDate timestamp={tipot.createdAt} />
                    </div>
                    {tipotRows.map((tipotRow, i) => (
                        <TipotRow
                            key={i}
                            tipotRow={tipotRow}
                            onDelete={() => deleteTipotRow(i)}
                            onUserSelection={(user: UserBase) => handleUserSelection(i, user)}
                            tipotRows={tipotRows}
                            addTransaction={(t) => addTransaction(i, t)}
                            deleteTransaction={(a) => deleteTransaction(i, a)}
                            updateTransaction={(a, b) => updateTransaction(i, a, b)}
                        />
                    ))}
                    <TipotRow onClick={addEmptyTipotRow} />
                    <TButton
                        onClick={handleSubmitTipot}
                        className='bg-primary hover:bg-primaryHover mx-auto py-2'>
                        <h3 className='text-textPrimary font-montserrat'>CONFIRM</h3>
                    </TButton>
                </div>
            </div>
        </div>
    );
}
