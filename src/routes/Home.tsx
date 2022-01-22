import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../Components/NavBar";
import Error from "./Error";
import Notice from "./Notice";
import Questions from "./Questions";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Home() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/notice" element={<Notice />}></Route>
        <Route path="/questions" element={<Questions />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </>
  );
}

export default Home;
