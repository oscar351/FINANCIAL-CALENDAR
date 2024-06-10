import GoogleLogo from '../assets/images/btn_google.svg'; // 카카오 로고 이미지 import

function GoogleLogin() {
    const loginUrl = `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/google`;

    return (
      <a href={loginUrl}><button className="social-button google"><img src={GoogleLogo} alt="구글 로고" /> 구글로 로그인하기</button></a>
    );
  }
  
  export default GoogleLogin;