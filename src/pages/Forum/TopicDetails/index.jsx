import React from "react";

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
  Tag,
  Text,
} from "@chakra-ui/react";
import Preview from "../../../components/Markdown/Preview";
import { dateFormatted } from "../../../utils/formatters/datetime";
import SpinnerLoading from "../../../components/SpinnerLoading";

const TopicDetails = () => {
  const params = useParams();

  const {
    data: { message: topic },
    error,
    isPending,
  } = useFetch(TOPIC_DETAILS + "/" + params.topicId);

  return (
    <div className="md:container mx-auto">
      {isPending ? <SpinnerLoading /> : null}

      {!isPending && !error ? (
        <>
          <Heading size="lg" mt={10}>
            {topic.title}
          </Heading>
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
              <Flex justify="flex-end" mb={2}>
                <Heading size="sm">
                  Autor: {r.author.first_name} {r.author.last_name}
                </Heading>
              </Flex>
              <Divider />
            </div>
          ))}
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
