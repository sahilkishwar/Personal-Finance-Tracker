import { useState } from 'react';
import { CATEGORIES, CATEGORY_COLORS, formatCurrency } from '../utils/constants';
import { api } from '../api';
import BudgetProgress from '../components/BudgetProgress';

export default function Budgets({ budgets, transactions, month, year, refresh }) {
  const [form, setForm] = useState({ category: 'Food', limit: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.limit) return;
    setLoading(true);
    setError('');
    try {
      await api.createBudget({ ...form, limit: parseFloat(form.limit), month, year });
      await refresh();
      setForm({ category: 'Food', limit: '' });
    } catch {
      setError('Failed to add budget.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await api.deleteBudget(id);
    await refresh();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>🎯 Budgets</h1>
        <p className="page-sub">Set spending limits for each category</p>
      </div>

      <div className="budget-page-grid">
        <div className="budget-page-main">
          <BudgetProgress budgets={budgets} transactions={transactions} />

          {budgets.length > 0 && (
            <div className="widget" style={{ marginTop: '24px' }}>
              <div className="widget-header"><h3>Manage Budgets</h3></div>
              <div className="budget-manage-list">
                {budgets.map(b => (
                  <div key={b.id} className="budget-manage-item">
                    <span className="budget-dot" style={{ backgroundColor: CATEGORY_COLORS[b.category] || '#adb5bd' }} />
                    <span>{b.category}</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--accent-green)' }}>{formatCurrency(b.limit || b.limitAmount || 0)}</span>
                    <button className="tx-delete" onClick={() => handleDelete(b.id)} title="Delete">🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="budget-page-side">
          <div className="form-card">
            <h2>➕ Set Budget</h2>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-input"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  {CATEGORIES.EXPENSE.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Monthly Limit (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="e.g. 5000"
                  min="0"
                  value={form.limit}
                  onChange={e => setForm(f => ({ ...f, limit: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="btn-primary full-width" disabled={loading}>
                {loading ? 'Saving...' : 'Set Budget'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
