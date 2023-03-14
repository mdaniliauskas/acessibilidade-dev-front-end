import React, {useState} from 'react'
import './App.css'
import RegisterPage from './pages/Register/'
import LoginForm from './pages/Login/LoginForm'
import useFetch from './hooks/useFetch';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';


function App() {
  const URL = `https://rickandmortyapi.com/api/character`;
  
  const { data, isPending, error } = useFetch(`${URL}/204`, );


  return (
    <div>
      {/*<LoginForm/>*/}
       {/*<RegisterPage/>*/}
       <LoginButton/> 
       <br/>
       <br/>
       <LogoutButton/> 
    </div>
  )  
}
export default App;