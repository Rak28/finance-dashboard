import React from 'react';
import { Summary } from '../types';

interface Props { summary: Summary; }

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function SummaryCards({ summary }: Props) {
  return (
    <div className="summary-cards">
      <div className="card card-income">
        <div className="card-label">Total Income</div>
        <div className="card-value">{fmt(summary.total_income)}</div>
      </div>
      <div className="card card-expense">
        <div className="card-label">Total Expenses</div>
        <div className="card-value">{fmt(summary.total_expenses)}</div>
      </div>
      <div className={`card ${summary.balance >= 0 ? 'card-balance-pos' : 'card-balance-neg'}`}>
        <div className="card-label">Balance</div>
        <div className="card-value">{fmt(summary.balance)}</div>
      </div>
      <div className="card card-count">
        <div className="card-label">Transactions</div>
        <div className="card-value">{summary.transaction_count}</div>
      </div>
    </div>
  );
}