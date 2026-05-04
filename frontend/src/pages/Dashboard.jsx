import SummaryCards from '../components/SummaryCards';
import BudgetProgress from '../components/BudgetProgress';
import AddTransactionForm from '../components/AddTransactionForm';
import { formatCurrency, formatDate, CATEGORY_COLORS, MONTHS } from '../utils/constants';

export default function Dashboard({ summary, transactions, budgets, month, year, refresh, loading }) {
  const recent = transactions.slice(0, 5);

  return (
    <div className="page">
      <div className="page-header">
        <h1>📊 Dashboard</h1>
        <p className="page-sub">{MONTHS[month - 1]} {year} overview</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading your finances...</p>
        </div>
      ) : (
        <>
          <SummaryCards summary={summary} />

          <div className="dashboard-grid">
            <div className="dashboard-main">
              {/* Recent Transactions */}
              <div className="widget">
                <div className="widget-header">
                  <h3>Recent Transactions</h3>
                </div>
                {recent.length === 0 ? (
                  <div className="empty-state"><div className="empty-icon">📭</div><p>No transactions yet</p></div>
                ) : (
                  <div className="tx-list">
                    {recent.map(tx => (
                      <div key={tx.id} className="tx-item">
                        <div className="tx-dot" style={{ backgroundColor: CATEGORY_COLORS[tx.category] || '#adb5bd' }} />
                        <div className="tx-info">
                          <span className="tx-title">{tx.title}</span>
                          <span className="tx-meta">{tx.category} · {formatDate(tx.date)}</span>
                        </div>
                        <span className={`tx-amount ${tx.type === 'INCOME' ? 'income' : 'expense'}`}>
                          {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <BudgetProgress budgets={budgets} transactions={transactions} />
            </div>

            <div className="dashboard-side">
              <AddTransactionForm month={month} year={year} onRefresh={refresh} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
