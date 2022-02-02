import { Route, Routes } from "react-router-dom";
import NavBar from "../Components/NavBar";
import GithubCallback from "../Components/socialLogin/GithubCallback";
import Board from "./Board";
import Post from "./Post";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PostWrite from "./PostWrite";
import styled from "styled-components";
import PostEdit from "./PostEdit";

const Container = styled.div`
  margin-bottom: 100px;
`;

function Home() {
  return (
    <Container>
      <NavBar></NavBar>
      <Routes>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/postwrite" element={<PostWrite />}></Route>
        <Route path="/githubcallback" element={<GithubCallback />}></Route>
        <Route path="/post/:id" element={<Post />}></Route>
        <Route path="/post/:id/edit" element={<PostEdit />}></Route>
      </Routes>
    </Container>
  );
}

export default Home;
