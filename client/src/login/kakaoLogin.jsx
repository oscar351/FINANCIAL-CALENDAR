import kakaoLogo from '../assets/images/btn_kakao.svg'; // 카카오 로고 이미지 import

import { loginKakao } from "../apis/api/userManage"
import { Link } from 'react-router-dom';

function KakaoLogin() {
    const loginUrl = `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/kakao`;

    return (
      <a href={loginUrl}><button className="social-button kakao"><img src={kakaoLogo} alt="카카오 로고" />카카오로 로그인하기</button></a>
    );
  }
  
  export default KakaoLogin;