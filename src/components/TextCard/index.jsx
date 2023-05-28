import React from "react";
import styles from "./styles.module.css";
import { CheckSquare, MessageSquare, XSquare } from "react-feather";

import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from "@chakra-ui/react";

import { dateFormatted } from "../../utils/formatters/datetime";

function TextCard({
  title,
  body,
  date_published,
  replies,
  author,
  votos,
  status,
  ...rest
}) {
  return (
    <Card bg="#B8B7B7" className="p-3" {...rest} style={{ maxWidth: "100%" }}>
      <CardHeader className="p-1">
        <Heading size="md" color="#fff">
          {title.length >= 47 ? title.substring(0, 44) + "..." : title}
        </Heading>
      </CardHeader>
      <CardBody className="row p-1 justify-content-between align-items-end">
        <Box className="col-auto ">
          {typeof author == "object" ? (
            <Text
              className="text-white"
              fontWeight="bold"
            >{`${author.first_name} ${author.last_name}`}</Text>
          ) : (
            <Text className="text-white" fontWeight="bold">{`${author}`}</Text>
          )}
        </Box>
        <Box className="col-auto text-start">
          <Text className="text-white" fontWeight="bold">
            Respostas: {replies}
          </Text>
          <Text className="text-white" fontWeight="bold">
            {!status ? (
              <Box className="d-flex align-items-center">
                Em aberto
                <MessageSquare
                  className="text-white d-inline ms-3"
                  width="24"
                  height="24"
                />
              </Box>
            ) : (
              <Box className="d-flex align-items-center">
                Resolvido
                <CheckSquare
                  className="text-white d-inline ms-3"
                  width="24"
                  height="24"
                />
              </Box>
            )}
          </Text>
        </Box>
      </CardBody>
      <CardFooter className="p-1">
        <small className="text-white col">Votos: {votos}</small>
        <small className="text-white">
          Publicada em: {dateFormatted(new Date(date_published))}
        </small>
      </CardFooter>
    </Card>
  );
}

export default TextCard;
