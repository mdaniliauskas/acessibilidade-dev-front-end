import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton/";

import React from "react";

function LoginForm() {
  return (
    <form>
      <FormControl>
        <FormLabel>E-mail:</FormLabel>
        <Input id="email" type="email" placeholder="Digite aqui o seu e-mail" />
      </FormControl>

      <FormControl>
        <FormLabel>Senha:</FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="Digite aqui sua senha"
        />
      </FormControl>
      <CustomButton type="submit" bg="green" bhHover="green.60">
        Entrar
      </CustomButton>
    </form>
  );
}

export default LoginForm;
