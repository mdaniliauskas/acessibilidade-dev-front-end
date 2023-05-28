import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.module.css";
import "./index.css";

import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
// Import all of Bootstrap's CSS
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-tuds50i1sq2z02tu.us.auth0.com"
    clientId="5NUUvBUkwrP1BnjL3RxeUnz5xnwX3ad0"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    {/* <React.StrictMode> */}
      <ChakraProvider>
        <App/>
      </ChakraProvider>
    {/* </React.StrictMode> */}
  </Auth0Provider>
);
