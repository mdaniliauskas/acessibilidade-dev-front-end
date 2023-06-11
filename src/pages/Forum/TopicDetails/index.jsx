import React, { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import {
  NEWREPLY,
  TOPIC_DETAILS,
  UPDATE_VOTES,
} from "../../../utils/constants/api";
import {
  Alert,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
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
import { useAuth0 } from "@auth0/auth0-react";

import {
  closeTopic,
  getTopicDetails,
  voteTopic,
} from "../../../services/forum.service";
import { Triangle } from "react-feather";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

const TopicDetails = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const params = useParams();

  const [txtReply, setTxtReply] = useState("");
  const [isValidBodyReply, setIsValidBodyReply] = useState(true);

  const [error, setError] = useState(false);
  const [topic, setTopic] = useState({});

  const navigate = useNavigate();

  const onSubmitReply = async () => {
    let isValid = txtReply.length >= 20;
    setIsValidBodyReply(isValid);

    if (isValid) {
      const res = await fetch(NEWREPLY, {
        method: "POST",
        body: JSON.stringify({
          description: txtReply,
          authorId: user.id,
          topicId: topic.id,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
        },
      });
      const { message } = await res.json();
      topic.replies.push(message);
      setTxtReply("");
    }
  };

  const handleCloseTopic = async () => {
    const { success } = await closeTopic(topic.id);
    if (success) {
      setTopic({ ...topic, status: !topic.status });
    }
  };

  const handleVotes = async (vote) => {
    const { success } = await voteTopic(topic.id, vote);
    if (success) {
      setTopic({ ...topic, votes: topic.votes + vote });
    }
  };

  useEffect(() => {
    (async () => {
      const { success, data } = await getTopicDetails(params.topicId);
      if (success) {
        setTopic(data);
      } else {
        setError(data);
      }
    })();
  }, []);

  return (
    <Box className="container py-5">
      {!topic?.id ? (
        <SpinnerLoading />
      ) : !error ? (
        <>
          <Box className="row m-0 justify-content-center justify-content-sm-between">
            <Box className="col-10 col-sm-8">
              <Box className="row">
                <Heading className="title-color px-0" as="h2" size="lg">
                  {topic.title}
                  {topic.status ? (
                    <Badge
                      bgColor="#14AE5C"
                      color="#fff"
                      className="p-2 ms-1 rounded"
                    >
                      Resolvido
                    </Badge>
                  ) : null}
                </Heading>
              </Box>
              <Box className="row">
                <Text className="px-0">
                  Publicada em: {dateFormatted(new Date(topic.date_published))}
                </Text>
              </Box>
            </Box>
            {isAuthenticated && user.completedProfile ? (
              <Box className="col-8 col-sm-auto">
                <a className="row p-0" href="#nova-resposta">
                  <CustomButton className="w-100 mt-3 mt-sm-0" type="button">
                    Nova Resposta
                  </CustomButton>
                </a>
                {topic.authorId === user.id && !topic.status ? (
                  <Box className="col">
                    <Box className="row mt-3">
                      <CustomButton
                        bg="#C05746"
                        bgHover="#984134"
                        className="w-100"
                        type="button"
                        onClick={handleCloseTopic}
                      >
                        Encerrar Tópico
                      </CustomButton>
                    </Box>
                    <Box className="row mt-3">
                      <CustomButton
                        bg="#0070BB"
                        bgHover="#00568F"
                        className="w-100"
                        type="button"
                        onClick={() =>
                          navigate("/forum/editar-topico/" + topic.id, {
                            replace: true,
                            state: topic,
                          })
                        }
                      >
                        Editar Tópico
                      </CustomButton>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            ) : null}
          </Box>

          <Box className="row g-2 justify-content-center justify-content-sm-start align-items-end my-3 mt-sm-0 mb-sm-2 mx-3 mx-sm-0 ">
            {topic.tags.map((t, i) => (
              <Tag
                bgColor="#909090"
                className="col-auto text-white me-2"
                key={`${t}${i}`}
              >
                {t.tag.title.toUpperCase()}
              </Tag>
            ))}
          </Box>
          <Divider />
          <Box p={7}>
            <Box className="row">
              <Box className=" col-auto d-flex flex-column align-items-center">
                <TbTriangleFilled
                  fontSize={36}
                  onClick={() => handleVotes(1)}
                  className="title-color"
                  style={{ cursor: "pointer" }}
                />
                <Text fontSize="3xl" className="title-color">
                  {topic.votes}
                </Text>

                <TbTriangleInvertedFilled
                  fontSize={36}
                  className="title-color"
                  onClick={() => handleVotes(-1)}
                  style={{ cursor: "pointer" }}
                />
              </Box>
              <Box className="col-11">
                <Preview text={topic.description} />
              </Box>
            </Box>
          </Box>
          <Flex justify="flex-end" mb={2}>
            <Heading className="title-color" size="sm">
              Autor: {topic.author.first_name} {topic.author.last_name}
            </Heading>
          </Flex>
          <Divider />

          <Heading size="md" my={5} className="title-color">
            Respostas
            <Tag
              size="md"
              bgColor="#909090"
              className="text-white ms-2"
              borderRadius="full"
            >
              {topic.replies.length}
            </Tag>
          </Heading>
          <Divider />

          {topic.replies.map((r, i) => (
            <div key={`${r.author.first_name}${i}`} mt={3}>
              <Box p={7}>
                <Preview text={r.description} />
              </Box>
              <Box className="row justify-content-between mb-2">
                <small className="col-10 col-sm-auto">
                  Respondido em: {dateFormatted(new Date(r.date_published))}
                </small>
                <Heading className="col-10 col-sm-auto title-color" size="sm">
                  Autor: {r.author.first_name} {r.author.last_name}
                </Heading>
              </Box>
              <Divider />
            </div>
          ))}

          {isAuthenticated && user.completedProfile ? (
            <Box id="nova-resposta" mt={10}>
              <Heading size="md" className="title-color">
                Sua Resposta
              </Heading>
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
              <Box className="row justify-content-center justify-content-sm-start">
                <Box className="col-8 col-sm-auto">
                  <CustomButton
                    className="w-100"
                    type="button"
                    onClick={() => onSubmitReply()}
                  >
                    Postar Resposta
                  </CustomButton>
                </Box>
              </Box>
            </Box>
          ) : (
            <span>
              <Link onClick={() => loginWithRedirect()}>
                Você deve fazer login ou completar o seu cadastro para poder
                responder os tópicos.
              </Link>
            </span>
          )}
        </>
      ) : null}
    </Box>
  );
};

export default TopicDetails;
