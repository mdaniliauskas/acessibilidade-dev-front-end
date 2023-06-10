import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Heading } from "@chakra-ui/layout";

const LoginRedirect = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <Heading size="lg" as="h2">
        Redirecionando para login!
      </Heading>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  console.log(children);
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <>
      <LoginRedirect />
    </>
  );
};

export default PrivateRoute;
