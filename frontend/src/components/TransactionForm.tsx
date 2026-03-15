import React, { useState } from 'react';
import { NewTransaction } from '../types';

interface Props { categories: string[]; onSubmit: (t: NewTransaction) => void; onClose: () => void; }

export default function TransactionForm({ categories, onSubmit, onClose }: Props) {
  const [form, setForm] = useState<NewTransaction>({ title: '', amount: 0, category: categories[0] || '', type: 'expense', date: new Date().toISOString().split('T')[0], note: '' });
  const set = (k: keyof NewTransaction, v: any) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!form.title || !form.amount) return; onSubmit({ ...form, amount: Number(form.amount) }); };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header"><h2>Add Transaction</h2><button onClick={onClose}>✕</button></div>
        <form onSubmit={handleSubmit} className="form">
          <label>Title <input value={form.title} onChange={e => set('title', e.target.value)} required placeholder="e.g. Groceries" /></label>
          <label>Amount ($) <input type="number" min="0.01" step="0.01" value={form.amount || ''} onChange={e => set('amount', e.target.value)} required /></label>
          <div className="form-row">
            <label>Type <select value={form.type} onChange={e => set('type', e.target.value)}><option value="expense">Expense</option><option value="income">Income</option></select></label>
            <label>Category <select value={form.category} onChange={e => set('category', e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
          </div>
          <label>Date <input type="date" value={form.date} onChange={e => set('date', e.target.value)} required /></label>
          <label>Note <input value={form.note} onChange={e => set('note', e.target.value)} placeholder="Optional" /></label>
          <div className="form-actions"><button type="button" onClick={onClose} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Add Transaction</button></div>
        </form>
      </div>
    </div>
  );
}