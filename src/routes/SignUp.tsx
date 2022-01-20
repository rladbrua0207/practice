import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.postBgColor};
  margin: 50px auto;
  padding-top: 20px;
  border-radius: 15px;
  border: solid #e8e8e8;
  max-width: 400px;
  height: 530px;
`;

const SignUpInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 5px auto;
  min-height: 80px;
`;

const SignUpInputLabel = styled.label`
  margin-bottom: 5px;
  padding-left: 3px;
`;

const SignUpInput = styled.input`
  height: 40px;
  border-radius: 5px;
  border: none;
`;

const SignUpBtn = styled.button`
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

const SignUpInputInfo = styled.span`
  font-size: 0.8em;
  color: #747474;
  margin-top: 3px;
  font-family: "RIDIBatang";
`;

interface ISignUpForm {
  email: string;
  username: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

const signUpInfoArr = ["username", "password"];

function SignUp() {
  const { register, handleSubmit, formState, setError } =
    useForm<ISignUpForm>();

  const [isFocus, setIsFocus] = React.useState([false, false]);
  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.currentTarget.id === "username") {
      setIsFocus((value) => [(value[0] = true), (value[1] = false)]);
    } else {
      setIsFocus((value) => [(value[0] = false), (value[1] = true)]);
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus((value) => [(value[0] = false), (value[1] = false)]);
  };

  const onValid = (data: any) => {
    if (data?.password !== data?.passwordConfirm) {
      return setError("passwordConfirm", {
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
    console.log(data);
  };

  return (
    <SignUpForm onSubmit={handleSubmit(onValid)}>
      <SignUpInputWrapper>
        <SignUpInputLabel htmlFor="email">이메일</SignUpInputLabel>
        <SignUpInput
          id="email"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식이 올바르지 않습니다",
            },
          })}
        ></SignUpInput>
        <ErrorSpan>{formState.errors.email?.message}</ErrorSpan>
      </SignUpInputWrapper>
      <SignUpInputWrapper>
        <SignUpInputLabel htmlFor="username">아이디</SignUpInputLabel>
        <SignUpInput
          id="username"
          onFocus={onFocus}
          {...register("username", {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]{8,}$/,
              message: "아이디 형식이 올바르지 않습니다.",
            },
            onBlur: onBlur,
          })}
        ></SignUpInput>

        {isFocus[signUpInfoArr.indexOf("username")] ? (
          <SignUpInputInfo>
            문자, 숫자를 조합하여 8자 이상을 사용하세요
          </SignUpInputInfo>
        ) : (
          ""
        )}

        <ErrorSpan>{formState.errors.username?.message}</ErrorSpan>
      </SignUpInputWrapper>
      <SignUpInputWrapper>
        <SignUpInputLabel htmlFor="name">이름</SignUpInputLabel>
        <SignUpInput
          id="name"
          {...register("name", {
            required: true,
            pattern: {
              value: /^[a-zA-Zㄱ-힣0-9|s]*$/,
              message: "이름 형식이 올바르지 않습니다.",
            },
          })}
        ></SignUpInput>
        <ErrorSpan>{formState.errors.name?.message}</ErrorSpan>
      </SignUpInputWrapper>
      <SignUpInputWrapper>
        <SignUpInputLabel htmlFor="password">비밀번호</SignUpInputLabel>
        <SignUpInput
          id="password"
          type="password"
          onFocus={onFocus}
          {...register("password", {
            required: true,
            pattern: {
              //8자 이상 문자하나, 숫자하나, 특수문자 하나 이상 사용
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
              message: "비밀번호 형식이 올바르지 않습니다.",
            },
            onBlur: onBlur,
          })}
        ></SignUpInput>

        {isFocus[signUpInfoArr.indexOf("password")] ? (
          <SignUpInputInfo>
            문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요
          </SignUpInputInfo>
        ) : (
          ""
        )}

        <ErrorSpan>{formState.errors.password?.message}</ErrorSpan>
      </SignUpInputWrapper>
      <SignUpInputWrapper>
        <SignUpInputLabel htmlFor="passwordConfirm">
          비밀번호 확인
        </SignUpInputLabel>
        <SignUpInput
          id="passwordConfirm"
          type="password"
          {...register("passwordConfirm", {
            required: true,
          })}
        ></SignUpInput>
        <ErrorSpan>{formState.errors.passwordConfirm?.message}</ErrorSpan>
      </SignUpInputWrapper>
      <SignUpBtn>회원가입</SignUpBtn>
    </SignUpForm>
  );
  //여기부터 다시
}

export default SignUp;
