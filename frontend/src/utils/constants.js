export const CATEGORIES = {
  EXPENSE: ['Food', 'Housing', 'Transport', 'Health', 'Entertainment', 'Education', 'Utilities', 'Shopping', 'Other'],
  INCOME: ['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other'],
};

export const CATEGORY_COLORS = {
  Food: '#f72585',
  Housing: '#7209b7',
  Transport: '#3a0ca3',
  Health: '#4361ee',
  Entertainment: '#4cc9f0',
  Education: '#2ec4b6',
  Utilities: '#e9c46a',
  Shopping: '#f4a261',
  Salary: '#06d6a0',
  Freelance: '#118ab2',
  Investment: '#ffd166',
  Business: '#9d4edd',
  Gift: '#ff6b6b',
  Other: '#adb5bd',
};

export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export function formatCurrency(amount) {
  const num = typeof amount === 'number' && !isNaN(amount) ? amount : (Number(amount) || 0);
  return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
