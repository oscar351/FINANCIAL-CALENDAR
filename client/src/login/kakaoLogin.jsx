function KakaoLogin() {
    const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  
    const url = `https://kauth.kakao.com/oauth/authorize?scope=account_email&client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&prompt=login`;

    const loginKaKao = () => {
      window.location.href = url;
    }
    return <button img="./img/login/kakao.png" onClick={loginKaKao}>카카오톡 로그인</button>
  }
  
  export default KakaoLogin;