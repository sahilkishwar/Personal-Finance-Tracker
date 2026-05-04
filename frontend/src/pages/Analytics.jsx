import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line,
} from 'recharts';
import { CATEGORY_COLORS, formatCurrency, MONTHS } from '../utils/constants';

export default function Analytics({ transactions, summary, month, year }) {
  // Expense by category pie data
  const expenseByCategory = {};
  transactions.filter(t => t.type === 'EXPENSE').forEach(t => {
    expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
  });
  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));

  // Income by category
  const incomeByCategory = {};
  transactions.filter(t => t.type === 'INCOME').forEach(t => {
    incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + t.amount;
  });
  const incomePieData = Object.entries(incomeByCategory).map(([name, value]) => ({ name, value }));

  // Daily spending bar chart
  const dailyMap = {};
  transactions.forEach(t => {
    const day = new Date(t.date).getDate();
    if (!dailyMap[day]) dailyMap[day] = { day, income: 0, expense: 0 };
    if (t.type === 'INCOME') dailyMap[day].income += t.amount;
    else dailyMap[day].expense += t.amount;
  });
  const dailyData = Object.values(dailyMap).sort((a, b) => a.day - b.day);

  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) => {
    if (percent < 0.05) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11}>{`${(percent * 100).toFixed(0)}%`}</text>;
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>📈 Analytics</h1>
        <p className="page-sub">{MONTHS[month - 1]} {year}</p>
      </div>

      <div className="analytics-grid">
        {/* Expense Breakdown */}
        <div className="chart-card">
          <h3>Expense Breakdown</h3>
          {pieData.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📊</div><p>No expense data</p></div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" labelLine={false} label={renderLabel}>
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#adb5bd'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ background: '#1a1a35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f0f0ff' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-legend">
                {pieData.map(d => (
                  <div key={d.name} className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: CATEGORY_COLORS[d.name] || '#adb5bd' }} />
                    <span>{d.name}</span>
                    <span className="legend-val">{formatCurrency(d.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Income Breakdown */}
        <div className="chart-card">
          <h3>Income Sources</h3>
          {incomePieData.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📊</div><p>No income data</p></div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={incomePieData} cx="50%" cy="50%" innerRadius={50} outerRadius={100} dataKey="value" labelLine={false} label={renderLabel}>
                    {incomePieData.map((entry) => (
                      <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#adb5bd'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ background: '#1a1a35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f0f0ff' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-legend">
                {incomePieData.map(d => (
                  <div key={d.name} className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: CATEGORY_COLORS[d.name] || '#adb5bd' }} />
                    <span>{d.name}</span>
                    <span className="legend-val">{formatCurrency(d.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Daily Cash Flow */}
        <div className="chart-card full-width">
          <h3>Daily Cash Flow</h3>
          {dailyData.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📉</div><p>No data for this month</p></div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dailyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: '#a0a0c0', fontSize: 12 }} label={{ value: 'Day', position: 'insideBottom', fill: '#a0a0c0' }} />
                <YAxis tick={{ fill: '#a0a0c0', fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ background: '#1a1a35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f0f0ff' }} />
                <Legend wrapperStyle={{ color: '#a0a0c0' }} />
                <Bar dataKey="income" name="Income" fill="#06d6a0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#f72585" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
