import React from 'react';

const SummaryCards = ({ income, expense, balance }) => {
    return (
        <div className="summary-cards">
            <div className="card income">
                <h3>Income 💰</h3>
                <p className="amount positive">+₹{income.toFixed(2)}</p>
            </div>
            <div className="card expense">
                <h3>Expenses 💸</h3>
                <p className="amount negative">-₹{expense.toFixed(2)}</p>
            </div>
            <div className="card balance">
                <h3>Balance 🏦</h3>
                <p className={`amount ${balance >= 0 ? 'positive' : 'negative'}`}>
                    ₹{balance.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default SummaryCards;
