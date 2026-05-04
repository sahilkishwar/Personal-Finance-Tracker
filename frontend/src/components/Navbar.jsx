import { MONTHS } from '../utils/constants';

export default function Navbar({ page, setPage, month, year, setMonth, setYear }) {
  const years = [year - 1, year, year + 1];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-icon">💰</span>
          <span className="brand-name">FinanceTracker</span>
        </div>

        <div className="month-selector">
          <select value={month} onChange={e => setMonth(Number(e.target.value))} className="select-pill">
            {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
          <select value={year} onChange={e => setYear(Number(e.target.value))} className="select-pill">
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="navbar-links">
          {['dashboard', 'transactions', 'budgets', 'analytics'].map(p => (
            <button
              key={p}
              className={`nav-link ${page === p ? 'active' : ''}`}
              onClick={() => setPage(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
