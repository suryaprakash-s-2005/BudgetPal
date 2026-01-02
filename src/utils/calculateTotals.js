export const calculateTotals = (transactions, month) => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
        if (month) {
            const transactionMonth = transaction.date.slice(0, 7);
            if (transactionMonth !== month) return;
        }

        const amount = Number(transaction.amount);
        if (transaction.type === 'income') {
            income += amount;
        } else if (transaction.type === 'expense') {
            expense += amount;
        }
    });

    return {
        income,
        expense,
        balance: income - expense,
    };
};
