import React, {useState} from 'react'
import './App.css'
//import RegisterPage from './pages/Register/'
import LoginForm from './pages/Login/LoginForm'
import useFetch from './hooks/useFetch';
import Navbar from './components/Navbar';

function App() {
  const URL = `https://rickandmortyapi.com/api/character`;
  
  const { data, isPending, error } = useFetch(`${URL}/204`, );


  return (
    <div>
      <Navbar/>
      {/* <LoginForm/> */}
      {/* <RegisterPage/> */}
    </div>
  )  
}
export default App;