import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Navbar from "./components/Navbar/Navbar";
import Recipe from "./components/Recipe/Recipe";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/recipe" element={<Recipe />} />
        {/* <Route path="/recipe/:id" element={<RecipeDetail/>} /> */}
      </Routes>
    </>
  );
}

export default App;
