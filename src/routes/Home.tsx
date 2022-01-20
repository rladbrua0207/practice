import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../Components/NavBar";
import Notice from "./Notice";
import Questions from "./Questions";

const AppContainer = styled.div``;

function Home() {
  return (
    <AppContainer>
      <NavBar></NavBar>
      <Routes>
        <Route path="/notice" element={<Notice />}></Route>
        <Route path="/Questions" element={<Questions />}></Route>
      </Routes>
    </AppContainer>
  );
}

export default Home;
