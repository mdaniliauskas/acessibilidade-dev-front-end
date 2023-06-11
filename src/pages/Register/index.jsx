import React, { useState } from "react";
import ProgressBar from "../../components/ProgressBar/";
import RegisterForm from "./RegisterForm";
import { Heading } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

function RegisterPage() {
  const [porcentage, setPorcentage] = useState(0);
  const { user } = useAuth0();

  return (
    <div className="container pt-5">
      <Heading>Cadastro</Heading>
      {user.completedProfile ? (
        <div className="">
          <Heading size="md" as="h2">
            Você já Completou o seu cadastro!
          </Heading>
        </div>
      ) : (
        <>
          <ProgressBar number={porcentage} />
          <RegisterForm handlePorcentage={(p) => setPorcentage(p)} />
        </>
      )}
    </div>
  );
}

export default RegisterPage;
