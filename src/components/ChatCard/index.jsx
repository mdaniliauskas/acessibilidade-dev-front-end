import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { dateFormatted } from "../../utils/formatters/datetime";

function ChatCard({
  title,
  description,
  createdAt,
  members,
  createdBy,
  ...rest
}) {
  return (
    <Card bg="#B8B7B7" {...rest} style={{ cursor: "pointer" }}>
      <Box className="row px-3">
        <Box className="col-lg-8">
          <CardHeader className="px-0">
            <Heading as="h3" size="md" className="text-white">
              {title}
            </Heading>
          </CardHeader>
          <CardBody className="px-0">
            <Text className="text-white">{description}</Text>
          </CardBody>
        </Box>
        <CardFooter className="col-lg-4 align-items-center px-3">
          <Box className="row d-md-inline d-lg-flex row-lg">
            <small className="text-white">Membros online: {members}</small>
            <small className="text-white m-md-3 m-lg-0">
              Criado em: {dateFormatted(new Date(createdAt))}
            </small>
            <small className="text-white">Criado por: {createdBy}</small>
          </Box>
        </CardFooter>
      </Box>
    </Card>
  );
}

export default ChatCard;
