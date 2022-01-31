import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../Components/NavBar";
import GithubCallback from "../Components/socialLogin/GithubCallback";
import Notice from "./Notice";
import Post from "./Post";
import Questions from "./Questions";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Write from "./Write";

function Home() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/notice" element={<Notice />}></Route>
        <Route path="/questions" element={<Questions />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/post/:id" element={<Post />}></Route>
        <Route path="/githubcallback" element={<GithubCallback />}></Route>
      </Routes>
    </>
  );
}

export default Home;
