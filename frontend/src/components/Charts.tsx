import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction, Summary } from '../types';

interface Props { transactions: Transaction[]; summary: Summary | null; }
const COLORS = ['#6366f1','#22c55e','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#f97316','#64748b'];

export default function Charts({ transactions, summary }: Props) {
  const pieData = summary ? Object.entries(summary.by_category).map(([name, value]) => ({ name, value: Math.round(value) })) : [];
  const monthly: Record<string, { month: string; income: number; expenses: number }> = {};
  transactions.forEach(t => {
    const m = t.date.slice(0, 7);
    if (!monthly[m]) monthly[m] = { month: m, income: 0, expenses: 0 };
    if (t.type === 'income') monthly[m].income += t.amount;
    else monthly[m].expenses += t.amount;
  });
  const barData = Object.values(monthly).sort((a, b) => a.month.localeCompare(b.month)).slice(-6);
  return (
    <div className="charts">
      <div className="chart-card">
        <h3>Spending by Category</h3>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie><Tooltip formatter={(v: number) => `$${v}`} /></PieChart>
          </ResponsiveContainer>
        ) : <p className="no-data">No expense data</p>}
      </div>
      <div className="chart-card">
        <h3>Income vs Expenses</h3>
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}><XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip formatter={(v: number) => `$${v}`} /><Legend />
              <Bar dataKey="income" fill="#22c55e" name="Income" radius={[4,4,0,0]} /><Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <p className="no-data">No data</p>}
      </div>
    </div>
  );
}