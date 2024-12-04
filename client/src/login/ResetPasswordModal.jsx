import React, { useState } from 'react';
import Modal from 'react-modal';
import '../css/FindUserInfo.css';
import { updateUserPassword } from "../apis/api/userManage";

Modal.setAppElement('#root');

function ResetPasswordModal({ isOpen, onRequestClose, passwordData, errMsg }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 확인 에러 메시지 상태

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 일치 여부 확인
    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = {
      newPassword,
      confirmPassword,
      username: passwordData.name,
      email: passwordData.email,
      provider: passwordData.provider,
    };

    try {
      const res = await updateUserPassword(formData);
      if (res.code === 200) {
        alert("비밀번호 초기화가 완료되었습니다. 로그인을 해주세요.");
        window.location.href = "/login";
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
      alert("비밀번호 초기화 중 오류가 발생했습니다.");
    }
  };


  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <div className="modal-content">
        <h2>비밀번호 재설정</h2>
        {passwordData.name ? ( // foundId가 있으면 아이디 표시, 없으면 메시지 표시
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="newPassword">새 비밀번호</label>
              <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">새 비밀번호 확인</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit">비밀번호 재설정</button>
            <button onClick={onRequestClose}>닫기</button>
          </form>
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