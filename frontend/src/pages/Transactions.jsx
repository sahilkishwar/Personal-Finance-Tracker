import TransactionList from '../components/TransactionList';
import AddTransactionForm from '../components/AddTransactionForm';
import { MONTHS } from '../utils/constants';

export default function Transactions({ transactions, month, year, refresh }) {
  return (
    <div className="page">
      <div className="page-header">
        <h1>💳 Transactions</h1>
        <p className="page-sub">{MONTHS[month - 1]} {year}</p>
      </div>

      <div className="tx-page-grid">
        <div className="tx-page-main">
          <TransactionList transactions={transactions} onRefresh={refresh} />
        </div>
        <div className="tx-page-side">
          <AddTransactionForm month={month} year={year} onRefresh={refresh} />
        </div>
      </div>
    </div>
  );
}
