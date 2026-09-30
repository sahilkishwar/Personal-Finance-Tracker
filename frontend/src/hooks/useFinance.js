import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';

export function useFinance() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [txs, buds, sum] = await Promise.all([
        api.getTransactionsByMonth(month, year),
        api.getBudgets(month, year),
        api.getSummary(month, year),
      ]);
      setTransactions(txs);
      setBudgets(buds);
      setSummary(sum);
    } catch {
      setError('Cannot connect to backend. Make sure Spring Boot is running on port 8083.');
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => { load(); }, [load]);

  return { transactions, budgets, summary, loading, error, month, year, setMonth, setYear, refresh: load };
}
