import React, { useState } from "react";
import "./App.module.css";
import RegisterPage from "./pages/Register/";
import LoginForm from "./pages/Login/LoginForm";
import useFetch from "./hooks/useFetch";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      {/*<LoginForm/>*/}
      {/*<RegisterPage/>*/}
      {/* <LoginButton />
      <br />
      <br />
      <LogoutButton /> */}
    </div>
  );
}
export default App;
