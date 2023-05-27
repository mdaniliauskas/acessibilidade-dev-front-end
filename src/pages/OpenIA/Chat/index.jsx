import { React, useRef, useState } from 'react'
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { Send } from "react-feather";


const Chat = () => {
  const inputRef = useRef();
  const [result, setResult] = useState("");
  const handleSendMessage = async (e) => {
    e.preventDefault();
    fetch('https://acessibilidade-dev-back-end.herokuapp.com/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "text": inputRef.current.value
      })
    })
    .then(response => response.json()) 
    .then(data => {
      setResult(data.result);
    })
    .catch(error => {
    console.error('Erro:', error);
  });
  }
  return (
    <div>
          <Box className="md:container mx-auto">
            <Box className="flex my-5" justifyContent="space-between">
              <Heading as="h1" className="capitalize">
                Open IA Chat
              </Heading>
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
                Olá, seja bem-vindo! 
              </Heading>
              <br/>
              <Heading as="h3" size="md">
                Meu nome é <strong>OpenIA</strong> e sou um assistente virtual que pode te ajudar a tirar dúvidas sobre acessibilidade.
              </Heading>
              <br/>
              <Heading as="h4" size="md">
                O que você gostaria de saber?
              </Heading>
              <br/>
                </Box>
          </Box>
            {result}
          <Box>
          </Box>
              <Box p={1}>
            <Input placeholder='Basic usage' ref={inputRef} />
                <Button
                  mt={1}
                  aria-label="Enviar mensagem na sala <Nome da sala>"
                  rightIcon={<Send />}
                  onClick={handleSendMessage}
                >
                  Enviar
                </Button>
              </Box>
            </Box>
          </Box>
    </div>
  )
}

export default Chat