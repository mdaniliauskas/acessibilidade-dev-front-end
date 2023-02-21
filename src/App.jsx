// import { useState } from 'react'
// import reactLogo  from './assets/react.svg'
import React from 'react'
import './App.css'
import ProgressBar from './components/ProgressBar/index'



//tentativa 03 - fazer a barra de progresso com %



//style={progresstext}>{`${progress}%`}


// //original
function App() {

  return (

      <div>
        
        <ProgressBar number="100">
        </ProgressBar>
        <div id="titulo">Cadastro</div>
      
      </div>
  )
}

export default App;


