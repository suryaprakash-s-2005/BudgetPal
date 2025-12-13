export const categories = {
    income: [
        { id: 'salary', name: 'Salary', color: '#10b981' }, // Green
        { id: 'freelance', name: 'Freelance', color: '#34d399' },
        { id: 'investments', name: 'Investments', color: '#6ee7b7' },
        { id: 'other-income', name: 'Other', color: '#a7f3d0' },
    ],
    expense: [
        { id: 'food', name: 'Food', color: '#f87171' }, // Red
        { id: 'rent', name: 'Rent', color: '#ef4444' },
        { id: 'transport', name: 'Transport', color: '#dc2626' },
        { id: 'entertainment', name: 'Entertainment', color: '#b91c1c' },
        { id: 'utilities', name: 'Utilities', color: '#991b1b' },
        { id: 'other-expense', name: 'Other', color: '#7f1d1d' },
    ],
};

export const allCategories = [...categories.income, ...categories.expense];
