import { useForm } from "react-hook-form";
import styled from "styled-components";

const SignInContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.postBgColor};
  margin: 0 auto;
  border-radius: 15px;
  border: solid #e8e8e8;
  max-width: 400px;
  height: 600px;
`;

function SignIn() {
  const { register } = useForm();
  return <SignInContainer></SignInContainer>;
  //여기부터 다시
}

export default SignIn;
