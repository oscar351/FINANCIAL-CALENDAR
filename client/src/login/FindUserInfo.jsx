import React, { useState, useEffect } from 'react';
import FindIdResultModal from './FindIdResult';
import ResetPasswordModal from './ResetPasswordModal';
import '../css/FindUserInfo.css';
import { findUserId, resetUserPassword } from "../apis/api/userManage"

function FindAccount() {
  const [activeTab, setActiveTab] = useState('findId');
  const [formData, setFormData] = useState({ name: '', phoneNumber: '', userId: '' });
  const [passwordData, setPasswordData] = useState({ username: null, email: null, provider: null });
  const [showFindIdModal, setShowFindIdModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [foundId, setFoundId] = useState(null);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    // 탭 변경 시 폼 데이터 초기화
    setFormData({ name: '', phoneNumber: '', userId: '' });
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남김
    let formattedValue = '';
  
    if (value.length < 4) {
      formattedValue = value;
    } else if (value.length < 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length < 11) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    } else {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
  
    setFormData({ ...formData, phoneNumber: formattedValue });
  };

  const handleFindIdSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await findUserId(formData);
      if (res.code === 200) {
        setFoundId(res.value);
      } else {
        setErrMsg(res.message);
      }
      setShowFindIdModal(true);
    } catch (error) {
      console.error(error);
      // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
    }
  };
  
  const handleFindPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetUserPassword(formData);
      if (res.code === 200) {
        setPasswordData({ username: res.value.username, email: res.value.email, provider: res.value.provider });
      } else {
        setErrMsg(res.message);
      }
      setShowResetPasswordModal(true);
    } catch (error) {
      console.error(error);
      // 에러 처리 로직 추가
    }
  };

  const commonInputFields = (
    <>
      <div className="input-group">
        <label htmlFor="name">이름</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label htmlFor="phoneNumber">전화번호</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handlePhoneNumberChange} required />
      </div>
    </>
  );

  return (
    <div className="find-account-content">
      <div className="tab-bar">
        <button className={activeTab === 'findId' ? 'active' : ''} onClick={() => handleTabClick('findId')}>
          아이디 찾기
        </button>
        <button className={activeTab === 'findPassword' ? 'active' : ''} onClick={() => handleTabClick('findPassword')}>
          비밀번호 초기화
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'findId' && (
          <form className="find-id-form" onSubmit={handleFindIdSubmit}>
            {commonInputFields}
            <button type="submit">아이디 찾기</button>
          </form>
        )}
        <FindIdResultModal
          isOpen={showFindIdModal}
          onRequestClose={() => setShowFindIdModal(false)}
          foundId={foundId}
          errMsg={errMsg}
        />
        {activeTab === 'findPassword' && (
          <form className="find-password-form" onSubmit={handleFindPasswordSubmit}>
            <div className="input-group">
              <label htmlFor="userId">아이디</label>
              <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} required />
            </div>
            {commonInputFields}
            <button type="submit">비밀번호 초기화</button>
          </form>
        )}
        <ResetPasswordModal
          isOpen={showResetPasswordModal}
          onRequestClose={() => setShowResetPasswordModal(false)}
          passwordData={passwordData}
          errMsg={errMsg}
        />
        <div className="loginBtn">
          <button type="submit" onClick={() => { window.location.href = "/login"; }}>로그인 하기</button>
        </div>
      </div>
    </div>
  );
}

export default FindAccount;