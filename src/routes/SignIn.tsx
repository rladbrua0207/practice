import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.postBgColor};
  margin: 150px auto;
  padding-top: 20px;
  border-radius: 15px;
  border: solid #e8e8e8;
  max-width: 400px;
  height: 330px;
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
  margin: 0 auto;
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
    </SignInForm>
  );
  //여기부터 다시
}

export default SignIn;
