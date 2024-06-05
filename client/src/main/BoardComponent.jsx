import React, { useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import Calendar from '../dashboard/Calendar';
import AccountBook from '../dashboard/AccountBook';
import { logout } from "../apis/api/userManage"
import '../css/dashboard.css';
function BoardComponent() {   
  const [activePage, setActivePage] = useState('calendar'); // 초기 페이지: 캘린더

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  async function Kakaologout() {
    await logout()
    // .then(LoginData)
    .then((res) => {
      // sessionStorage.setItem("isAuthorized", true)
      console.log(res)
    })
  }

  return (
    <div className="dashboard">
    <Sidebar activePage={activePage} onSelectPage={handlePageChange} /> {/* activePage 전달 */}
    <div className="content">
    <button className="social-button naver" onClick={Kakaologout}>로그아웃</button>
      {activePage === 'calendar' && <Calendar />}
      {activePage === 'accountBook' && <AccountBook />}
    </div>
  </div>
  );
}

export default BoardComponent