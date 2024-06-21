import React, { useEffect } from 'react';
import { Routes, Navigate, useNavigate, Route, useSearchParams } from "react-router-dom";
import LoginComponent from "../login/LoginComponent";
import BoardComponent from "./BoardComponent";
import FindUserInfo from "../login/FindUserInfo"
import Register from "../login/Register"

function MainComponent() {   
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    }
  }, [navigate, searchParams]); // 의존성 배열에 navigate, searchParams 추가

  const isLoggedIn = !!sessionStorage.getItem('accessToken'); // 로그인 여부 확인
    
    
  return (
    <div className="MainComponent">
      <Routes>
        <Route path="/login/*" element={<LoginComponent />} />
        <Route path="/" element={isLoggedIn ? <BoardComponent /> : <Navigate to="/login" />} />
        <Route path="/findUserInfo" element={<FindUserInfo />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default MainComponent