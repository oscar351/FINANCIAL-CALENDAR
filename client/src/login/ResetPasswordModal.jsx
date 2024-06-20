import React, { useState } from 'react';
import Modal from 'react-modal'; // react-modal 라이브러리 사용 (설치 필요)
import '../css/FindUserInfo.css';

import { updateUserPassword } from "../apis/api/userManage"

Modal.setAppElement('#root');

function ResetPasswordModal({ isOpen, onRequestClose, passwordData, errMsg }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      newPassword     : newPassword,
      confirmPassword : confirmPassword,
      username : passwordData.username,
      email : passwordData.email,
      provider : passwordData.provider
    }

    await updateUserPassword(formData)
    .then((res) => {
      if(res.code === 200){
        alert("비밀번호 초기화가 완료되었습니다. 로그인을 해주세요.")
        window.location.href="/login";
      }else{
        alert(res.message)
      }
    })
  };


  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <div className="modal-content">
        <h2>비밀번호 재설정</h2>
        {passwordData.username ? ( // foundId가 있으면 아이디 표시, 없으면 메시지 표시
          <>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="newPassword">새 비밀번호</label>
              <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">새 비밀번호 확인</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit">비밀번호 재설정</button>
            <button onClick={onRequestClose}>닫기</button>
          </form>
          </>
        ) : (
          <>
            <p>{errMsg}</p>
            <button onClick={onRequestClose}>닫기</button>
          </>
        )}



      </div>
    </Modal>
  );
}

export default ResetPasswordModal;