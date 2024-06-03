import React from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import LoginComponent from "../login/LoginComponent";
import BoardComponent from "./BoardComponent";
import KakaoCallback from "../login/kakaoCallBack";

function MainComponent() {   
  
    let isAuthorized = sessionStorage.getItem("isAuthorized");
    console.log(isAuthorized);
  return (
    <div>
      {!isAuthorized ? <Navigate to="/login" /> : <Navigate to="/" />}
        <Routes>
	        <Route path="/login" element={<LoginComponent />} />
	        <Route path="/" element={<BoardComponent />} />
          <Route path="/oauth/kakao" element={<KakaoCallback />} />
        </Routes>
    </div>
  );
}

export default MainComponent