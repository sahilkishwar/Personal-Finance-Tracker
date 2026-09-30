const BASE = 'http://localhost:8083/api';

const get = (url) => fetch(BASE + url).then(r => r.json());
const post = (url, body) => fetch(BASE + url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json());
const put = (url, body) => fetch(BASE + url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json());
const del = (url) => fetch(BASE + url, { method: 'DELETE' });

export const api = {
  // Transactions
  getTransactions: () => get('/transactions'),
  getTransactionsByMonth: (month, year) => get(`/transactions/month?month=${month}&year=${year}`),
  getSummary: (month, year) => get(`/transactions/summary?month=${month}&year=${year}`),
  createTransaction: (t) => post('/transactions', t),
  updateTransaction: (id, t) => put(`/transactions/${id}`, t),
  deleteTransaction: (id) => del(`/transactions/${id}`),

  // Budgets
  getBudgets: (month, year) => get(`/budgets?month=${month}&year=${year}`),
  createBudget: (b) => post('/budgets', b),
  updateBudget: (id, b) => put(`/budgets/${id}`, b),
  deleteBudget: (id) => del(`/budgets/${id}`),
};
