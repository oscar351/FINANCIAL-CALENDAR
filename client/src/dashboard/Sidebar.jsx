import React, { useState } from 'react';
import {
  FaHome, FaMoneyBillWave, FaCalendarAlt, FaChartBar, FaCog, FaUser,
  FaSignOutAlt, FaChevronDown, FaPiggyBank, FaBullseye, FaShareAlt, FaQuestionCircle, FaBell
} from 'react-icons/fa';
import profileImage from '../assets/images/profile.png';

function Sidebar({ activePage, onSelectPage }) { // activePage prop 추가
  const [isAccountBookMenuOpen, setIsAccountBookMenuOpen] = useState(false);
  const [isCalendarMenuOpen, setIsCalendarMenuOpen] = useState(false);
  const [isReportMenuOpen, setIsReportMenuOpen] = useState(false);

  const handleSubMenuClick = (page, e) => {
    e.stopPropagation();
    onSelectPage(page);
  };

  const toggleSubMenu = (menu) => {
    if (menu === 'accountBook') {
      setIsAccountBookMenuOpen(!isAccountBookMenuOpen);
    } else if (menu === 'calendar') {
      setIsCalendarMenuOpen(!isCalendarMenuOpen);
    } else if (menu === 'report'){
      setIsReportMenuOpen(!isReportMenuOpen)
    }
  };

  const handleLogout = () => {
    sessionStorage.setItem("accessToken", "");
    sessionStorage.setItem("refreshToken", "");
    window.location.href="/";
  };
  
  return (
    <div className="sidebar">
      <div className={activePage === 'MyPage' ? 'profile active' : 'profile'} onClick={() => onSelectPage('MyPage')}>
        <img src={profileImage} alt="프로필 사진" className="profile-image" />
        <span className="nickname">닉네임</span>
      </div>
      <div className="menu-section">
        <button className={activePage === 'Dashboard' ? 'active' : ''} onClick={() => onSelectPage('Dashboard')}>
          <FaHome /> Dashboard
        </button>

        <button className={activePage === 'accountBook' ? 'active' : ''} onClick={() => toggleSubMenu('accountBook')}>
          <FaMoneyBillWave /> 가계부 <FaChevronDown className={`submenu-arrow ${isAccountBookMenuOpen ? 'open' : ''}`} />
        </button>
        {isAccountBookMenuOpen && (
          <div className="submenu">
            <button onClick={(e) => handleSubMenuClick('accountBookInput', e)}>입력</button>
            <button onClick={(e) => handleSubMenuClick('accountBookView', e)}>조회</button>
            <button onClick={(e) => handleSubMenuClick('accountBookStats', e)}>통계</button>
          </div>
        )}

        <button className={activePage === 'calendar' ? 'active' : ''} onClick={() => toggleSubMenu('calendar')}>
          <FaCalendarAlt /> 캘린더 <FaChevronDown className={`submenu-arrow ${isCalendarMenuOpen ? 'open' : ''}`} />
        </button>
        {isCalendarMenuOpen && (
          <div className="submenu">
            <button onClick={(e) => handleSubMenuClick('calendarMonth', e)}>월별</button>
            <button onClick={(e) => handleSubMenuClick('calendarWeek', e)}>주별</button>
            <button onClick={(e) => handleSubMenuClick('calendarDay', e)}>일별</button>
          </div>
        )}

        <button className={activePage === 'report' ? 'active' : ''} onClick={() => toggleSubMenu('report')}>
          <FaChartBar /> 보고서 <FaChevronDown className={`submenu-arrow ${isReportMenuOpen ? 'open' : ''}`} />
        </button>
        {isReportMenuOpen && (
          <div className="submenu">
            <button onClick={(e) => handleSubMenuClick('ReportDays', e)}>월별/연간 보고서</button>
            <button onClick={(e) => handleSubMenuClick('ReportCategories', e)}>카테고리별 보고서</button>
            <button onClick={(e) => handleSubMenuClick('ReportOrner', e)}>맞춤형보고서</button>
          </div>
        )}
        <button onClick={() => onSelectPage('budget')}>
          <FaPiggyBank /> 예산관리
        </button>
        <button onClick={() => onSelectPage('goals')}>
          <FaBullseye /> 목표 설정
        </button>
        <button onClick={() => onSelectPage('assets')}>
          <FaChartBar /> 자산 관리
        </button>
        <button onClick={() => onSelectPage('notification')}>
          <FaBell /> 알림
        </button>
        <button onClick={() => onSelectPage('share')}>
          <FaShareAlt /> 공유
        </button>
        <button onClick={() => onSelectPage('help')}>
          <FaQuestionCircle /> 도움말
        </button>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt /> 로그아웃
      </button>
    </div>
  );
}

export default Sidebar;