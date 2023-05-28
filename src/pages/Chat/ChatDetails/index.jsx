import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, Heading, Text, Textarea } from "@chakra-ui/react";
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
import Preview from "../../../components/Markdown/Preview";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const ChatDetails = () => {
  const { chatId } = useParams();
  const textAreaRef = useRef();
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [heightTextArea, setHeightTextArea] = useState(24);
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
    setHeightTextArea(lineCount * 24);
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
        setHeightTextArea(24);
      } catch (e) {
        console.error(e.message);
      }
    }
    setHeightTextArea(24);
    textAreaRef.current.value = "";
  };

  const searchMessage = (snapshot) => {
    setMessageList(snapshot);
  };

  const searchChatInfo = (info) => {
    setChatInfo(info);
  };

  useEffect(() => {
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
          message: `O usuário ${user.nickname} saiu da sala.`,
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
        <>
          <Box className="md:container mx-auto">
            <Box className="flex my-5" justifyContent="space-between">
              <Heading as="h1" className="capitalize">
                {chatInfo?.title}
              </Heading>
              <Box>
                {chatInfo?.ownerId === user.id && chatInfo.isOpen ? (
                  <Button
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
                  colorScheme="facebook"
                  rightIcon={<LogOut />}
                  ml="15px"
                  type="Button"
                  onClick={() => navigate("/chat", { replace: true })}
                >
                  Sair da Sala
                </Button>
              </Box>
            </Box>

            <Box
              border="1px"
              borderColor="gray.100"
              borderRadius="xl"
              padding="15px"
              my="5px"
            >
              <Box>
                <Box mx="30px" mt="5px" mb="15px">
                  <Heading as="h2" size="md">
                    Seja bem-vindo a{" "}
                    <span className="capitalize">{chatInfo.title}</span>
                  </Heading>
                </Box>
                <Box>
                  {messageList.map((m) =>
                    m.author ? (
                      <Box
                        mx="30px"
                        my="5px"
                        padding="15px"
                        borderBottom="1px"
                        borderTop="1px"
                        borderColor="gray.100"
                        key={m.key}
                      >
                        <Box className="flex" justifyContent="space-between">
                          <p>{m.author}</p>
                          <p>{dateTimeFormatted(new Date(m.createdAt))}</p>
                        </Box>
                        <Box>
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
                    ) : (
                      <Box
                        mx="30px"
                        my="5px"
                        padding="15px"
                        borderColor="gray.100"
                        key={m.key}
                      >
                        <Box className="flex" justifyContent="center">
                          <Text color="gray">{m.message}</Text>
                        </Box>
                      </Box>
                    )
                  )}

                  {!chatInfo.isOpen ? (
                    <Heading
                      as="h2"
                      size="sm"
                      textAlign="center"
                      p="5"
                      color="red"
                    >
                      A sala {chatInfo.title} foi encerrada.
                    </Heading>
                  ) : null}
                </Box>
              </Box>
              <Box className="p-2">
                <Box
                  id="chatContainer"
                  className="px-3 py-1 border rounded border-light-subtle border-1 row"
                >
                  <textarea
                    id="textmessage"
                    className="m-0 p-0 overflow-y-scroll col-11"
                    style={{
                      maxHeight: 200,
                      height: heightTextArea,
                      outline: "none",
                      resize: "none",
                    }}
                    rows="1"
                    tabIndex={0}
                    onChange={handleTextAreaRows}
                    onKeyDown={checkShortcut}
                    placeholder={`Conversar em ${chatInfo.title}`}
                    isReadOnly={!chatInfo.isOpen}
                    ref={textAreaRef}
                  />
                  <Button
                    aria-label={`Enviar mensagem na sala ${chatInfo.title}`}
                    onClick={handleSendMessage}
                    isDisabled={!chatInfo.isOpen}
                    bgColor="white"
                    _hover="white"
                    className="col-1 p-0 align-self-end"
                    h="24px"
                  >
                    <Send />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

// scrollHeight / lineHeight

export default ChatDetails;
