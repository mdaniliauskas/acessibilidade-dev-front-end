import React from "react";
import styles from "./styles.module.css";
import {MessageSquare} from "react-feather";  

import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from "@chakra-ui/react";

import {dateFormatted} from "../../utils/formatters/datetime";

function TextCard({title, body, date_published, replies, author, votos, ...rest}) {
  return (
      <Card bg="#B8B7B7" className="p-3" {...rest} style={{maxWidth: "100%"}}>
        <CardHeader className="p-1">
            <Heading size="md" color="#fff">
              {title.length >= 47 ? title.substring(0, 44) + "..." : title}
            </Heading>
        </CardHeader>
      <CardBody className="row p-1 justify-content-between">
        <Box className="col-auto my-auto  ">
                  {typeof author == "object" ? (
          <>
            <Text className="text-white" fontWeight="bold">{`${author.first_name} ${author.last_name}`}</Text>
            <Text className="text-white" fontSize="sm">{author.specialist_area}</Text>
          </>
        ) : (
            <Text className="text-white" fontWeight="bold">{`${author}`}</Text>
            )}
        </Box>
        <Box className="col-auto">
          <Box position="relative">
            <MessageSquare className="text-white" width="50" height="50"/>
            <span className={styles.comment+" text-white"}>{replies}</span>
          </Box>
        </Box>
        </CardBody>
        <CardFooter className="p-1">
        <small className="text-white col">
            Votos: {votos}
        </small>
        <small className="text-white">
            Publicada em: {dateFormatted(new Date(date_published))}
        </small>
        </CardFooter>
      </Card>
  );
}

export default TextCard;
