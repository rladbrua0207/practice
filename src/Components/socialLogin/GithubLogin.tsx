import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//const REDIRECT_URI = `http://localhost3000/githubcallback`;

const baseUrl = "http://github.com/login/oauth/authorize";
const config: any = {
  client_id: process.env.REACT_APP_GITHUB_CLIENT_ID || "",
  allow_signup: false,
  scope: "read:user user:email",
};
const params = new URLSearchParams(config).toString();
const finalUrl = `${baseUrl}?${params}`;
function GithubLogin() {
  return (
    <a href={`${finalUrl}`}>
      <FontAwesomeIcon icon={faGithub} id="github" />
    </a>
  );
}

export default GithubLogin;
