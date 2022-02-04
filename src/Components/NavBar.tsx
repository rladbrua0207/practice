import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { loggedInUserAtom } from "../atoms";

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
  const loggedInUser = useRecoilValue(loggedInUserAtom);

  const handleLogOut = useResetRecoilState(loggedInUserAtom);
  return (
    <>
      <NavContainer>
        <LeftNavBox>
          <NavItem id="board">
            <Link to={`/board`}>게시판</Link>
          </NavItem>
        </LeftNavBox>
        {loggedInUser.isLoggedIn ? (
          <RightNavBox>
            <NavItem id="/">
              <Link to={`/`} onClick={handleLogOut}>
                로그아웃
              </Link>
            </NavItem>
          </RightNavBox>
        ) : (
          <RightNavBox>
            <NavItem id="signin">
              <Link to={`/signin`}>로그인</Link>
            </NavItem>
            <NavItem id="signup">
              <Link to={`/signup`}>회원가입</Link>
            </NavItem>
          </RightNavBox>
        )}
      </NavContainer>
      <hr />
    </>
  );
}

export default NavBar;
