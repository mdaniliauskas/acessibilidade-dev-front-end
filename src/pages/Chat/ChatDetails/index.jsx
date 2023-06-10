import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import { LogOut, Send, X } from "react-feather";
import {
  registerMember,
  updateData,
  TIMESTAMP,
  getChatDetails,
  getListMessages,
  unregisterMember,
  unsubscription,
  writeData,
} from "../../../services/chat.service.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { dateTimeFormatted } from "../../../utils/formatters/datetime.js";

import SpinnerLoading from "../../../components/SpinnerLoading";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

import "./style.css";

const ChatDetails = () => {
  const { chatId } = useParams();
  const textAreaRef = useRef();
  const chatMessages = useRef(null);
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [heightTextArea, setHeightTextArea] = useState(24 * 3);
  const [messageList, setMessageList] = useState([]);
  const [chatInfo, setChatInfo] = useState({});

  const sanitizeConfig = {
    allowedTags: ["br"],
  };

  const checkShortcut = (e) => {
    if (!e.shiftKey && e.keyCode === 13) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextAreaRows = (e) => {
    let lineCount = e.target.value.split("\n").length;
    // setHeightTextArea(lineCount * 24);
  };

  const handleSendMessage = async () => {
    let message = textAreaRef.current.value;

    if (message.trim().length >= 1) {
      const payload = {
        path: `messages/${chatId}`,
        data: {
          author: user.nickname,
          message: message.split("\n").join("<br>"),
          createdAt: TIMESTAMP(),
        },
      };
      try {
        await writeData(payload);
        textAreaRef.current.value = null;
      } catch (e) {
        console.error(e.message);
      }
    }
    textAreaRef.current.value = "";

    if (chatMessages.current) {
      chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
    }
  };

  const searchMessage = (snapshot) => {
    setMessageList(snapshot);
  };

  const searchChatInfo = (info) => {
    setChatInfo(info);
  };

  const getHeightScreen = () => {
    const heightScreen = document.querySelector("html").clientHeight;
    const heightNavbar = document.querySelector("#navbar").clientHeight;

    document.querySelector(".chat-container").style.height = `${
      heightScreen - heightNavbar
    }px`;
  };

  useEffect(() => {
    getHeightScreen();
    if (!isLoading) {
      getChatDetails(`${chatId}`, searchChatInfo);
      getListMessages(`${chatId}`, searchMessage);
      registerMember(`members/${chatId}/${user.id}`);
    }

    return () => {
      unsubscription();
      unregisterMember(`members/${chatId}/${user.id}`);
      const payload = {
        path: `messages/${chatId}`,
        data: {
          message: `${user.nickname} saiu da sala.`,
          createdAt: TIMESTAMP(),
        },
      };
      try {
        writeData(payload);
      } catch (e) {
        console.error(e.message);
      }
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Box>
          <Box className="container py-sm-5 chat-container">
            <Box className="chat-options row justify-content-center justify-content-md-between h-auto mb-4">
              <Box className="col-10 col-md-12 col-xxl-auto">
                <Heading as="h1" className="capitalize">
                  {chatInfo?.title}
                </Heading>
              </Box>

              <Box className="col-10 col-md-12 col-xxl-auto mt-3 mt-xxl-0">
                {chatInfo?.ownerId === user.id && chatInfo.isOpen ? (
                  <Button
                    className="m-1 col-12 col-md-4 col-lg-auto"
                    colorScheme="red"
                    rightIcon={<X />}
                    type="button"
                    onClick={() => {
                      let updates = {};
                      let oldInfos = { ...chatInfo };
                      delete oldInfos.key;
                      updates[`chats/${chatId}`] = {
                        ...oldInfos,
                        isOpen: false,
                      };
                      updateData(updates);
                      navigate("/chat", { replace: true });
                    }}
                  >
                    Encerrar discussão
                  </Button>
                ) : null}
                <Button
                  className="m-1 col-12 col-md-4  col-lg-auto"
                  colorScheme="facebook"
                  rightIcon={<LogOut />}
                  type="Button"
                  onClick={() => navigate("/chat", { replace: true })}
                >
                  Sair da Sala
                </Button>
              </Box>
            </Box>

            <Box
              className="row justify-content-center chat-messages"
              ref={chatMessages}
            >
              <Box className="col-11 col-md bg-white p-4 border rounded ">
                <Box className="mb-3">
                  <Heading as="h2" size="md">
                    Seja bem-vindo a
                    <span className="capitalize">{chatInfo.title}</span>
                  </Heading>
                </Box>
                <Box>
                  <hr />
                  {messageList.map((m, index) => {
                    if (index === messageList.length - 1) {
                      // Executar ação após o término do map
                      setTimeout(() => {
                        if (chatMessages.current) {
                          chatMessages.current.scrollTop =
                            chatMessages.current.scrollHeight;
                        }
                      }, 100);
                    }
                    return m.author ? (
                      <Box key={m.key} className="mt-3">
                        <Box className="d-flex justify-content-between">
                          <p>{m.author}</p>
                          <p>{dateTimeFormatted(new Date(m.createdAt))}</p>
                        </Box>
                        <Box className="p-1 pb-3">
                          <MDEditor.Markdown
                            source={m.message}
                            rehypePlugins={
                              ([rehypeSanitize],
                              [
                                {
                                  allowedTags: ["br"], // permite o br para poder realizar as quebras de linhas
                                },
                              ])
                            }
                          />
                        </Box>
                      </Box>
                    ) : m.message.includes(user.nickname) ? (
                      <Box key={m.key} className="px-1 py-3 mt-1">
                        <Text className="title-color text-center">
                          {m.message.split(user.nickname).join("Você")}
                        </Text>
                      </Box>
                    ) : (
                      <Box key={m.key} className="px-1 py-3 mt-1">
                        <Text className="title-color text-center">
                          {m.message}
                        </Text>
                      </Box>
                    );
                  })}

                  {!chatInfo.isOpen ? (
                    <Heading>A sala {chatInfo.title} foi encerrada.</Heading>
                  ) : null}
                </Box>
              </Box>
            </Box>
            <Box className="row justify-content-center send-message h-auto rounded">
              <Box className=" col-11 col-md p-3 ">
                <Box
                  id="chatContainer"
                  className="px-3 py-1 border rounded border-light-subtle border-1 row bg-white"
                >
                  <textarea
                    id="textmessage"
                    className="m-0 p-0 overflow-y-scroll col"
                    style={{
                      maxHeight: 200,
                      height: heightTextArea,
                      outline: "none",
                      resize: "none",
                    }}
                    tabIndex={0}
                    onChange={handleTextAreaRows}
                    onKeyDown={checkShortcut}
                    placeholder={`Conversar em ${chatInfo.title}`}
                    readOnly={!chatInfo.isOpen}
                    ref={textAreaRef}
                  />
                  <Button
                    aria-label={`Enviar mensagem na sala ${chatInfo.title}`}
                    onClick={handleSendMessage}
                    isDisabled={!chatInfo.isOpen}
                    bgColor="white"
                    _hover="white"
                    className="col-auto p-0 align-self-center"
                    h="24px"
                  >
                    <Send />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChatDetails;
