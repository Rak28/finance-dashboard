export interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
  note?: string;
  created_at: string;
}

export interface Summary {
  total_income: number;
  total_expenses: number;
  balance: number;
  by_category: Record<string, number>;
  transaction_count: number;
}

export interface TransactionFilters {
  category?: string;
  type?: string;
  start_date?: string;
  end_date?: string;
}

export interface NewTransaction {
  title: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
  note?: string;
}