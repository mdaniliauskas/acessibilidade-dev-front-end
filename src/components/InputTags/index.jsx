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
    if (e.keyCode !== 32) return false;

    if (!tags.includes(tag) && tag !== "") {
      onAddTag([...tags, tag]);
    }
    e.target.value = " ";
  };

  const onDeleteTag = (elemt) => {
    onAddTag(tags.filter((t) => t !== elemt));
  };

  const isInvalidTagsAmount = isTouched && tags.length < 1;

  return (
    <Card>
      <CardBody>
        <FormControl isRequired isInvalid={isInvalidTagsAmount}>
          <FormLabel htmlFor="tags">{textLabel}</FormLabel>
          <Input type="text" {...register("tags")} onKeyUp={handleInput} />
          {!isInvalidTagsAmount ? (
            <FormHelperText>Texto para informar sobre o campo</FormHelperText>
          ) : (
            <FormErrorMessage>
              Texto para informar o erro de obrigatoriedade de campo
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
