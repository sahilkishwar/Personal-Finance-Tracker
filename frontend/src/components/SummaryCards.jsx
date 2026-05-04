import { formatCurrency } from '../utils/constants';

export default function SummaryCards({ summary }) {
  const savings = summary.income > 0 ? ((summary.balance / summary.income) * 100).toFixed(1) : 0;

  const cards = [
    {
      label: 'Total Income',
      value: formatCurrency(summary.income),
      icon: '📈',
      color: 'card-income',
      sub: 'This month',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(summary.expense),
      icon: '📉',
      color: 'card-expense',
      sub: 'This month',
    },
    {
      label: 'Net Balance',
      value: formatCurrency(summary.balance),
      icon: '💼',
      color: summary.balance >= 0 ? 'card-balance-pos' : 'card-balance-neg',
      sub: summary.balance >= 0 ? 'You are saving!' : 'Over budget',
    },
    {
      label: 'Savings Rate',
      value: `${savings}%`,
      icon: '🎯',
      color: 'card-savings',
      sub: 'Of income saved',
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, i) => (
        <div key={i} className={`summary-card ${card.color}`}>
          <div className="card-icon">{card.icon}</div>
          <div className="card-content">
            <p className="card-label">{card.label}</p>
            <p className="card-value">{card.value}</p>
            <p className="card-sub">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
