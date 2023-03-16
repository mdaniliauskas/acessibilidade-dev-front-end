import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MDEditor, { commands } from "@uiw/react-md-editor";

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
  Select,
  Spacer,
} from "@chakra-ui/react";
import CustomButton from "../../../components/CustomButton";
import Editor from "../../../components/Markdown/Editor";
import Preview from "../../../components/Markdown/Preview";

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
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
            O campo deve possui no mínimo 20 de caracteres.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.title.title}</FormErrorMessage>
        )}
      </FormControl>

      <Tabs>
        <TabList>
          <Tab>Editor</Tab>
          <Tab>Visualização</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Editor text={value} handleText={setValue} />
          </TabPanel>
          <TabPanel>
            <Preview text={value} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex justify={"space-between"}>
        <Select size={"md"} w={280} id="SelectOption">
          <option value="0" disabled selected>
            Selecione uma categoria
          </option>
          <option value="1">Deficiência Motora</option>
          <option value="2">Deficiência Visual</option>
          <option value="3">Deficiência Auditiva</option>
          <option value="4">Deficiência Intelectual</option>
        </Select>
        <CustomButton>Publicar</CustomButton>
      </Flex>
    </form>
  );
};

export default NewTopicForm;
