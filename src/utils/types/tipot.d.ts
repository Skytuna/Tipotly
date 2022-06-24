import { Timestamp } from 'firebase/firestore';
import { User, UserBase, UserId } from './user';

export interface Tipot {
    id: string;
    title: string;
    tipotRows?: TipotRow[];
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    rating?: number;
}

export interface TipotRow {
    user?: UserBase;
    transactions: TransactionItem[];
    exchanges: TransactionPay[];
}

export interface NewTipot {
    title: string;
}

export type TransactionActionType = 'INCREMENT' | 'DECREMENT';

export interface TransactionItem {
    description: string;
    value: number;
}

export interface TransactionPay {
    to: UserId;
    value: number;
}
export interface TipotTransactions {
    [userId: UserId]: { value: number; exchanges: TransactionPay[] };
}
