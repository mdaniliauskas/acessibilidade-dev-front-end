import React, {useState} from 'react'
import './App.css'
import RegisterPage from './pages/Register/'
import useFetch from './hooks/useFetch';


function App() {
  const URL = `https://rickandmortyapi.com/api/character`;
  
  const { data, isPending, error } = useFetch(`${URL}/204`, );


  return (
    <div>
      <RegisterPage/>
      {/* {isPending ? (
          <p>Carregando infos da api</p>
        ) :
        (
          <div>
            <p>{data.id}</p>
            <p>{data.name}</p>
            <p>{data.status}</p>
            <p>{data.species}</p>
          </div>
        )
      }
      <p>{error}</p> */}
    </div>
  )  
}
export default App;