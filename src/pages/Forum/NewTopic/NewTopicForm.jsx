import React, { useState } from "react";
import { useForm } from "react-hook-form";

//titulo
import { Heading } from "@chakra-ui/react";

import { NEWTOPIC } from "../../../utils/constants/api";

import styles from "./styles.module.css";

import errorValidation from "../../../utils/validations/ErrorValidation";

import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Select,
} from "@chakra-ui/react";
import CustomButton from "../../../components/CustomButton";
import Editor from "../../../components/Markdown/Editor";
import Preview from "../../../components/Markdown/Preview";
import InputTags from "../../../components/InputTags";

import { useAuth0 } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";

const NewTopicForm = () => {
  const { user } = useAuth0();

  const [mdText, setMdText] = useState("");

  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit, //Esta função receberá os dados do formulário se a validação do formulário for bem sucedida.
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (formData) => {
    const body = {
      title: formData.title,
      description: mdText,
      authorId: user.id,
      categoryId: parseInt(formData.category),
      tags,
    };

    console.log(body);
    const res = await fetch(NEWTOPIC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.success) {
      navigate("/forum", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading>Novo tópico</Heading>

      <br></br>
      <FormControl isRequired isInvalid={errors.title}>
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
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>

      <Tabs>
        <TabList>
          <Tab>Editor</Tab>
          <Tab>Visualização</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Editor text={mdText} handleText={setMdText} />
          </TabPanel>
          <TabPanel>
            <Preview text={mdText} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <InputTags onAddTag={setTags} tags={tags} textLabel={"Tags"} />

      <Flex justify={"space-between"}>
        <FormControl isRequired isInvalid={errors.category}>
          <FormLabel className={styles.registerLabels}>Categoria</FormLabel>
          <Select
            size={"md"}
            w={280}
            id="SelectOption"
            {...register("category", {
              ...errorValidation.filled,
            })}
            placeholder="Selecione uma categoria"
          >
            <option value="1">Deficiência Auditiva</option>
            <option value="2">Deficiência Motora</option>
            <option value="3">Deficiência Visual</option>
          </Select>
          {errors.category ? (
            <FormErrorMessage>{errors.category.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <CustomButton>Publicar</CustomButton>
      </Flex>
    </form>
  );
};

export default NewTopicForm;
