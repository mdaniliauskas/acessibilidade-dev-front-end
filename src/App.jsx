import React from 'react'
import './App.css'
import RegisterPage from './pages/Register/'

import useFetch from './hooks/useFetch';


function App() {
  const URL = `https://rickandmortyapi.com/api/character`;
  
  const { data } = useFetch(`${URL}/204`);

  return (
    <div>
      {!data ? (
          <p>Carregando infos da api</p>
        ) :
        (
          <div>
            <p>{data.id}</p>
            <p>{data.name}</p>s
            <p>{data.status}</p>
            <p>{data.species}</p>
          </div>
        )
      }
    </div>
  )  
}
export default App;