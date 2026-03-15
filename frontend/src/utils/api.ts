import axios from 'axios';
import { Transaction, Summary, TransactionFilters, NewTransaction } from '../types';

const BASE = '/api';

export const api = {
  getTransactions: async (filters?: TransactionFilters): Promise<Transaction[]> => {
    const { data } = await axios.get(`${BASE}/transactions`, { params: filters });
    return data;
  },
  addTransaction: async (t: NewTransaction): Promise<Transaction> => {
    const { data } = await axios.post(`${BASE}/transactions`, t);
    return data;
  },
  deleteTransaction: async (id: number): Promise<void> => {
    await axios.delete(`${BASE}/transactions/${id}`);
  },
  getSummary: async (): Promise<Summary> => {
    const { data } = await axios.get(`${BASE}/summary`);
    return data;
  },
  getCategories: async (): Promise<string[]> => {
    const { data } = await axios.get(`${BASE}/categories`);
    return data;
  },
  seed: async (): Promise<void> => {
    await axios.post(`${BASE}/seed`);
  }
};