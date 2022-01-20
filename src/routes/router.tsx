import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Notice from "./Notice";
import Questions from "./Questions";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
