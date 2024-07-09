import React, { useState, useEffect } from 'react';
import Sidebar from '../dashboard/Sidebar';
import Calendar from '../dashboard/Calendar';
import AccountBook from '../dashboard/AccountBook';
import MyPage from '../dashboard/MyPage';
import Dashboard from '../dashboard/DashboardPage';
import '../css/dashboard.css';


function BoardComponent() {   
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePage, setActivePage] = useState(localStorage.getItem('activePage') == null ? 'Dashboard' : localStorage.getItem('activePage'));
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    setDarkMode(savedDarkMode === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // 페이지 컴포넌트를 객체로 관리
  const pageComponents = {
    Dashboard,
    Calendar,
    AccountBook,
    MyPage,
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    localStorage.setItem('activePage', page);
  };

  return (
    <div className="dashboard">
      <Sidebar activePage={activePage} onSelectPage={handlePageChange}/>
      <div className="content">
        {/* 검색창과 시간 표시 */}
        <div className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="검색" />
            <button>검색</button>
          </div>
          <div className="current-time">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* 페이지 컴포넌트 동적 렌더링 */}
        {pageComponents[activePage] && React.createElement(pageComponents[activePage])}
      </div>
    </div>
  );
}

export default BoardComponent