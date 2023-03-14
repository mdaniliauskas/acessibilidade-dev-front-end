import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";


import { NEWTOPIC } from "../../../utils/constants/api";

// icones

import styles from "./styles.module.css";

import errorValidation from "../../../utils/validations/ErrorValidation";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const NewTopicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    fetch(NEWTOPIC, {
      mode: 'no-cors',
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw Error("Deu ruim");
        return res.json();
      })
      .then((data) => {
        console.log("Cadastrou o usuário");
        console.log("Usuário cadastrado:", data);
      })
      .catch((err) => console.error("Deu erro na requisicao ", err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors.first_name}>
        <FormLabel htmlFor="title" className={styles.registerLabels}>
          Nome
        </FormLabel>
        <Input
          id="title"
          placeholder="Digite o título do tópico"
          isInvalid={errors.title ? true : false}
          {...register("title", {
            ...errorValidation.title,
            ...errorValidation.filled,
          })}
        />
        {!errors.first_name ? (
          <FormHelperText>
            O campo deve possui no mínimo 2 de caracteres.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.first_name.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors.last_name}>
        <FormLabel htmlFor="lastName" className={styles.registerLabels}>
          Sobrenome
        </FormLabel>
        <Input
          id="lastName"
          placeholder="Digite o seu sobrenome"
          isInvalid={errors.last_name ? true : false}
          {...register("last_name", {
            ...errorValidation.names,
            ...errorValidation.filled,
          })}
        />
        {!errors.last_name ? (
          <FormHelperText>
            O campo deve possui no mínimo 2 de caracteres.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.last_name.message}</FormErrorMessage>
        )}
      </FormControl>
    </form>
  );
}

export default NewTopicForm;
