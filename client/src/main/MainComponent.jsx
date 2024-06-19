import React from "react";
import { Routes, Navigate, Route, useSearchParams } from "react-router-dom";
import LoginComponent from "../login/LoginComponent";
import BoardComponent from "./BoardComponent";
import FindUserInfo from "../login/FindUserInfo"

function MainComponent() {   
    const [searchParams, setSearchParams] = useSearchParams();
    
    if(searchParams.get("accessToken")){
      sessionStorage.setItem("accessToken", searchParams.get("accessToken"))
      sessionStorage.setItem("refreshToken", searchParams.get("refreshToken"))
      window.location.href="/"
    }

    let accessToken = sessionStorage.getItem("accessToken");
    
  return (
    <div className="MainComponent">
      <Routes>
        <Route path="/login/*" element={<LoginComponent />} />
        <Route
          path="/"
          element={accessToken ? <BoardComponent /> : <Navigate to="/login" />}
        />
        <Route path="/findUserInfo" element={<FindUserInfo />} />  {/* 로그인 여부 상관없이 접근 가능 */}
      </Routes>
    </div>
  );
}

export default MainComponent