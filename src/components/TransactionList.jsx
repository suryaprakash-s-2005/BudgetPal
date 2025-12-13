import React from 'react';
import { allCategories } from '../data/categories';
import { Trash2, Edit2, TrendingUp, TrendingDown } from 'lucide-react';

const TransactionList = ({ transactions, onDeleteTransaction, onEditTransaction }) => {
    const getCategoryName = (id) => {
        const cat = allCategories.find((c) => c.id === id);
        return cat ? cat.name : id;
    };

    const getCategoryColor = (id) => {
        const cat = allCategories.find((c) => c.id === id);
        return cat ? cat.color : '#ccc';
    };

    if (transactions.length === 0) {
        return (
            <div className="transaction-list empty card">
                <p>No transactions found.</p>
            </div>
        );
    }

    return (
        <div className="transaction-list card">
            <h3>Recent Transactions</h3>
            <ul>
                {transactions.map((t) => (
                    <li key={t.id} className="transaction-item">
                        <div className="transaction-icon" style={{ backgroundColor: getCategoryColor(t.category) + '20', color: getCategoryColor(t.category) }}>
                            {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                        </div>
                        <div className="transaction-info">
                            <span className="transaction-title">{t.title}</span>
                            <span className="transaction-meta">
                                {getCategoryName(t.category)} • {t.date}
                            </span>
                        </div>
                        <div className="transaction-amount-actions">
                            <span className={`transaction-amount ${t.type}`}>
                                {t.type === 'income' ? '+' : '-'}₹{t.amount.toFixed(2)}
                            </span>
                            <div className="actions">
                                <button
                                    onClick={() => onEditTransaction(t)}
                                    className="icon-btn edit"
                                    aria-label="Edit"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => onDeleteTransaction(t.id)}
                                    className="icon-btn delete"
                                    aria-label="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
