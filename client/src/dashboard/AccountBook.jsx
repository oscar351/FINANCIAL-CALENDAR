import React, { useState, useEffect } from 'react';
import '../css/AccountBook.css';
import Chart from './Chart'; // 차트 컴포넌트
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts 라이브러리 import

function AccountBook() {
  const [data, setData] = useState([]); // 가계부 데이터

  useEffect(() => {
    // TODO: 실제 데이터 가져오는 로직 구현
    setData([
      { date: '2024-05-01', 수입: 500000, 지출: 150000 },
      { date: '2024-05-05', 수입: 0, 지출: 50000 },
      { date: '2024-05-10', 수입: 200000, 지출: 80000 },
      { date: '2024-05-15', 수입: 0, 지출: 30000 },
      { date: '2024-05-20', 수입: 100000, 지출: 60000 },
      { date: '2024-05-25', 수입: 0, 지출: 20000 },
      { date: '2024-05-30', 수입: 300000, 지출: 100000 },
    ]);
  }, []);

  const totalIncome = data.reduce((sum, item) => sum + item.수입, 0);
  const totalExpense = data.reduce((sum, item) => sum + item.지출, 0);

  return (
    <div className="account-book-content">
      <div className="summary-section">
        <div className="summary-card">
          <h3>이번 달 수입</h3>
          <p>{totalIncome.toLocaleString()}원</p>
        </div>
        <div className="summary-card">
          <h3>이번 달 지출</h3>
          <p>{totalExpense.toLocaleString()}원</p>
        </div>
      </div>
      <div className="chart-section">
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="수입" stroke="#8884d8" />
          <Line type="monotone" dataKey="지출" stroke="#82ca9d" />
        </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="detail-section">
        {/* TODO: 상세 내역 테이블 또는 리스트 구현 */}
      </div>
    </div>
  );
}

export default AccountBook;