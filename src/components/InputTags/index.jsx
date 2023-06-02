import React, { useState } from "react";

import {
  Card,
  CardBody,
  Flex,
  FormLabel,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Tag,
  TagCloseButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const InputTags = ({ textLabel, onAddTag, tags }) => {
  const { register, getFieldState } = useForm();

  const { isTouched } = getFieldState("tags");

  // const [tags, setTags] = useState([]);

  const handleInput = (e) => {
    let tag = e.target.value.toUpperCase().trim();
    if (
      e.keyCode === 32 ||
      e.target.value.charCodeAt(e.target.value.length - 1) === 32
    ) {
      if (!tags.includes(tag) && tag !== "") {
        onAddTag([...tags, tag]);
      }
      e.target.value = " ";
    }
    return false;
  };

  const onDeleteTag = (elemt) => {
    onAddTag(tags.filter((t) => t !== elemt));
  };

  const isInvalidTagsAmount = isTouched && tags.length < 1;

  return (
    <Card>
      <CardBody>
        <FormControl isRequired isInvalid={isInvalidTagsAmount}>
          <FormLabel className="title-color" htmlFor="tags">
            {textLabel}
          </FormLabel>
          <Input
            type="text"
            placeholder="Exemplo: Javascript<Espaço>"
            {...register("tags")}
            onKeyUp={handleInput}
          />
          {!isInvalidTagsAmount ? (
            <FormHelperText>
              Adicione tags das tecnologias relacionadas ao tópico. Ex: React
              JS, JavaScript etc.
            </FormHelperText>
          ) : (
            <FormErrorMessage>
              Adicione tags das tecnologias relacionadas ao tópico. Ex: React
              JS, JavaScript etc.
            </FormErrorMessage>
          )}
        </FormControl>
        <Flex>
          {tags.map((t, index) => (
            <Tag key={index} colorScheme="teal" m={2}>
              {t}
              <TagCloseButton onClick={() => onDeleteTag(t)} />
            </Tag>
          ))}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default InputTags;
