import React, { useState, useEffect } from 'react'; // useEffect 추가
import { Routes, Navigate, Route, useSearchParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import '../css/login.css';
import { login } from "../apis/api/userManage"
// import { LoginData } from "../apis/services/post"
import KakaoLogin from "./kakaoLogin";
import NaverLogin from "./naverLogin";
import GoogleLogin from "./googleLogin";


function LoginComponent() {   

  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  async function submit() {
    await login(values.email, values.password)
        // .then(LoginData)
        .then((res) => {
          // sessionStorage.setItem("isAuthorized", true)
          sessionStorage.setItem("accessToken", res.value.accessToken);
          sessionStorage.setItem("refreshToken", res.value.refreshToken);
          window.location.href="/";
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
          <input type="text" placeholder="아이디" name='email' value={values.email} onChange={handleChange}/>
        </div>
        <div className="input-group">
          <input type="password" placeholder="비밀번호" name='password' value={values.password} onChange={handleChange}/>
        </div>
        <input type="button" value="로그인" className='button' onClick={submit}/>
        <div className="social-login">
        <KakaoLogin></KakaoLogin>
        <NaverLogin></NaverLogin>
        <GoogleLogin></GoogleLogin>
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
      <Routes>
        <Route path="/auth/kakao" element={<KakaoLogin />} />
      </Routes>
    </div>
  );
}

export default LoginComponent
