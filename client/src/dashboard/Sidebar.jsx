import React from 'react';
import { FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa'; // 아이콘 라이브러리

function Sidebar({ activePage, onSelectPage }) { // activePage prop 추가
  return (
    <div className="sidebar">
      <button className={activePage === 'calendar' ? 'active' : ''} onClick={() => onSelectPage('calendar')}>
        <FaCalendarAlt /> 캘린더
      </button>
      <button className={activePage === 'accountBook' ? 'active' : ''} onClick={() => onSelectPage('accountBook')}>
        <FaMoneyBillWave /> 가계부
      </button>
      {/* ... 다른 메뉴 추가 가능 */}
    </div>
  );
}

export default Sidebar;