import React, {useEffect, useRef, useState} from "react"
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Box, Button, Flex, Heading, IconButton, Input, InputGroup, InputRightElement, Textarea} from "@chakra-ui/react";
import {LogOut, Send, X} from "react-feather";
import TextArea from "@uiw/react-md-editor/lib/components/TextArea/index.js";
import {subscription, TIMESTAMP, writeData} from "../../../services/chat.service.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {dateFormatted} from "../../../utils/formatters/datetime.js";
import SpinnerLoading from "../../../components/SpinnerLoading/index.jsx";

const ChatDetails = () => {
  const {chatId} = useParams();
  const {state: chatInfos} = useLocation();
  const textAreaRef = useRef();
  const {user} = useAuth0();

  const [rowsTextArea, setRowsTextArea] = useState(1);
  /*  const [heightTextArea, setHeightTextArea] = useState("");*/
  const [messageList, setMessageList] = useState([]);


  const handleTextAreaRows = () => {
    let height = parseInt(textAreaRef.current.scrollHeight);
    let bottom = textAreaRef;
    let lineHeight = parseInt(window.getComputedStyle(textAreaRef.current).lineHeight);
    const newRowsTextArea = Math.floor(height / lineHeight);
    //setHeightTextArea(newRowsTextArea * lineHeight + "px")
    setRowsTextArea(Math.floor(height / lineHeight));
  }


  const handleSendMessage = async (e) => {
    e.preventDefault();
    const payload = {
      path: `chats/${chatId}/messages`,
      data: {
        autor: user.nickname,
        message: textAreaRef.current.value,
        createdAt: TIMESTAMP()
        ,
      }
    }
    try {
      await writeData(payload);
      console.log("mensagem enviada com sucesso!");

    } catch (e) {
      console.error(e.message);
    }
  }

  const searchMessage = (snapshot) => {
    setMessageList(snapshot);
  }

  useEffect(() => {
    subscription(`chats/${chatId}/messages`, searchMessage);
  }, [])



  return (
    <>
      <Box className="md:container mx-auto">
        <Box className="flex my-5" justifyContent="space-between">
          <Heading as="h1" className="capitalize">{chatInfos.title}</Heading>
          <Box>
            <Button colorScheme='red' rightIcon={<X/>} >
              Encerrar discussão
            </Button>
            <Button colorScheme='facebook' rightIcon={<LogOut/>} ml="15px">
              Sair da Sala
            </Button>
          </Box>
        </Box>

        <Box border='1px' borderColor='gray.100' borderRadius="xl" padding="15px" my="5px">
          <Box>
            <Box mx="30px" mt="5px" mb="15px">
              <Heading as="h2" size='md'>Seja bem-vindo a <span className="capitalize">{chatInfos.title}</span></Heading>
            </Box>
            {messageList.length > 0 ? messageList.map((m) => (
              <Box mx="30px" my="5px" borderBottom="1px" borderTop="1px" borderColor='gray.100' padding="15px" key={m.key}>
                <Box className="flex" justifyContent="space-between">
                  <p>{m.autor}</p>
                  <p>{new Date(m.createdAt).toString()}</p>
                </Box>
                <Box mt={2}>
                  <p>{m.message}</p>
                </Box>
              </Box>
              )):
            (
              <Box padding="20px">

              </Box>
            )
            }
          </Box>
          <Box p={1}>
            {/*            <Textarea h={heightTextArea} ref={textAreaRef} onChange={handleTextAreaRows} w="100%" placeholder="Conversar em <Nome da sala>"/>*/}
            <Textarea ref={textAreaRef} onChange={handleTextAreaRows} w="100%" placeholder={`Conversar em ${chatInfos.title}`}
                      rows={rowsTextArea}/>
            <Button mt={1} aria-label="Enviar mensagem na sala <Nome da sala>" rightIcon={<Send/>}
              onClick={handleSendMessage} > Enviar </Button>
          </Box>

        </Box>
      </Box>
    </>
  )
}

// scrollHeight / lineHeight

export default ChatDetails;