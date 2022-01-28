import { useState } from "react";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";

import googleLoginImg from "../../images/google_logo_2_littledeep.png";

const CLIENT_ID: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

const onLoginSuccess = async (res: any) => {
  //   const reponse = await fetch(`백엔드URL`, {
  //     method: "POST",
  //   });
};
function GoogleLoginComponent() {
  return (
    <>
      <GoogleLogin
        clientId={`${CLIENT_ID}`}
        onSuccess={(result) => onLoginSuccess(result)}
        onFailure={(result) => console.log(result)}
        render={(renderProps) => (
          <img
            src={googleLoginImg}
            id="google"
            onClick={renderProps.onClick}
          ></img>
        )}
      />
    </>
  );
}

export default GoogleLoginComponent;
