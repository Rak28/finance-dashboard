import React, { useState, useEffect, useCallback } from 'react';
import { Transaction, Summary, TransactionFilters } from './types';
import { api } from './utils/api';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionTable, { FilterBar } from './components/TransactionTable';
import Charts from './components/Charts';
import './App.css';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions'>('dashboard');

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [txns, sum, cats] = await Promise.all([api.getTransactions(filters), api.getSummary(), api.getCategories()]);
      setTransactions(txns); setSummary(sum); setCategories(cats);
    } finally { setLoading(false); }
  }, [filters]);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left"><span className="logo">💰</span><h1>Finance Dashboard</h1></div>
        <div className="header-right">
          <nav>
            <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
            <button className={activeTab === 'transactions' ? 'active' : ''} onClick={() => setActiveTab('transactions')}>Transactions</button>
          </nav>
          <button className="btn-primary" onClick={() => setShowForm(true)}>+ Add</button>
          <button className="btn-secondary" onClick={async () => { await api.seed(); refresh(); }}>Load Demo Data</button>
        </div>
      </header>
      <main className="app-main">
        {loading && <div className="loading-bar" />}
        {activeTab === 'dashboard' && (
          <>
            {summary && <SummaryCards summary={summary} />}
            {transactions.length > 0 && <Charts transactions={transactions} summary={summary} />}
            {transactions.length === 0 && !loading && <div className="empty-state"><p>No transactions yet.</p><button className="btn-primary" onClick={async () => { await api.seed(); refresh(); }}>Load demo data</button></div>}
          </>
        )}
        {activeTab === 'transactions' && (
          <><FilterBar filters={filters} categories={categories} onChange={setFilters} /><TransactionTable transactions={transactions} onDelete={async (id) => { await api.deleteTransaction(id); refresh(); }} /></>
        )}
      </main>
      {showForm && <TransactionForm categories={categories} onSubmit={async (t) => { await api.addTransaction(t); setShowForm(false); refresh(); }} onClose={() => setShowForm(false)} />}
    </div>
  );
}