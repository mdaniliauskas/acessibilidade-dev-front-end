import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

import TextCard from "../../../components/TextCard";
import useFetch from "../../../hooks/useFetch";

import { Spinner } from "@chakra-ui/react";

import { LIST_TOPICS } from "../../../utils/constants/api";

import { useNavigate, Link } from "react-router-dom";

import CustomButton from "../../../components/CustomButton";

import { useAuth0 } from "@auth0/auth0-react";
import SpinnerLoading from "../../../components/SpinnerLoading";

const ListTopics = () => {
  const { data, error, isPending } = useFetch(LIST_TOPICS);

  const { isAuthenticated, user } = useAuth0();

  const navigate = useNavigate();

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
        JSON.stringify(error)
      ) : (
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
      )}
    </div>
  );
};

export default ListTopics;
