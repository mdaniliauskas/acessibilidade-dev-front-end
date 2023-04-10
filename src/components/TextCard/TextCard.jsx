import React from "react";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import CustomButton from "../CustomButton";
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

function TextCard() {
  return (
    <Card bg="gray.400" p="2">
      <Box className="grid grid-cols-12">
        <Box className="col-span-10">
          <CardHeader>
            <Heading>Titulo do topico</Heading>
          </CardHeader>
          <CardBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
          </CardBody>
          <Box ml="3">
            <Text fontWeight="bold">Ana Paula</Text>
            <Text fontSize="sm">Especialista em Acessibilidade</Text>
          </Box>
        </Box>
        <Box className="col-span-2">
          <Flex
            justifyContent="space-evenly"
            alignItems="center"
            h="100%"
            marginTop="18%"
            direction="column"
          >
            <Box position="relative">
              <MessageSquare width="50" height="50" />
              <span className={styles.comment}>20</span>
            </Box>
            <Flex justifyContent="right">
              <Box marginRight="15%" display="flex">
                <ThumbsUp width="30" height="30" display="inline" />
                <span className={styles.like}>20</span>
              </Box>

              <Box display="flex">
                <ThumbsDown width="30" height="30" />
                <span className={styles.deslike}>20</span>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Card>
  );
}

export default TextCard;
