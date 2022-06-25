import { TipotRow, TipotTransactions } from '@utils/types/tipot';
import { UserId } from '@utils/types/user';

export function findAverageTransaction(tipotRows: TipotRow[]): number {
    // Total sum of all transactions
    let transactionSum = 0;

    // Count of transactions for tipot
    let transactionCount = 0;

    // Calculate transaction sum
    for (const tipotRow of tipotRows) {
        transactionCount++;
        for (const transaction of tipotRow.transactions) transactionSum += transaction.value;
    }

    // Aim value to achieve. All users must have this outcome at the end of calculation.
    const averageTransaction = transactionSum / transactionCount;

    return Math.round(averageTransaction);
}

export function calcTransactionSums(tipotRows: TipotRow[]): TipotTransactions {
    let initialTransactionSums: TipotTransactions = {};

    for (const { user, transactions } of tipotRows) {
        const transactionSum = transactions
            .map((t) => t.value)
            .reduce((sum, transaction) => sum + transaction, 0);
        initialTransactionSums[user!.id] = { exchanges: [], value: transactionSum };
    }

    return initialTransactionSums;
}

export function isAllUsersEqual(transactionSums: TipotTransactions, average: number): boolean {
    for (const { value } of Object.values(transactionSums)) {
        const isInRangeOne = average === value || average === value + 1 || average === value - 1;
        if (!isInRangeOne) return false;
    }
    return true;
}

export function calculateTransactions(oldTipotRows: TipotRow[]): TipotRow[] {
    let transactionSums = calcTransactionSums(oldTipotRows);
    const averageValue = findAverageTransaction(oldTipotRows);

    if (!averageValue) return oldTipotRows;

    while (true) {
        if (isAllUsersEqual(transactionSums, averageValue)) break;

        let lowestPayUserId: UserId = '';
        let highestPayUserId: UserId = '';

        // Determine hightest and lower paid users
        for (const [userId, { value }] of Object.entries(transactionSums)) {
            if (!lowestPayUserId || transactionSums[lowestPayUserId].value < value)
                lowestPayUserId = userId;
            if (!highestPayUserId || transactionSums[highestPayUserId].value > value)
                highestPayUserId = userId;
        }

        if (lowestPayUserId === highestPayUserId) continue;

        // Make the user that paid lowest pay to user that paid highest so that they will both get closer to average transaction value
        const transferAmount = Math.abs(averageValue - transactionSums[lowestPayUserId].value);
        transactionSums[lowestPayUserId].value -= transferAmount;
        transactionSums[highestPayUserId].value += transferAmount;
        transactionSums[lowestPayUserId].exchanges.push({
            to: highestPayUserId,
            value: transferAmount,
        });
    }

    // Copy old tipot rows without modifying old array
    let newTipotRows: TipotRow[] = [...JSON.parse(JSON.stringify(oldTipotRows))];

    return newTipotRows.map((tipotRow) => ({
        ...tipotRow,
        exchanges: transactionSums[tipotRow.user?.id!].exchanges,
    }));
}
