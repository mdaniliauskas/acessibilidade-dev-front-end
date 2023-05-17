import React, {useRef, useState} from "react"
import {useParams} from "react-router-dom";
import {Box, Button, Flex, Heading, IconButton, Input, InputGroup, InputRightElement, Textarea} from "@chakra-ui/react";
import {Send, X} from "react-feather";
import TextArea from "@uiw/react-md-editor/lib/components/TextArea/index.js";

const ChatDetails = () => {
  const params = useParams();
  const textAreaRef = useRef();
  //const [rowsTextArea, setRowsTextArea] = useState(1);
  const [heightTextArea, setHeightTextArea] = useState("auto");
  

  const handleTextAreaRows = () => {
    let height = parseInt(textAreaRef.current.scrollHeight);
    let lineHeight = parseInt(window.getComputedStyle(textAreaRef.current).lineHeight);
    const newRowsTextArea =Math.ceil(height/lineHeight);

    console.log(lineHeight)
    console.log(height/lineHeight)
    console.log(newRowsTextArea)
    console.log(newRowsTextArea * lineHeight + "px")
    setHeightTextArea(newRowsTextArea * lineHeight + "px")
    //setRowsTextArea(Math.floor(height/lineHeight));
  }

  return (
    <>
      <Box className="md:container mx-auto">
        <Box className="flex my-5" justifyContent="space-between">
          <Heading>Título da sala</Heading>
          <Button colorScheme='red' rightIcon={<X/>}>
            Fechar Sala
          </Button>
        </Box>

        <Box border='1px' borderColor='gray.100' borderRadius="xl" padding="15px" my="5px">
          <Box>
            <Box mx="30px" my="5px" borderBottom="1px" borderColor='gray.100' padding="15px">
              <Box className="flex" justifyContent="space-between">
                <p>autor</p>
                <p>data</p>
              </Box>
              <Box mt={2}>
                <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.</p>
              </Box>
            </Box>
            <Box mx="30px" my="5px" borderBottom="1px" borderColor='gray.100' padding="15px">
              <Box className="flex" justifyContent="space-between">
                <p>autor</p>
                <p>data</p>
              </Box>
              <Box mt={2}>
                <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.</p>
              </Box>
            </Box>
          </Box>
          <Box p={1}>
            <Textarea h={heightTextArea} ref={textAreaRef} onChange={handleTextAreaRows} w="100%" placeholder="Conversar em <Nome da sala>"/>
            <Button mt={1} aria-label="Enviar mensagem na sala <Nome da sala>" leftIcon={<Send />}> Enviar </Button>
          </Box>

        </Box>
      </Box>
    </>
  )
}

// scrollHeight / lineHeight

export default ChatDetails;