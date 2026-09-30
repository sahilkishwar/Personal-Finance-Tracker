import { CATEGORY_COLORS, formatCurrency } from '../utils/constants';

export default function BudgetProgress({ budgets, transactions }) {
  // Calculate spending per category from expense transactions
  const spending = {};
  transactions
    .filter(t => t.type === 'EXPENSE')
    .forEach(t => {
      spending[t.category] = (spending[t.category] || 0) + t.amount;
    });

  return (
    <div className="budget-progress-section">
      <div className="section-header">
        <h2>Budget Progress</h2>
      </div>
      {budgets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎯</div>
          <p>No budgets set for this month</p>
        </div>
      ) : (
        <div className="budget-list">
          {budgets.map(b => {
            const bLimit = b.limit || b.limitAmount || 0;
            const spent = spending[b.category] || 0;
            const pct = bLimit > 0 ? Math.min((spent / bLimit) * 100, 100) : 0;
            const over = spent > bLimit;
            const color = CATEGORY_COLORS[b.category] || '#adb5bd';

            return (
              <div key={b.id} className="budget-item">
                <div className="budget-item-header">
                  <span className="budget-category">
                    <span className="budget-dot" style={{ backgroundColor: color }} />
                    {b.category}
                  </span>
                  <span className={`budget-amounts ${over ? 'over' : ''}`}>
                    {formatCurrency(spent)} / {formatCurrency(bLimit)}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${over ? 'over-budget' : ''}`}
                    style={{ width: `${pct}%`, backgroundColor: over ? '#f72585' : color }}
                  />
                </div>
                <div className="budget-footer">
                  <span className={over ? 'text-danger' : 'text-muted'}>
                    {over ? `⚠️ Over by ${formatCurrency(spent - bLimit)}` : `${formatCurrency(bLimit - spent)} remaining`}
                  </span>
                  <span className="budget-pct">{pct.toFixed(0)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
