import React, { useState } from "react";
import RegisterPage from "./pages/Register/";
// import LoginForm from "./pages/Login/LoginForm";

// import NewTopicForm from "./pages/Forum/NewTopic/NewTopicForm";
import TextCard from "./components/TextCard/TextCard";
import styles from "../src/App.module.css";

function App() {
  return (
    <div>
      <Navbar />
      <div className={styles.body}>
        <TextCard />
        {/* <NewTopicForm /> */}
        {/* <LoginForm/> */}
        {/* <RegisterPage /> */}
      </div>
      {/*<LoginForm/>*/}
      {/*<RegisterPage/>*/}
    </div>
  );
}
export default App;
