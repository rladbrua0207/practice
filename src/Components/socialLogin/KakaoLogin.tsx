import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import kakaoLoginImg from "../../images/kakaolink_btn_small.png";

const { Kakao }: any = window;

// const REST_API_KEY = `5bd44e323453a7ebbc5faec56da5e9f7`;
// const REDIRECT_URI = `http://localhost:3000`;
// const KAKAO_AUTH_URL = `/oauth/authorize?client_id={${REST_API_KEY}}&redirect_uri={${REDIRECT_URI}}&response_type=code`;

function KakaoLogin() {
  const navigate = useNavigate();

  const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
      success: async function (authObj: any) {
        console.log(authObj);
        const reponse = await fetch(`백엔드URL`, {
          method: "POST",
        });

        const data: any = reponse.json();

        localStorage.setItem("Kakao_token", data.access_token);
        if (data.access_token) {
          alert("카카오톡 로그인 성공");
          navigate("/");
        }
      },
      fail: function (err: any) {
        alert(JSON.stringify(err));
        alert(1);
      },
    });
  };

  return (
    <div onClick={kakaoLoginClickHandler}>
      <img src={kakaoLoginImg} id="kakao"></img>
    </div>
  );
}

export default KakaoLogin;
