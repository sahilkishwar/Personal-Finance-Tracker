import { useState } from 'react';
import { CATEGORIES, CATEGORY_COLORS, formatCurrency, formatDate } from '../utils/constants';
import { api } from '../api';

export default function TransactionList({ transactions, onRefresh }) {
  const [filter, setFilter] = useState('ALL');
  const [deleting, setDeleting] = useState(null);

  const filtered = filter === 'ALL' ? transactions : transactions.filter(t => t.type === filter);

  const handleDelete = async (id) => {
    setDeleting(id);
    await api.deleteTransaction(id);
    await onRefresh();
    setDeleting(null);
  };

  return (
    <div className="tx-list-section">
      <div className="section-header">
        <h2>Transactions</h2>
        <div className="filter-tabs">
          {['ALL', 'INCOME', 'EXPENSE'].map(f => (
            <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No transactions found</p>
        </div>
      ) : (
        <div className="tx-list">
          {filtered.map(tx => (
            <div key={tx.id} className="tx-item">
              <div className="tx-dot" style={{ backgroundColor: CATEGORY_COLORS[tx.category] || '#adb5bd' }} />
              <div className="tx-info">
                <span className="tx-title">{tx.title}</span>
                <span className="tx-meta">{tx.category} · {formatDate(tx.date)}</span>
              </div>
              {tx.note && <span className="tx-note" title={tx.note}>📝</span>}
              <span className={`tx-amount ${tx.type === 'INCOME' ? 'income' : 'expense'}`}>
                {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
              </span>
              <button
                className="tx-delete"
                onClick={() => handleDelete(tx.id)}
                disabled={deleting === tx.id}
                title="Delete"
              >
                {deleting === tx.id ? '...' : '🗑️'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
