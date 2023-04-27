import React, { useState } from "react";

import { useParams } from "react-router-dom";

import useFetch from "../../../hooks/useFetch";
import { TOPIC_DETAILS } from "../../../utils/constants/api";
import {
  Alert,
  Box,
  Divider,
  Flex,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/react";
import Preview from "../../../components/Markdown/Preview";
import { dateFormatted } from "../../../utils/formatters/datetime";
import SpinnerLoading from "../../../components/SpinnerLoading";
import CustomButton from "../../../components/CustomButton";
import Editor from "../../../components/Markdown/Editor";

const TopicDetails = () => {
  const params = useParams();

  const [txtReply, setTxtReply] = useState("");

  const [isValidBodyReply, setIsValidBodyReply] = useState(true);

  const {
    data: { message: topic },
    error,
    isPending,
  } = useFetch(TOPIC_DETAILS + "/" + params.topicId);

  const onSubmitReply = () => {
    console.log("submentendo resposta");

    setIsValidBodyReply(txtReply.length >= 20);

    /**
     * proximos passos
     *
     * validar se o texto é maior ou igual a 20
     * se for, pegar o id do usuario logado, atraves do obj user do useAuth()
     * e fazer a requisicao post para o endpoint de resposta
     *
     * caso seja menor, mostrar texto (codigo da linha 44)
     *
     * requisicao bem sucedida, ver como vem o body do json
     * se vier com o obj completo da resposta, adicionar no array de respostas do topic,
     * poupando uma requisicao para poder listar a nova resposta
     * se não vier o obj completo, fazer a tela recarregar para que seja feita uma nova busca do topico completo
     *
     *
     * requisicao mal sucedida, pedir para o usuario tentar novamente.
     */
  };

  return (
    <div className="md:container mx-auto">
      {isPending ? <SpinnerLoading /> : null}

      {!isPending && !error ? (
        <>
          <div className="flex mt-5 justify-between items-center">
            <Heading size="lg" mt={10}>
              {topic.title}
            </Heading>
            <a href="#nova-resposta">
              <CustomButton type="button">Nova Resposta</CustomButton>
            </a>
          </div>
          <Text>
            Publicada em: {dateFormatted(new Date(topic.date_published))}
          </Text>
          <Box mt={3}>
            {topic.tags.map((t, i) => (
              <Tag key={`${t}${i}`} m={2}>
                {t.tag.title.toUpperCase()}
              </Tag>
            ))}
          </Box>
          <Divider />
          <Box p={7}>
            <Preview text={topic.description} />
          </Box>
          <Flex justify="flex-end" mb={2}>
            <Heading size="sm">
              Autor: {topic.author.first_name} {topic.author.last_name}
            </Heading>
          </Flex>
          <Divider />

          <Heading size="md" my={5}>
            Respostas{" "}
            <Tag size="md" colorScheme="gray" borderRadius="full">
              {topic.replies.length}
            </Tag>
          </Heading>
          <Divider />

          {topic.replies.map((r, i) => (
            <div key={`${r.author.first_name}${i}`} mt={3}>
              <Box p={7}>
                <Preview text={r.description} />
              </Box>
              <Flex justify="space-between" mb={2}>
                <Text>
                  Publicada em: {dateFormatted(new Date(r.date_published))}
                </Text>
                <Heading size="sm">
                  Autor: {r.author.first_name} {r.author.last_name}
                </Heading>
              </Flex>
              <Divider />
            </div>
          ))}

          <Box id="nova-resposta" mt={10}>
            <Heading size="md">Sua Resposta</Heading>
            <Tabs my={10}>
              <TabList>
                <Tab>Editor</Tab>
                <Tab>Visualização</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Editor text={txtReply} handleText={setTxtReply} />
                </TabPanel>
                <TabPanel>
                  <Preview text={txtReply} />
                </TabPanel>
              </TabPanels>
              {!isValidBodyReply ? (
                <Text color="#F00">
                  O texto deve ter no mínimo 20 caracteres!
                </Text>
              ) : null}
            </Tabs>

            <CustomButton type="button" onClick={() => onSubmitReply()}>
              Postar Resposta
            </CustomButton>
          </Box>
        </>
      ) : null}

      {error ? (
        <Alert status="error">
          Houve um erro ao tentar busca o tópico, por favor, tente novamente!
        </Alert>
      ) : null}
    </div>
  );
};

export default TopicDetails;
