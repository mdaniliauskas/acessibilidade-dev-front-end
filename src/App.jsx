import React, { useState } from "react";
import RegisterPage from "./pages/Register/";
// import LoginForm from "./pages/Login/LoginForm";
import useFetch from "./hooks/useFetch";
import Navbar from "./components/Navbar";
// import NewTopicForm from "./pages/Forum/NewTopic/NewTopicForm";
import TopicForm from "./pages/Forum/Topic/TopicCard";
import styles from '../src/App.module.css'


function App() {
    return (
    <div>
      <Navbar />
      <div className={styles.body}>
        <TopicForm/>
        {/* <NewTopicForm /> */}
        {/* <LoginForm/> */}
        {/* <RegisterPage /> */}
      </div>
    </div>
  );
}
export default App;
