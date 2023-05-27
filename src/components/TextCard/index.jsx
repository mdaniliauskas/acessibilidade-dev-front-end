import React from "react";
import styles from "./styles.module.css";
import {MessageSquare} from "react-feather";
import {ThumbsUp} from "react-feather";
import {ThumbsDown} from "react-feather";

import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

import {dateFormatted} from "../../utils/formatters/datetime";

function TextCard({title, body, date_published, replies, author, ...rest}) {
  return (
    <Card bg="gray.400" p="2" {...rest}>
      <Box className="grid grid-cols-12">
        <Box className="col-span-10">
          <CardHeader>
            <Heading size="md">
              {title.length >= 47 ? title.substring(0, 44) + "..." : title}
            </Heading>
          </CardHeader>

          <CardBody>
            {/* Quando o autor for uma string, por enquanto é o componente sendo utilizado pela lista de chats */}
            {typeof author == "string" ? (body) : null}
            {/* <Preview text={body} /> */}
          </CardBody>
        </Box>
        <Box className="col-span-2">
          <Flex
            justifyContent="center"
            alignItems="center"
            h="100%"
            direction="column"
          >
            <Box position="relative">
              <MessageSquare width="50" height="50"/>
              <span className={styles.comment}>{replies}</span>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Flex justifyContent="space-between" px={5}>
        {typeof author == "object" ? (
          <>
          <Text fontWeight="bold">{`${author.first_name} ${author.last_name}`}</Text>
          <Text fontSize="sm">{author.specialist_area}</Text>
          </>
          ) : (
            <Text fontWeight="bold">{`${author}`}</Text>
            )}
          <small>
            Publicada em: {dateFormatted(new Date(date_published))}
          </small>
      </Flex>

    </Card>
  );
}

export default TextCard;
