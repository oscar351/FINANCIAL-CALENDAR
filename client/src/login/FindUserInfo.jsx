import React, { useState } from 'react';
import FindIdResultModal from './FindIdResult';
import ResetPasswordModal from './ResetPasswordModal';
import '../css/FindUserInfo.css';

import { findUserId, resetUserPassword } from "../apis/api/userManage"

function FindAccount() {
  const [showFindIdResult, setShowFindIdResult] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [foundId, setFoundId] = useState(null);
  const [errMsg, seterrMsg] = useState('');

    const [activeTab, setActiveTab] = useState('findId');
    const [formData, setFormData] = useState({
      name: '',
      phone_number: '',
      userId: '',
    });

    const [passwordData, setpasswordData] = useState({
      username: '',
      email: '',
      provider: '',
    });
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
      setFormData({ name: '', phone_number: '', userId: '' }); // 탭 변경 시 폼 초기화
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleFindIdSubmit = async (e) => {
      e.preventDefault();

      await findUserId(formData)
      // .then(LoginData)
      .then((res) => {
        if(res.code === 200){
          setFoundId(res.value); // 예시 아이디
          setShowFindIdResult(true);
        }else{
          seterrMsg(res.message);
          setShowFindIdResult(true);
        }

      })
    };
  
    const handleFindPasswordSubmit = async (e) => {
      e.preventDefault();

      await resetUserPassword(formData)
      .then((res) => {
        if(res.code === 200){
          setpasswordData({ username: res.value.username, email: res.value.email, provider: res.value.provider }); // 탭 변경 시 폼 초기화
        }else{
          setpasswordData({ username: null, email: null, provider: null }); // 탭 변경 시 폼 초기화
          seterrMsg(res.message);
        }
        setShowResetPasswordModal(true);
      })
    };

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
          <div className="find-id-form">
            <div className="input-group">
              <label htmlFor="name">이름</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">전화번호</label>
              <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
            </div>
            <button type="submit" onClick={handleFindIdSubmit}>아이디 찾기</button>
          </div>
        )}
        <FindIdResultModal isOpen={showFindIdResult} onRequestClose={() => setShowFindIdResult(false)} foundId={foundId} errMsg={errMsg}/> {/* 아이디 찾기 결과 화면 */}
        {activeTab === 'findPassword' && (
          <div className="find-password-form">
            <div className="input-group">
              <label htmlFor="userId">아이디</label>
              <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="name">이름</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">전화번호</label>
              <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
            </div>
            <button type="submit" onClick={handleFindPasswordSubmit}>비밀번호 초기화</button>
          </div>
        )}
        <ResetPasswordModal isOpen={showResetPasswordModal} onRequestClose={() => setShowResetPasswordModal(false)} passwordData={passwordData} errMsg={errMsg}/> {/* 비밀번호 재설정 모달 */}
        <div className='loginBtn'>
          <button type="submit" onClick={() => {window.location.href="/login";}}>로그인 하기</button>
        </div>
      </div>
    </div>
  );
}

export default FindAccount;