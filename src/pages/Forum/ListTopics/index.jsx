import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";

import { Alert, Box, Heading} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

import { TextCard, CustomButton, SpinnerLoading, CategoryFilter } from "../../../components/";

import { getListTopics } from "../../../services/forum.service";

const ListTopics = () => {
  const [error, setError] = useState(false)
  const [listTopics, setListTopics] = useState([])
  const { isAuthenticated, user } = useAuth0(); 

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const {success, data} = await getListTopics();
      if(success) {
        setListTopics(data);
      } else {
        console.error(e);
        setError(e);  
      }
    })()
  }, [])

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

      {listTopics.length === 0 ? (
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
            {listTopics.message.map((t) => (
              <Box className="col-lg-9 col-xxl-6 p-2" key={t.id}>
                <Link to={`/forum/topico/${t.id}`}>
                  <TextCard
                    title={t.title}
                    body={t.description}
                    date_published={t.date_published}
                    replies={t.replies}
                    author={t.author}
                    votos={t.votes}
                    status={t.status}
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
