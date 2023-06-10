import { Card, CardBody, Heading } from "@chakra-ui/react";
import React from "react";
import { SpinnerLoading } from "../../components";

const LoginRedirect = () => {
  return (
    <div className="mt-2 d-flex flex-column justify-content-center align-items-center text-center">
      <Card>
        <CardBody>
          <Heading size="lg" as="h1" className="mx-5 title-color">
            Verificando login!
          </Heading>
          <SpinnerLoading />
          <Heading size="md" as="h2" className="title-color">
            Caso não esteja logado, você será redirecionado para a tela de
            login/cadastro.
          </Heading>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginRedirect;
