import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    // TODO: 서버에서 최근 거래 내역, 예정된 일정, 요약 정보 가져오는 로직 구현
    setRecentTransactions([
      { date: '2024-06-05', category: '식비', amount: -25000 },
      { date: '2024-06-04', category: '교통비', amount: -5000 },
      { date: '2024-06-03', category: '월급', amount: 3000000 },
      // ...
    ]);

    setUpcomingEvents([
      { date: '2024-06-10', title: '팀 회의' },
      { date: '2024-06-15', title: '생일' },
      // ...
    ]);

    setSummary({
      totalIncome: 3500000,
      totalExpense: 300000,
      balance: 3200000,
    });
  }, []);

  return (
    <div className="dashboard-content">
      <div className="summary-section">
        <div className="summary-card income">
          <h3>총 수입</h3>
          <p>{summary.totalIncome.toLocaleString()}원</p>
        </div>
        <div className="summary-card expense">
          <h3>총 지출</h3>
          <p>{summary.totalExpense.toLocaleString()}원</p>
        </div>
        <div className="summary-card balance">
          <h3>잔액</h3>
          <p>{summary.balance.toLocaleString()}원</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>이번 달 지출</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={recentTransactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="recent-events-section">
        <h3>최근 거래 내역</h3>
        <ul>
          {recentTransactions.map((transaction, index) => (
            <li key={index}>
              {transaction.date} - {transaction.category}: {transaction.amount.toLocaleString()}원
            </li>
          ))}
        </ul>
      </div>

      <div className="upcoming-events-section">
        <h3>예정된 일정</h3>
        <ul>
          {upcomingEvents.map((event, index) => (
            <li key={index}>
              {event.date} - {event.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;