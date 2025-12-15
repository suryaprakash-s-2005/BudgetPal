import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateTotals } from './utils/calculateTotals';
import { categories, allCategories } from './data/categories';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCards from './components/SummaryCards';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

import { Moon, Sun } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [theme, setTheme] = useLocalStorage('theme', 'dark');


  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);



  const toggleTheme = useCallback(() => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  // Handlers
  const addTransaction = useCallback((transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  }, [setTransactions]);

  const updateTransaction = useCallback((updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    setEditingTransaction(null);
  }, [setTransactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (editingTransaction && editingTransaction.id === id) {
      setEditingTransaction(null);
    }
  }, [setTransactions, editingTransaction]);

  const startEditing = useCallback((transaction) => {
    setEditingTransaction(transaction);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingTransaction(null);
  }, []);

  // Derived State
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => t.date.startsWith(currentMonth));
  }, [transactions, currentMonth]);

  const totals = useMemo(() => {
    return calculateTotals(filteredTransactions);
  }, [filteredTransactions]);

  const pieChartData = useMemo(() => {
    const expenses = filteredTransactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, curr) => {
      const cat = allCategories.find(c => c.id === curr.category);
      const name = cat ? cat.name : curr.category;
      const color = cat ? cat.color : '#ccc';

      if (!acc[name]) {
        acc[name] = { name, value: 0, color };
      }
      acc[name].value += curr.amount;
      return acc;
    }, {});
    return Object.values(grouped);
  }, [filteredTransactions]);

  const barChartData = useMemo(() => {
    // Show last 6 months trend ideally
    // Group all transactions by month
    const groups = transactions.reduce((acc, curr) => {
      const month = curr.date.slice(0, 7);
      if (!acc[month]) {
        acc[month] = { name: month, income: 0, expense: 0 };
      }
      if (curr.type === 'income') acc[month].income += curr.amount;
      else acc[month].expense += curr.amount;
      return acc;
    }, {});

    // Sort by month
    const sortedMonths = Object.keys(groups).sort();
    // Take last 6
    const last6 = sortedMonths.slice(-6);
    return last6.map(m => groups[m]);
  }, [transactions]);

  const availableMonths = useMemo(() => {
    const months = new Set(transactions.map((t) => t.date.slice(0, 7)));
    // Ensure current month is always available
    months.add(new Date().toISOString().slice(0, 7));
    return Array.from(months).sort().reverse();
  }, [transactions]);



  return (
    <div className="container">
      <header className="app-header">
        <div className="app-logo">
          <h1><span className="gradient-text">BudgetPal</span> 🪙</h1>
          <p className="slogan">Helping you look responsible, digitally. 😉📈💻</p>
        </div>
        <div className="header-controls">
          <div className="month-filter">
            <select
              id="month-select"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(e.target.value)}
              aria-label="Filter by month"
            >
              {availableMonths.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="summary-section">
          <SummaryCards {...totals} />
        </section>

        <section className="main-content">
          <div className="left-column">
            <TransactionForm
              onAddTransaction={addTransaction}
              editingTransaction={editingTransaction}
              onUpdateTransaction={updateTransaction}
              onCancelEdit={cancelEdit}
            />
            <TransactionList
              transactions={filteredTransactions}
              onDeleteTransaction={deleteTransaction}
              onEditTransaction={startEditing}
            />
          </div>

          <div className="right-column">
            <BarChart data={barChartData} />
            <PieChart data={pieChartData} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
