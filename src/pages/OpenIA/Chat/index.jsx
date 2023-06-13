import { React, useRef, useState } from "react";
import { Box, Button, Heading, Input, Spinner, Text } from "@chakra-ui/react";
import { Send } from "react-feather";

const Chat = () => {
  const inputRef = useRef();

  const [result, setResult] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState(0);

  const checkShortcut = (e) => {
    if (!e.shiftKey && e.keyCode === 13) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    setQuestion(inputRef.current.value);
    setResult("");
    setStatus(0);
    try {
      const response = await fetch(
        "https://acessibilidade-dev-back-end.herokuapp.com/openai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputRef.current.value,
          }),
        }
      );
      inputRef.current.value = "";
      const data = await response.json();
      setStatus(response.status);
      if (!response.ok && response.status === 400) {
        throw Error("Está dúvida não é sobre acessibilidade digital!");
      }
      setResult(data.result);
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };
  return (
    <Box className="container py-5">
      <Heading as="h1" className="capitalize title-color mx-2">
        IA Generativa
      </Heading>
      <Box className="row justify-content-center mx-2">
        <Box className="row bg-white border rounded p-3 my-3">
          <Box bg="#CDCBCB" className="border rounded p-3 ">
            <Heading className="title-color" as="h2" size="md">
              Olá, seja bem-vindo!
            </Heading>
            <br />
            <Heading className="title-color" as="h3" size="md">
              Essa seção é dedicada a tirar suas dúvidas sobre acessibilidade
              digital...
            </Heading>
            <br />
            <Heading className="title-color" as="h4" size="md">
              O que você gostaria de saber?
            </Heading>
            <br />
          </Box>
          {question !== "" ? (
            <Box className="mt-4">
              <Box className="mb-3">
                <Heading className="mb-2 title-color" as="h4" size="md">
                  Pergunta:
                </Heading>
                <Text className="title-color">{question}</Text>
              </Box>
              <Box>
                <Heading className="mb-2 title-color" as="h4" size="md">
                  Resultado:
                </Heading>
                {status === 0 ? (
                  <Box className="d-flex justify-content-center my-3">
                    <Spinner />
                  </Box>
                ) : result !== "" ? (
                  <Text className="title-color">{result}</Text>
                ) : status === 400 ? (
                  <Text className="title-color">
                    Por favor, reformule sua pergunta, parece que sua duvida não
                    é sobre acessibilidade!
                  </Text>
                ) : (
                  <Text className="title-color">
                    Ocorreu um erro, tente novamente mais tarde!
                  </Text>
                )}
              </Box>
            </Box>
          ) : null}
        </Box>
        <Box className="row bg-white border rounded p-0 px-3 py-1 border-light-subtle border-1 bg-white">
          <textarea
            id="textmessage"
            className="m-0 p-0 overflow-y-scroll col"
            style={{
              maxHeight: 200,
              height: 24 * 3,
              outline: "none",
              resize: "none",
            }}
            tabIndex={0}
            onKeyDown={checkShortcut}
            placeholder="Digite sua dúvida aqui..."
            readOnly={question !== "" && result === "" && status === 0}
            ref={inputRef}
          />
          <Button
            aria-label="Enviar mensagem de duvida"
            onClick={handleSendMessage}
            isDisabled={question !== "" && result === "" && status === 0}
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
  );
};

export default Chat;
