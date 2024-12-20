import React, { useState, useEffect } from 'react';
import { getMyInfo } from '../apis/api/userManage';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import { FaHome, FaMoneyBillWave, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaChevronDown, FaPiggyBank, FaBullseye, FaShareAlt, FaQuestionCircle, FaCog, FaTachometerAlt } from 'react-icons/fa';
import profileImage from '../assets/images/gwakcheol.png';

function Sidebar({ activePage, onSelectPage }) { // activePage prop 추가
  const navigate = useNavigate(); // useNavigate 추가
  const [openMenus, setOpenMenus] = useState({});
  const [userInfo, setUserInfo] = useState({
    profileImage: '',
    name: '',
    email: '',
    provider: '',
    phoneNumber: '',
    role: '',
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await getMyInfo();
        console.log(res);
        if (res.code === 200) {
          setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            name: res.value.username,
            email: res.value.email,
            provider: res.value.provider,
            phoneNumber: res.value.phoneNumber,
            role: res.value.role
          }));
        } else {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        navigate("/login");
      }
    }
    // 서버에서 사용자 정보 가져오는 API 호출
    getInfo();
  }, []);

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
    { name: '가계부', iconType: FaMoneyBillWave, path: 'AccountBook' },
    { name: '캘린더', iconType: FaCalendarAlt, path: 'Calendar' },
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
    { name: '예산 관리', iconType: FaPiggyBank, path: 'Budget' },
    { name: '목표 설정', iconType: FaBullseye, path: 'Goals' },
    { name: '자산 관리', iconType: FaChartBar, path: 'Assets' },
    { name: '설정', iconType: FaCog, path: 'settings' },
    { name: '공유', iconType: FaShareAlt, path: 'share' },
    { name: '도움말', iconType: FaQuestionCircle, path: 'help' },
  ];

  return (
    <div className="sidebar">
      {/* 프로필 */}
      <div className={activePage === 'MyPage' ? 'profile active' : 'profile'} onClick={() => onSelectPage('MyPage')}>
        <img src={profileImage} alt="프로필 사진" className="profile-image" />
        <span className="nickname">곽철이</span>
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
        {userInfo.role === 'ADMIN' && (
          <button onClick={() => onSelectPage('AdminPage')} className={activePage === 'AdminPage' ? 'active' : ''}>
            <FaTachometerAlt /> 시스템 성능
          </button>
        )}
      </div>
      {/* 로그아웃 버튼 */}
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt /> 로그아웃
      </button>
    </div>
  );
}

export default Sidebar;