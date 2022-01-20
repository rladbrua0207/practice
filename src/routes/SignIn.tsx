import {
  faFacebookSquare,
  faGithub,
  faGithubSquare,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import kakaoLoginImg from "../images/kakaolink_btn_small.png";
import googleLoginImg from "../images/google_logo_2_littledeep.png";

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
  color: #fff;
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
  border-color: white;
  width: 50%;
`;

const SocialLoginTitle = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 2px;
  font-size: 0.75rem;
`;

const SocialLoginBtn = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1px;
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
    margin-top: 3px;
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

interface ISignInForm {
  username: string;
  password: string;
}

function SignIn() {
  const { register, handleSubmit, formState, setError } =
    useForm<ISignInForm>();

  const onValid = (data: any) => {
    console.log(data);
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
          <Link to={"/"}>
            <img src={kakaoLoginImg} id="kakao"></img>
          </Link>
        </SocialLoginBtn>
        <SocialLoginBtn>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faGithub} id="github" />
          </Link>
        </SocialLoginBtn>
        <SocialLoginBtn>
          <Link to={"/"}>
            <img src={googleLoginImg} id="google"></img>
          </Link>
        </SocialLoginBtn>
        <SocialLoginBtn>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faFacebookSquare} id="facebook" />
          </Link>
        </SocialLoginBtn>
      </SocialLoginWrapper>
    </SignInForm>
  );
  //여기부터 다시
}

export default SignIn;
