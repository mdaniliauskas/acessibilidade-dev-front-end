import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import './components/ProgressBar/index.jsx'
import './pages/Register/RegisterForm.jsx'
import './components/Navbar/index.jsx'

import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <App/> 
    </ChakraProvider>
  </React.StrictMode>,
)
