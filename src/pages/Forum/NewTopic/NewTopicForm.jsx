import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import MDEditor, {commands} from '@uiw/react-md-editor';



import { NEWTOPIC } from "../../../utils/constants/api";

// icones

import styles from "./styles.module.css";

import errorValidation from "../../../utils/validations/ErrorValidation";

import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

const NewTopicForm = () => {

  const [value, setValue] = React.useState("Teste");

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
          Título
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
        {!errors.title ? (
          <FormHelperText>
            O campo deve possui no mínimo 2 de caracteres.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.title.title}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors.description}>
        <FormLabel htmlFor="description" className={styles.registerLabels}>
          Sobrenome
        </FormLabel>
        <Input
          id="description"
          placeholder="Digite o seu sobrenome"
          isInvalid={errors.description ? true : false}
          {...register("last_name", {
            ...errorValidation.description,
            ...errorValidation.filled,
          })}
        />
        {!errors.description ? (
          <FormHelperText>
            O campo deve possui no mínimo 2 de caracteres.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.last_name.message}</FormErrorMessage>
        )}
      </FormControl>

      <Tabs>
        <TabList>
          <Tab>Editor</Tab>
          <Tab>Visualização</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MDEditor
              value={value}
              onChange={setValue}
              translate="pt-BR"
              preview="edit"
            />
          </TabPanel>
          <TabPanel>
            <Card variant='outline'>
              <CardBody>
                <MDEditor.Markdown source={value} />
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </form>
  );
}

export default NewTopicForm;
