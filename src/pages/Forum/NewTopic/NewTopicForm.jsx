import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

const NewTopicForm = () => {
  const [mdText, setMdText] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log({ ...formData, description: value });
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
        console.log("Tópico salvo");
        console.log("Tópico salvo:", data);
      })
      .catch((err) => console.error("Deu erro na requisicao ", err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <InputTags textLabel={"Tags"} />

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
