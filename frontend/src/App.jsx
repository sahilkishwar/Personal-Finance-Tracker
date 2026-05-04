import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Analytics from './pages/Analytics';
import { useFinance } from './hooks/useFinance';
import './App.css';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const finance = useFinance();

  const renderPage = () => {
    switch (page) {
      case 'transactions': return <Transactions {...finance} />;
      case 'budgets': return <Budgets {...finance} />;
      case 'analytics': return <Analytics {...finance} />;
      default: return <Dashboard {...finance} />;
    }
  };

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} month={finance.month} year={finance.year} setMonth={finance.setMonth} setYear={finance.setYear} />
      <main className="main-content">
        {finance.error && (
          <div className="global-error">
            ⚠️ {finance.error}
          </div>
        )}
        {renderPage()}
      </main>
      <footer className="footer">
        <p>💰 FinanceTracker · Track smarter, save better</p>
      </footer>
    </div>
  );
}
