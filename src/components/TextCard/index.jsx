import React from "react";
import styles from "./styles.module.css";
import { MessageSquare } from "react-feather";
import { ThumbsUp } from "react-feather";
import { ThumbsDown } from "react-feather";

import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

import { dateFormatted } from "../../utils/formatters/datetime";
function TextCard({ title, body, date_published, replies, author, ...rest }) {
  return (
    <Card bg="gray.400" p="2" {...rest}>
      <Box className="grid grid-cols-12">
        <Box className="col-span-10">
          <CardHeader>
            <Heading size="md">
              {title.length >= 47 ? title.substring(0, 44) + "..." : title}
            </Heading>
            <small>
              Publicada em: {dateFormatted(new Date(date_published))}
            </small>
          </CardHeader>

          {/* <CardBody> */}
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. */}
          {/* <Preview text={body} /> */}
          {/* </CardBody> */}
          <Box ml="5">
            <Text fontWeight="bold">{`${author.first_name} ${author.last_name}`}</Text>
            <Text fontSize="sm">{author.specialist_area}</Text>
          </Box>
        </Box>
        <Box className="col-span-2">
          <Flex
            justifyContent="center"
            alignItems="center"
            h="100%"
            direction="column"
          >
            <Box position="relative">
              <MessageSquare width="50" height="50" />
              <span className={styles.comment}>{replies}</span>
            </Box>
            {/* <Flex justifyContent="right">
              <Box marginRight="15%" display="flex">
                <ThumbsUp width="30" height="30" display="inline" />
                <span className={styles.like}>20</span>
              </Box>

              <Box display="flex">
                <ThumbsDown width="30" height="30" />
                <span className={styles.deslike}>20</span>
              </Box>
            </Flex> */}
          </Flex>
        </Box>
      </Box>
    </Card>
  );
}

export default TextCard;
