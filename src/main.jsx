import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.module.css'
import './components/ProgressBar/index.jsx'
import './pages/Register/RegisterForm.jsx'
import './components/Navbar/index.jsx'
import './index.css'

import "./components/ProgressBar/index.jsx";
import "./pages/Register/RegisterForm.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./components/Navbar/index.jsx";

import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-tuds50i1sq2z02tu.us.auth0.com"
    clientId="5NUUvBUkwrP1BnjL3RxeUnz5xnwX3ad0"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </Auth0Provider>
);
