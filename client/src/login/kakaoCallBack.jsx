import React, { useEffect } from "react";
import axios from "axios";
import { loginKakao } from "../apis/api/userManage"

function KakaoCallback() {
    //최초 렌더링 시 발동
    useEffect(() => {
      callBack();
    }, []);
    
    async function callBack() {
      const code = new URL(window.location.href).searchParams.get("code");
      console.log(code);
      
      await loginKakao(code)
      .then((response) => {
        console.log(response);
        //spring에서 발급된 jwt localStorage 저장
        // localStorage.setItem("accessToken", response.headers.accesstoken);
        sessionStorage.setItem("isAuthorized", true);
        // window.localStorage.setItem("isAuthorized",true);
        // localStorage.setItem("isAuthorized",true);
        // console.log(window.localStorage.getItem("isAuthorized"));
        //메인 페이지로 이동
        window.location.href = "/";
      }).catch((err) => {
        //에러발생 시 경고처리 후 login 페이지로 전환
        alert(err.response.data.detail);
      
        window.location.href = "/login";
      })
    }

    return (
      <div>
      </div>
    )
  }
  
  export default KakaoCallback;