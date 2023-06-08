import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import TextCard from "../../../components/TextCard";

import { useNavigate } from "react-router-dom";

import CustomButton from "../../../components/CustomButton";

import { useAuth0 } from "@auth0/auth0-react";
import SpinnerLoading from "../../../components/SpinnerLoading";
import {
  getListChats,
  unsubscription,
  TIMESTAMP,
  writeData,
} from "../../../services/chat.service.jsx";

const ListChats = () => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(true);
  const [chatList, setChatList] = useState([]);

  const searchChats = (snapshot) => {
    setChatList(snapshot);
    setIsPending(false);
  };

  useEffect(() => {
    getListChats(searchChats, { onlyOnce: true });

    return function cleanup() {
      unsubscription();
    };
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-between">
        <div className="col-auto">
          <Heading>Salas de discussão</Heading>
        </div>
        <div className="col-auto">
          {isAuthenticated && user.completedProfile ? (
            <CustomButton
              onClick={() => navigate("/chat/novo-chat", { replace: true })}
            >
              Nova Sala
            </CustomButton>
          ) : null}
        </div>
      </div>

      {isPending ? (
        <SpinnerLoading />
      ) : (
        <>
          <div className="">
            {chatList.map((c) => (
              <Box px={10} py={3} key={c.key}>
                <TextCard
                  onClick={async () => {
                    const payload = {
                      path: `messages/${c.key}`,
                      data: {
                        message: `O usuário ${user.nickname} entrou na sala.`,
                        createdAt: TIMESTAMP(),
                      },
                    };
                    try {
                      await writeData(payload);
                    } catch (e) {
                      console.error(e.message);
                    }
                    navigate(`/chat/${c.key}`, { replace: true });
                  }}
                  title={c.title}
                  body={c.description}
                  date_published={new Date(c.createdAt)}
                  replies={c.members}
                  author={c.createdBy}
                />
              </Box>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListChats;
