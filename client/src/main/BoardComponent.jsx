import React, { useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import Calendar from '../dashboard/Calendar';
import AccountBook from '../dashboard/AccountBook';
import '../css/dashboard.css';
function BoardComponent() {   
  const [activePage, setActivePage] = useState('calendar'); // 초기 페이지: 캘린더

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="dashboard">
    <Sidebar activePage={activePage} onSelectPage={handlePageChange} /> {/* activePage 전달 */}
    <div className="content">
      {activePage === 'calendar' && <Calendar />}
      {activePage === 'accountBook' && <AccountBook />}
    </div>
  </div>
  );
}

export default BoardComponent