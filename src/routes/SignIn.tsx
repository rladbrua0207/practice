import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import KakaoLogin from "../Components/socialLogin/KakaoLogin";
import GithubLogin from "../Components/socialLogin/GithubLogin";
import GoogleLogin from "../Components/socialLogin/GoogleLogin";
import { ISignInForm, IUser } from "../Interface";
import { useRecoilState } from "recoil";
import { loggedInUserAtom } from "../atoms";

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.postBgColor};
  align-items: center;
  margin: 150px auto;
  padding-top: 20px;
  border-radius: 15px;
  border: solid #e8e8e8;
  max-width: 400px;
  height: 400px;
  a {
    color: #000;
  }
  a:hover,
  a:active {
    text-decoration: none;
    color: #fff;
  }
`;

const SignInInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 5px auto;
  min-height: 80px;
`;

const SignInInputLabel = styled.label`
  margin-bottom: 5px;
  padding-left: 3px;
`;

const SignInInput = styled.input`
  height: 40px;
  border-radius: 5px;
  font-size: 1.4rem;
  border: none;
`;

const SignInBtn = styled.button`
  width: 90%;
  margin: 15px auto;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 4px;
  height: 40px;
  font-size: 1.1rem;
  &:hover {
    cursor: pointer;
  }
`;

const ErrorSpan = styled.span`
  font-size: 0.8em;
  color: #ff5353;
  margin-top: 3px;
  font-family: "RIDIBatang";
`;

const SignInMoreAction = styled.div`
  display: flex;
  margin: 10px auto;
  a {
    margin: 0 15px;
    text-underline-position: under;
    text-decoration: underline;
  }
`;

const SocialLoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid;
  border-radius: 4px;
  border-color: ${(props) => props.theme.textColor};
  width: 50%;
`;

const SocialLoginTitle = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 2px;
  font-size: 0.75rem;
  color: ${(props) => props.theme.textColor};
`;

const SocialLoginBtn = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1px;
  &:hover {
    cursor: pointer;
  }
  #facebook {
    font-size: 3rem;
    color: #1673e8;
  }
  #google {
    background-color: white;
    width: 32px;
    height: 32px;
    font-size: 1rem;
    border-radius: 4px;
    padding: 5px;
  }
  #kakao {
    width: 42px;
    margin-top: 4px;
  }
  #github {
    font-size: 2rem;
    background-color: #3c4043;
    color: white;
    padding: 5px;
    border-radius: 4px;
  }
`;

function SignIn() {
  const { register, handleSubmit, formState, setError } =
    useForm<ISignInForm>();

  const [loggedInUser, setloggedInUser] = useRecoilState(loggedInUserAtom);
  const navigate = useNavigate();

  const onValid = (data: any) => {
    const users: IUser[] =
      JSON.parse(localStorage.getItem("user") as string) || [];

    const userIndex = users.findIndex(
      (user) => user.username === data.username
    );
    const confirmUser = (userIndex: number) => {
      if (userIndex === -1) {
        return setError("username", { message: `아이디를 확인해주세요` });
      } else {
        if (users[userIndex].password !== data.password) {
          return setError("password", { message: `비밀번호를 확인해주세요` });
        }
      }
    };

    confirmUser(userIndex);

    const loggedInUserObject = {
      name: users[userIndex].name,
      userId: String(users[userIndex].userId),
      username: users[userIndex].username,
      email: users[userIndex].email,
      isLoggedIn: true,
    };

    setloggedInUser(loggedInUserObject);
    navigate("/");
  };

  return (
    <SignInForm onSubmit={handleSubmit(onValid)}>
      <SignInInputWrapper>
        <SignInInputLabel htmlFor="username">아이디</SignInInputLabel>
        <SignInInput
          id="username"
          {...register("username", {
            required: true,
          })}
        ></SignInInput>
        <ErrorSpan>{formState.errors.username?.message}</ErrorSpan>
      </SignInInputWrapper>

      <SignInInputWrapper>
        <SignInInputLabel htmlFor="password">비밀번호</SignInInputLabel>
        <SignInInput
          id="password"
          type="password"
          {...register("password", {
            required: true,
          })}
        ></SignInInput>
        <ErrorSpan>{formState.errors.password?.message}</ErrorSpan>
      </SignInInputWrapper>
      <SignInBtn>로그인</SignInBtn>
      <SignInMoreAction>
        <Link to={`/findpassword`}>비밀번호 찾기</Link> |
        <Link to={`/signup`}>회원가입</Link>
      </SignInMoreAction>

      <SocialLoginTitle>간편 로그인</SocialLoginTitle>
      <SocialLoginWrapper>
        <SocialLoginBtn>
          <KakaoLogin></KakaoLogin>
        </SocialLoginBtn>
        <SocialLoginBtn>
          <GithubLogin />
        </SocialLoginBtn>
        <SocialLoginBtn>
          <GoogleLogin />
        </SocialLoginBtn>
        <SocialLoginBtn>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faFacebookSquare} id="facebook" />
          </Link>
        </SocialLoginBtn>
      </SocialLoginWrapper>
    </SignInForm>
  );
}

export default SignIn;
