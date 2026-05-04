import { useState } from 'react';
import { CATEGORIES } from '../utils/constants';
import { api } from '../api';

const DEFAULT = { title: '', amount: '', type: 'EXPENSE', category: 'Food', date: new Date().toISOString().split('T')[0], note: '' };

export default function AddTransactionForm({ month, year, onRefresh, onClose }) {
  const [form, setForm] = useState(DEFAULT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    setLoading(true);
    setError('');
    try {
      await api.createTransaction({ ...form, amount: parseFloat(form.amount) });
      await onRefresh();
      setForm(DEFAULT);
      onClose && onClose();
    } catch {
      setError('Failed to add transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>➕ Add Transaction</h2>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <div className="type-toggle">
              {['EXPENSE', 'INCOME'].map(t => (
                <button
                  key={t}
                  type="button"
                  className={`type-btn ${form.type === t ? 'active-' + t.toLowerCase() : ''}`}
                  onClick={() => { set('type', t); set('category', CATEGORIES[t][0]); }}
                >
                  {t === 'INCOME' ? '📈 Income' : '📉 Expense'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row two-col">
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-input"
              placeholder="e.g. Grocery Shopping"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              className="form-input"
              type="number"
              placeholder="0"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row two-col">
          <div className="form-group">
            <label>Category</label>
            <select className="form-input" value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES[form.type].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              className="form-input"
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Note (optional)</label>
          <input
            className="form-input"
            placeholder="Any note..."
            value={form.note}
            onChange={e => set('note', e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary full-width" disabled={loading}>
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
}
