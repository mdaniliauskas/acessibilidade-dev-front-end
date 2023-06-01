import React, { useState } from "react";
import ProgressBar from "../../components/ProgressBar/";
import RegisterForm from "./RegisterForm";
import { Heading } from "@chakra-ui/react";

function RegisterPage() {
  const [porcentage, setPorcentage] = useState(0);

  return (
    <div className='container pt-5'>
      <Heading>Cadastro</Heading>
      <ProgressBar number={porcentage} />
      <RegisterForm handlePorcentage={(p) => setPorcentage(p)} />
    </div>
  );
}

export default RegisterPage;
