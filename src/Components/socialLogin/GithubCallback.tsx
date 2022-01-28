import axios from "axios";
import qs from "qs";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

//const REDIRECT_URI = `http://localhost:3000/githubcallback`;

function GithubCallback() {
  const { search } = useLocation();

  useEffect(() => {
    (async () => {
      const { code }: any = qs.parse(search, {
        ignoreQueryPrefix: true, //?없애주는거
      });
      const config: any = {
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_SECRET,
        code,
      };
      const baseUrl = "https://github.com/login/oauth/access_token";
      const params = new URLSearchParams(config).toString();

      const finalUrl = `${baseUrl}?${params}`;
      console.log(finalUrl);
      axios.post(
        finalUrl,

        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      );
    })();
  }, []);

  return <div></div>;
}

export default GithubCallback;
