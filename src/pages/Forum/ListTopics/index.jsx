import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

import TextCard from "../../../components/TextCard";
import useFetch from "../../../hooks/useFetch";

import { Spinner } from "@chakra-ui/react";

import { LIST_TOPICS } from "../../../utils/constants/api";

const ListTopics = () => {
  const { data, error, isPending } = useFetch(LIST_TOPICS);

  return (
    <div>
      <Heading>Fórum</Heading>
      <Flex wrap={"wrap"}>
        {isPending ? (
          <Spinner />
        ) : error ? (
          JSON.stringify(error)
        ) : (
          data.message.map((t) => (
            <Box flex={1} minWidth="50%" px={10} py={3} key={t.id}>
              <TextCard />
            </Box>
          ))
        )}
      </Flex>
    </div>
  );
};

export default ListTopics;
