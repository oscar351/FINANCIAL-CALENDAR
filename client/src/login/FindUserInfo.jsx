import React, { useState } from 'react';
import FindIdResultModal from './FindIdResult';
import ResetPasswordModal from './ResetPasswordModal';
import '../css/FindUserInfo.css';

import { findUserId } from "../apis/api/userManage"

function FindAccount() {
  const [showFindIdResult, setShowFindIdResult] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [foundId, setFoundId] = useState('');
  const [errMsg, seterrMsg] = useState('');

    const [activeTab, setActiveTab] = useState('findId');
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      userId: '',
    });
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
      setFormData({ name: '', email: '', userId: '' }); // 탭 변경 시 폼 초기화
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
        console.log(res);
        if(res.code == 200){
          setFoundId(res.value); // 예시 아이디
          setShowFindIdResult(true);
        }else{
          setFoundId(null);
          seterrMsg(res.message);
          setShowFindIdResult(true);
        }

      })
    };
  
    const handleFindPasswordSubmit = (e) => {
      e.preventDefault();
      // TODO: 비밀번호 찾기 로직 구현 (서버 통신)
      setShowResetPasswordModal(true);
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
              <label htmlFor="email">이메일</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
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
              <label htmlFor="email">이메일</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <button type="submit" onClick={handleFindPasswordSubmit}>비밀번호 초기화</button>
          </div>
        )}
        <ResetPasswordModal isOpen={showResetPasswordModal} onRequestClose={() => setShowResetPasswordModal(false)} userId={formData.userId} /> {/* 비밀번호 재설정 모달 */}
        <div className='loginBtn'>
          <button type="submit" onClick={() => {window.location.href="/login";}}>로그인 하기</button>
        </div>
      </div>
    </div>
  );
}

export default FindAccount;