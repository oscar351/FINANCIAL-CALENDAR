import React, { useState, useEffect } from 'react';
import Sidebar from '../dashboard/Sidebar';
import Calendar from '../dashboard/Calendar';
import AccountBook from '../dashboard/AccountBook';
import MyPage from '../dashboard/MyPage';
import Dashboard from '../dashboard/DashboardPage';
import { logout } from "../apis/api/userManage"
import '../css/dashboard.css';
// const navigate = useNavigate();
function BoardComponent() {   
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePage, setActivePage] = useState('Dashboard'); // 초기 페이지: 캘린더

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 해제
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="dashboard">
    <Sidebar activePage={activePage} onSelectPage={handlePageChange} /> {/* activePage 전달 */}
    <div className="content">
      <div className="top-bar"> {/* 검색창과 시간을 담을 top-bar 추가 */}
        <div className="search-bar">
          <input type="text" placeholder="검색" />
          <button>검색</button>
        </div>
        <div className="current-time">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {activePage === 'MyPage' && <MyPage />}
      {activePage === 'Dashboard' && <Dashboard />}
      {activePage === 'calendar' && <Calendar />}
      {activePage === 'accountBook' && <AccountBook />}
      
    </div>
  </div>
  );
}

export default BoardComponent