import React, { useState, useEffect } from 'react';
import { categories } from '../data/categories';
import { PlusCircle, Save } from 'lucide-react';

const TransactionForm = ({ onAddTransaction, editingTransaction, onUpdateTransaction, onCancelEdit }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // Populate form when editingTransaction changes
    useEffect(() => {
        if (editingTransaction) {
            setTitle(editingTransaction.title);
            setAmount(editingTransaction.amount);
            setType(editingTransaction.type);
            setCategory(editingTransaction.category);
            setDate(editingTransaction.date);
        } else {
            resetForm();
        }
    }, [editingTransaction]);

    const resetForm = () => {
        setTitle('');
        setAmount('');
        setType('expense');
        setCategory('');
        setDate(new Date().toISOString().split('T')[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount || !category || !date) return;

        const transactionData = {
            id: editingTransaction ? editingTransaction.id : crypto.randomUUID(),
            title,
            amount: parseFloat(amount),
            type,
            category,
            date,
        };

        if (editingTransaction) {
            onUpdateTransaction(transactionData);
        } else {
            onAddTransaction(transactionData);
        }
        resetForm();
    };

    const currentCategories = type === 'income' ? categories.income : categories.expense;

    return (
        <form onSubmit={handleSubmit} className="transaction-form card">
            <h3>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>

            <div className="form-group">
                <label>Type</label>
                <div className="type-toggle">
                    <button
                        type="button"
                        className={`type-btn ${type === 'income' ? 'active income' : ''}`}
                        onClick={() => { setType('income'); setCategory(''); }}
                    >
                        Income
                    </button>
                    <button
                        type="button"
                        className={`type-btn ${type === 'expense' ? 'active expense' : ''}`}
                        onClick={() => { setType('expense'); setCategory(''); }}
                    >
                        Expense
                    </button>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Salary, Rent"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        {currentCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-actions">
                {editingTransaction && (
                    <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
                        Cancel
                    </button>
                )}
                <button type="submit" className="btn btn-primary">
                    {editingTransaction ? <><Save size={18} /> Update</> : <><PlusCircle size={18} /> Add Transaction</>}
                </button>
            </div>
        </form>
    );
};

export default TransactionForm;
