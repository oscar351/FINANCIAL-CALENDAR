import React, { useState, useEffect } from 'react';
import '../css/login.css';
import { login } from "../apis/api/userManage";
import KakaoLogin from "./kakaoLogin";
import NaverLogin from "./naverLogin";
import GoogleLogin from "./googleLogin";
import { Link } from 'react-router-dom';

function LoginComponent() {   
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData.email, formData.password);
      if (res.code === 200) {
        sessionStorage.setItem("accessToken", res.value.accessToken);
        sessionStorage.setItem("refreshToken", res.value.refreshToken);
        window.location.href = "/"; // 성공 시 메인 페이지로 이동
      } else {
        alert(`code ${res.code}: ${res.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류가 발생했습니다."); // 에러 메시지 표시
    }
  };

  return (
    <div className={`login-container`}>
      <div className="login-box">
        <h2 className="login-title">로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" placeholder="아이디" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="비밀번호" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="button">로그인</button>
        </form>
        <div className="social-login">
          <KakaoLogin />
          <NaverLogin />
          <GoogleLogin />
        </div>
        <div className="find-register-info">
          <Link to="/findUserInfo">아이디/비밀번호 찾기</Link>
          <Link to="/register" className="register-button">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent
