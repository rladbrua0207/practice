import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  hr {
    color: #a6a6a6;
  }

  a {
    text-decoration: none;
    outline: none;
    color: ${(props) => props.theme.textColor};
  }

  a:hover,
  a:active {
    color: #fff;
    text-decoration: none;
  }
`;

const LeftNavBox = styled.div`
  display: flex;
  margin: 0 10px;
`;

const RightNavBox = styled.div`
  display: flex;
  margin: 0 10px;
`;

const NavItem = styled.div`
  border-color: ${(props) => props.theme.postBgColor};
  background-color: ${(props) => props.theme.postBgColor};
  border-radius: 10px;
  margin: 0 10px;
  padding: 5px 10px;
`;

function NavBar() {
  return (
    <>
      <NavContainer>
        <LeftNavBox>
          <NavItem id="notice">
            <Link to={`/notice`}>공지사항</Link>
          </NavItem>
          <NavItem id="questions">
            <Link to={`/questions`}>질문</Link>
          </NavItem>
        </LeftNavBox>
        <RightNavBox>
          <NavItem id="signin">
            <Link to={`/signin`}>로그인</Link>
          </NavItem>
          <NavItem id="signup">
            <Link to={`/signup`}>회원가입</Link>
          </NavItem>
        </RightNavBox>
      </NavContainer>
      <hr />
    </>
  );
}

export default NavBar;
