import React from 'react';
import { TransactionFilters, Transaction } from '../types';

export function FilterBar({ filters, categories, onChange }: { filters: TransactionFilters; categories: string[]; onChange: (f: TransactionFilters) => void }) {
  const set = (k: keyof TransactionFilters, v: string) => onChange({ ...filters, [k]: v || undefined });
  return (
    <div className="filter-bar">
      <select value={filters.type || ''} onChange={e => set('type', e.target.value)}>
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={filters.category || ''} onChange={e => set('category', e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>
      <input type="date" value={filters.start_date || ''} onChange={e => set('start_date', e.target.value)} />
      <input type="date" value={filters.end_date || ''} onChange={e => set('end_date', e.target.value)} />
      <button onClick={() => onChange({})} className="btn-secondary">Clear</button>
    </div>
  );
}

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function TransactionTable({ transactions, onDelete }: { transactions: Transaction[]; onDelete: (id: number) => void }) {
  if (!transactions.length) return <div className="empty-state"><p>No transactions found.</p></div>;
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead><tr><th>Date</th><th>Title</th><th>Category</th><th>Type</th><th>Amount</th><th></th></tr></thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.title}{t.note && <span className="note"> · {t.note}</span>}</td>
              <td><span className="badge">{t.category}</span></td>
              <td><span className={`type-badge ${t.type}`}>{t.type}</span></td>
              <td className={`amount ${t.type}`}>{t.type === 'income' ? '+' : '-'}{fmt(t.amount)}</td>
              <td><button className="delete-btn" onClick={() => onDelete(t.id)}>✕</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}