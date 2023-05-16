import {Alert, Box, Heading, Tag, TagLabel} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";

import TextCard from "../../../components/TextCard";

import {useNavigate, Link} from "react-router-dom";

import CustomButton from "../../../components/CustomButton";

import {useAuth0} from "@auth0/auth0-react";
import SpinnerLoading from "../../../components/SpinnerLoading";
import {subscription, unsubscription} from "../../../services/chat.service.jsx";

const ListChats = () => {
  const {isAuthenticated, user} = useAuth0();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(true);
  const [chatList, setChatList] = useState([]);

  const searchChats = (snapshot) => {
    console.log(snapshot);
    setChatList(snapshot);
    setIsPending(false);
  }

  useEffect(() => {
    subscription("chats", searchChats);

    return function cleanup() {
      unsubscription("chats")
    }
  }, [])

  return (
    <div className="md:container mx-auto">
      <div className="flex mt-5 justify-between items-center">
        <Heading>Salas de discussão</Heading>
        {isAuthenticated && user.completedProfile ? (
          <CustomButton
            onClick={() => navigate("/chat/novo-chat", {replace: true})}
          >
            Nova Sala
          </CustomButton>
        ) : null}
      </div>

      {isPending ? (
        <SpinnerLoading/>
      ) : false ? (
        (() => {
          // console.error(error);
          return (
            <Alert status="error" mt={10}>
              Houve um erro ao tentar busca o tópico, por favor, tente
              novamente!
            </Alert>
          );
        })()
      ) : (
        <>
          <div className="grid gap-2 md:grid-cols-2 sm:grid-cols-1">
            {chatList.map(c => (
              <Box px={10} py={3} key={c.key}>
                <Link to={`/chat/${c.key}}`}>
                  <TextCard
                    title={c.title}
                    body={c.description}
                    date_published={new Date(c.createdAt)}
                    replies={10}
                    author={c.createdBy}
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

export default ListChats;
