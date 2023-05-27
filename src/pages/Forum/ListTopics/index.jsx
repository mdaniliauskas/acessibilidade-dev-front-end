import { Alert, Box, Heading} from "@chakra-ui/react";
import React from "react";

import TextCard from "../../../components/TextCard";
import useFetch from "../../../hooks/useFetch";

import { LIST_TOPICS } from "../../../utils/constants/api";

import { useNavigate, Link } from "react-router-dom";

import CustomButton from "../../../components/CustomButton";

import { useAuth0 } from "@auth0/auth0-react";
import SpinnerLoading from "../../../components/SpinnerLoading";
import CategoryFilter from "../../../components/CategoryFilter";

const ListTopics = () => {
  const { data, error, isPending } = useFetch(LIST_TOPICS);
  const { isAuthenticated, user } = useAuth0();

  const navigate = useNavigate();

  return (
    <Box className="container">
      <Box className="row justify-content-between py-3">
        <Heading as="h2" color="#696666" style={{width: "fit-content"}}>Fórum</Heading>
        {isAuthenticated && user.completedProfile ? (
          <CustomButton
            onClick={() => navigate("/forum/novo-topico", { replace: true })}
          >
            Novo Tópico
          </CustomButton>
        ) : null}
      </Box>

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
          <Box>
            <CategoryFilter/>
          </Box>
          <Box className="row pt-3 justify-content-center">
            {data.message.map((t) => (
              <Box className="col-lg-9 col-xxl-6 p-2" key={t.id}>
                <Link to={`/forum/topico/${t.id}`}>
                  <TextCard
                    title={t.title}
                    body={t.description}
                    date_published={t.date_published}
                    replies={t.replies}
                    author={t.author}
                    votos={t.votes}
                  />
                </Link>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ListTopics;
