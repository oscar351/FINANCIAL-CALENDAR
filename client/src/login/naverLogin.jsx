import NaverLogo from '../assets/images/btn_naver.svg'; // 카카오 로고 이미지 import

function NaverLogin() {
    const loginUrl = `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/naver`;

    return (
      <a href={loginUrl}><button className="social-button naver"><img src={NaverLogo} alt="네이버 로고" /> 네이버로 로그인하기</button></a>
    );
  }
  
  export default NaverLogin;