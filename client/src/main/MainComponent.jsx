import React from "react";
import { Routes, Navigate, Route, useSearchParams } from "react-router-dom";
import LoginComponent from "../login/LoginComponent";
import BoardComponent from "./BoardComponent";
import KakaoCallback from "../login/kakaoCallBack";

function MainComponent() {   
    const [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.get("accessToken"))
      // sessionStorage.setItem("accessToken", "");
      // sessionStorage.setItem("refreshToken", "");
    if(searchParams.get("accessToken")){
      sessionStorage.setItem("accessToken", searchParams.get("accessToken"))
      sessionStorage.setItem("refreshToken", searchParams.get("refreshToken"))
    }

    let accessToken = sessionStorage.getItem("accessToken");
    let refreshToken = sessionStorage.getItem("refreshToken");
    console.log(accessToken);
  return (
    <div>
      {!accessToken ? <Navigate to="/login" /> : <Navigate to="/" />}
        <Routes>
	        <Route path="/login" element={<LoginComponent />} />
	        <Route path="/" element={<BoardComponent />} />
          <Route path="/auth/kakao" element={<KakaoCallback />} />
        </Routes>
    </div>
  );
}

export default MainComponent