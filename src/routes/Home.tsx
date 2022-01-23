import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../Components/NavBar";
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
        <Route path="/write/:id" element={<Post />}></Route>
      </Routes>
    </>
  );
}

export default Home;
