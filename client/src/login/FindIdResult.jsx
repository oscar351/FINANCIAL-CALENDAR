import React from 'react';
import Modal from 'react-modal'; // react-modal 라이브러리 사용 (설치 필요)
import '../css/FindUserInfo.css';

Modal.setAppElement('#root');

function FindIdResultModal({ isOpen, onRequestClose, foundId, errMsg }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <div className="modal-content">
        <h2>아이디 찾기 결과</h2>
        {foundId ? ( // foundId가 있으면 아이디 표시, 없으면 메시지 표시
          <>
          <p>회원님의 아이디는 <strong>{foundId}</strong> 입니다.</p>
          <button onClick={onRequestClose}>닫기</button>
          <button onClick={() => {window.location.href="/login";}}>로그인</button>
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

export default FindIdResultModal;