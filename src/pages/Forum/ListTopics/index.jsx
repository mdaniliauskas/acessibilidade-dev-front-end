import { Alert, Box, Heading, Tag, TagLabel } from "@chakra-ui/react";
import React, { useState } from "react";

import TextCard from "../../../components/TextCard";
import useFetch from "../../../hooks/useFetch";

import { LIST_TOPICS } from "../../../utils/constants/api";

import { useNavigate, Link } from "react-router-dom";

import CustomButton from "../../../components/CustomButton";

import { useAuth0 } from "@auth0/auth0-react";
import SpinnerLoading from "../../../components/SpinnerLoading";

const ListTopics = () => {
  const { data, error, isPending } = useFetch(LIST_TOPICS);
  const { isAuthenticated, user } = useAuth0();

  const navigate = useNavigate();

  const [categorySelected, setCategorySelected] = useState(0);

  const onFilterCategory = (category) => {
    setCategorySelected(category);
  };

  return (
    <div className="md:container mx-auto">
      <div className="flex mt-5 justify-between items-center">
        <Heading>Fórum</Heading>
        {isAuthenticated && user.completedProfile ? (
          <CustomButton
            onClick={() => navigate("/forum/novo-topico", { replace: true })}
          >
            Novo Tópico
          </CustomButton>
        ) : null}
      </div>

      {isPending ? (
        <SpinnerLoading />
      ) : error ? (
        (() => {
          console.error(error);
          return (
            <Alert status="error" mt={10}>
              Houve um erro ao tentar busca o tópico, por favor, tente
              novamente!
            </Alert>
          );
        })()
      ) : (
        <>
          <div>
            <Tag
              size="lg"
              rounded="full"
              px={5}
              bg={categorySelected == 0 ? "gray.400" : "gray.200"}
              onClick={() => onFilterCategory(0)}
              as="button"
            >
              <TagLabel>Todas</TagLabel>
              <Tag rounded="full" bg="gray.300" ml={3}>
                10
              </Tag>
            </Tag>
            <Tag
              size="lg"
              rounded="full"
              px={5}
              bg={categorySelected == 1 ? "gray.400" : "gray.200"}
              onClick={() => onFilterCategory(1)}
              as="button"
            >
              <TagLabel>Auditiva</TagLabel>
              <Tag rounded="full" bg="gray.300" ml={3}>
                10
              </Tag>
            </Tag>
            <Tag
              size="lg"
              rounded="full"
              px={5}
              bg={categorySelected == 2 ? "gray.400" : "gray.200"}
              onClick={() => onFilterCategory(2)}
              as="button"
            >
              <TagLabel>Motora</TagLabel>
              <Tag rounded="full" bg="gray.300" ml={3}>
                10
              </Tag>
            </Tag>
            <Tag
              size="lg"
              rounded="full"
              px={5}
              bg={categorySelected == 3 ? "gray.400" : "gray.200"}
              onClick={() => onFilterCategory(3)}
              as="button"
            >
              <TagLabel>Visual</TagLabel>
              <Tag rounded="full" bg="gray.300" ml={3}>
                10
              </Tag>
            </Tag>
          </div>
          <div className="grid gap-2 md:grid-cols-2 sm:grid-cols-1">
            {data.message.map((t) => (
              <Box px={10} py={3} key={t.id}>
                <Link to={`/forum/topico/${t.id}`}>
                  <TextCard
                    title={t.title}
                    body={t.description}
                    date_published={t.date_published}
                    replies={t.replies}
                    author={t.author}
                  />
                </Link>
              </Box>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListTopics;
