/**
 * Calculates total income, expense and balance from a list of transactions.
 * Optionally filters by month (YYYY-MM).
 * 
 * @param {Array} transactions - List of transaction objects
 * @param {string} [month] - Month string in "YYYY-MM" format to filter by.
 * @returns {Object} { income, expense, balance }
 */
export const calculateTotals = (transactions, month) => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
        // If month is provided, filter by it
        if (month) {
            const transactionMonth = transaction.date.slice(0, 7); // "YYYY-MM-DD" -> "YYYY-MM"
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
