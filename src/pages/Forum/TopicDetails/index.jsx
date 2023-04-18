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

const TopicDetails = () => {
  const params = useParams();

  const {
    data: { message: topic },
    error,
    isPending,
  } = useFetch(TOPIC_DETAILS + "/" + params.topicId);

  return (
    <div>
      {isPending ? (
        <Flex justify="center" align="center">
          <Spinner m={10} />
        </Flex>
      ) : null}

      {!isPending && !error ? (
        <>
          <Heading size="lg">{topic.title}</Heading>
          <Text>
            Publicada em: {dateFormatted(new Date(topic.date_published))}
          </Text>
          <Box mt={3}>
            {topic.tags.map((t) => (
              <Tag m={2}>{t.tag.title.toUpperCase()}</Tag>
            ))}
          </Box>
          <Divider />
          <Preview text={topic.description} />

          <Heading size="sm">Autor: Luan Silva</Heading>
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
