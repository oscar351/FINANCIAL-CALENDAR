import React, { useState } from 'react';
import Modal from 'react-modal'; // react-modal 라이브러리 사용 (설치 필요)
import '../css/FindUserInfo.css';

Modal.setAppElement('#root');

function ResetPasswordModal({ isOpen, onRequestClose, userId }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 비밀번호 재설정 로직 구현 (서버 통신 등)
    console.log(userId, newPassword);
    onRequestClose(); // 모달 닫기
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <div className="modal-content">
        <h2>비밀번호 재설정</h2>
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
        </form>
      </div>
    </Modal>
  );
}

export default ResetPasswordModal;