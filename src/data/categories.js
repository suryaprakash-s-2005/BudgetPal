export const categories = {
    income: [
        { id: 'salary', name: 'Salary', color: '#10b981' },
        { id: 'freelance', name: 'Freelance', color: '#34d399' },
        { id: 'investments', name: 'Investments', color: '#6ee7b7' },
        { id: 'bonus', name: 'Bonus', color: '#059669' },
        { id: 'gift', name: 'Gift', color: '#06b6d4' },
        { id: 'other-income', name: 'Other', color: '#a7f3d0' },
    ],
    expense: [
        { id: 'food', name: 'Food', color: '#f87171' },
        { id: 'rent', name: 'Rent', color: '#ef4444' },
        { id: 'shopping', name: 'Shopping', color: '#ec4899' },
        { id: 'transport', name: 'Transport', color: '#dc2626' },
        { id: 'entertainment', name: 'Entertainment', color: '#b91c1c' },
        { id: 'health', name: 'Health', color: '#db2777' },
        { id: 'education', name: 'Education', color: '#9333ea' },
        { id: 'travel', name: 'Travel', color: '#f59e0b' },
        { id: 'subscriptions', name: 'Subscriptions', color: '#6366f1' },
        { id: 'utilities', name: 'Utilities', color: '#991b1b' },
        { id: 'other-expense', name: 'Other', color: '#7f1d1d' },
    ],
};

export const allCategories = [...categories.income, ...categories.expense];
