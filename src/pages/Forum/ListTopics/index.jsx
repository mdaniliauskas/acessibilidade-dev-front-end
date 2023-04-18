import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

import TextCard from "../../../components/TextCard";
import useFetch from "../../../hooks/useFetch";

import { Spinner } from "@chakra-ui/react";

import { LIST_TOPICS } from "../../../utils/constants/api";

import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";

const ListTopics = () => {
  const { data, error, isPending } = useFetch(LIST_TOPICS);

  const navigate = useNavigate();

  return (
    <div>
      <Flex justify="space-between" alignItems="center">
        <Heading>Fórum</Heading>
        <CustomButton
          onClick={() => navigate("/forum/novo-topico", { replace: true })}
        >
          Novo Tópico
        </CustomButton>
      </Flex>
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
