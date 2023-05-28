import React from "react";
import { Tag, TagLabel } from "@chakra-ui/react";

function CategoryTag({ name, value, index, selected, callback }) {
  return (
    <Tag
      as="button"
      size="lg"
      rounded="full"
      bg={selected == index ? "#909090" : "#D9D9D9"}
      color={selected == index ? "#fff" : "#000"}
      onClick={() => callback(index)}
    >
      <TagLabel>{name}</TagLabel>
      <Tag color="#fff" rounded="full" bg="#B8B7B7" ml={3}>
        {value}
      </Tag>
    </Tag>
  );
}

export default CategoryTag;
