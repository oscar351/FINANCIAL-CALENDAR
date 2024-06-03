import React, { useState, useEffect } from 'react'; // useEffect 추가
// import { useNavigate } from "react-router-dom";
import '../css/login.css';
import { login } from "../apis/api/userManage"
// import { LoginData } from "../apis/services/post"
// import KakaoLogin from "./kakaoLogin";
import kakaoLogo from '../assets/images/btn_kakao.svg'; // 카카오 로고 이미지 import
import googleLogo from '../assets/images/btn_google.svg'; // 구글 로고 이미지 import
import naverLogo from '../assets/images/btn_naver.svg'; // 네이버 로고 이미지 import


function LoginComponent() {   

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  async function submit() {
    await login(userId, password)
        // .then(LoginData)
        .then((res) => {
          // sessionStorage.setItem("isAuthorized", true)
          console.log(res)
        })
  }

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 다크 모드 설정 불러오기 (초기값 설정)
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []); // 컴포넌트 마운트 시에만 실행

  useEffect(() => {
    // 다크 모드 설정 변경 시 로컬 스토리지에 저장
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]); // darkMode 상태 변경 시에만 실행

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <label className="dark-mode-toggle">
          <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
          <span className="slider"></span>
        </label>
      <div className="login-box">
        <h2 className="login-title">로그인</h2>
        <div className="input-group">
          <input type="text" placeholder="아이디" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="비밀번호" />
        </div>
        <button className="button" onClick={submit}>로그인</button>
        <div className="social-login">
        <button className="social-button kakao">
          <img src={kakaoLogo} alt="카카오 로고" /> 카카오로 로그인하기
        </button>
        <button className="social-button google">
          <img src={googleLogo} alt="구글 로고" /> 구글로 로그인하기
        </button>
        <button className="social-button naver">
          <img src={naverLogo} alt="네이버 로고" /> 네이버로 로그인하기
        </button>
      </div>
        <div className="find-register-info">
        <a href="#">아이디/비밀번호 찾기</a> 
        <a href="#" className="register-button">회원가입</a>
        </div>
      </div>
      <label className="dark-mode-toggle">
        <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default LoginComponent
