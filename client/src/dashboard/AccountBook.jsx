import React, { useState, useEffect } from 'react';
import '../css/AccountBook.css';
import AccountBookStats from './AccountBookStats';
import AccountBookView from './AccountBookView';

import Chart from './Chart'; // 차트 컴포넌트
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts 라이브러리 import

function AccountBook() {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("AccountBookTab") == null ? 'view' : localStorage.getItem("AccountBookTab")); // 초기 탭: 입력

  const handleTabClick = (tab) => {
    localStorage.setItem("AccountBookTab", tab);
    console.log(localStorage.getItem("AccountBookTab"));
    setActiveTab(tab);
  };

  return (
    <div className="account-book-content">
      <div className="tab-bar">
        <button className={activeTab === 'view' ? 'active' : ''} onClick={() => handleTabClick('view')}>
          입력 / 조회
        </button>
        <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => handleTabClick('stats')}>
          통계
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'view' && <AccountBookView />}
        {activeTab === 'stats' && <AccountBookStats />}
      </div>
    </div>
  );
}

export default AccountBook;