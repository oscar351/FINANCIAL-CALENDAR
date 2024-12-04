import React, { useState } from 'react';
import '../css/login.css';
import { login } from "../apis/api/userManage";
import KakaoLogin from "./kakaoLogin";
import NaverLogin from "./naverLogin";
import GoogleLogin from "./googleLogin";
import { Link } from 'react-router-dom';

function testComponent() {

    return (
        <div className={`login-container`}>
            <div className="login-box">
                <iframe src="http://cctv.kwater.or.kr/html/cctv_hls_low.html?mkid=121&level=0&expiretime=-1&error=cctv" frameborder="0" style={{width:'100%'}}></iframe>
            </div>
        </div>
    );
}

export default testComponent
