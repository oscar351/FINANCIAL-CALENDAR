import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import { FaHome, FaMoneyBillWave, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaChevronDown, FaPiggyBank, FaBullseye, FaShareAlt, FaQuestionCircle, FaBell } from 'react-icons/fa';
import profileImage from '../assets/images/profile.png';

function Sidebar({ activePage, onSelectPage }) { // activePage prop 추가
  const navigate = useNavigate(); // useNavigate 추가
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubMenu = (menu) => {
    setOpenMenus(prevMenus => ({
      ...prevMenus,
      [menu]: !prevMenus[menu]
    }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const menuItems = [
    { name: 'Dashboard', iconType: FaHome, path: 'Dashboard' },
    {
      name: '가계부',
      iconType: FaMoneyBillWave,
      path: 'accountBook',
      subItems: [
        { name: '입력', path: 'accountBookInput' },
        { name: '조회', path: 'accountBookView' },
        { name: '통계', path: 'accountBookStats' },
      ],
    },
    {
      name: '캘린더',
      iconType: FaCalendarAlt,
      path: 'calendar',
      subItems: [
        { name: '일정', path: 'calendarMonth' },
        { name: '', path: 'calendarWeek' },
        { name: '일별', path: 'calendarDay' },
      ],
    },
    {
      name: '보고서',
      iconType: FaChartBar,
      path: 'report',
      subItems: [
        { name: '월별/연간 보고서', path: 'ReportDays' },
        { name: '카테고리별 보고서', path: 'ReportCategories' },
        { name: '맞춤형 보고서', path: 'ReportOrner' },
      ],
    },
    { name: '예산 관리', iconType: FaPiggyBank, path: 'budget' },
    { name: '목표 설정', iconType: FaBullseye, path: 'goals' },
    { name: '자산 관리', iconType: FaChartBar, path: 'assets' },
    { name: '알림', iconType: FaBell, path: 'notification' },
    { name: '공유', iconType: FaShareAlt, path: 'share' },
    { name: '도움말', iconType: FaQuestionCircle, path: 'help' },
  ];
  
  return (
    <div className="sidebar">
      {/* 프로필 */}
      <div className={activePage === 'MyPage' ? 'profile active' : 'profile'} onClick={() => onSelectPage('MyPage')}>
        <img src={profileImage} alt="프로필 사진" className="profile-image" />
        <span className="nickname">닉네임</span>
      </div>
      {/* 메뉴 */}
      <div className="menu-section">
        {menuItems.map(item => {
          // handleSubMenuClick 함수를 map 내부에서 정의
          const handleSubMenuClick = (page, e) => { 
            e.stopPropagation();
            onSelectPage(page);
          };

          return (
            <React.Fragment key={item.path}>
              <button 
                className={activePage === item.path ? 'active' : ''}
                onClick={() => item.subItems ? toggleSubMenu(item.path) : onSelectPage(item.path)}
              >
                {item.iconType && <item.iconType />} {item.name}
                {item.subItems && <FaChevronDown className={`submenu-arrow ${openMenus[item.path] ? 'open' : ''}`} />}
              </button>
              {item.subItems && openMenus[item.path] && (
                <div className="submenu">
                  {item.subItems.map(subItem => (
                    <button
                      key={subItem.path}
                      className={activePage === subItem.path ? 'active' : ''}
                      onClick={(e) => handleSubMenuClick(subItem.path, e)}
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* 로그아웃 버튼 */}
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt /> 로그아웃
      </button>
    </div>
  );
}

export default Sidebar;