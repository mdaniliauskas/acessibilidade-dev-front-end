import React from 'react'
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import CustomButton from "../../../components/CustomButton";
import {MessageSquare} from 'react-feather'

  import { 
    Box,
    Card, 
    CardHeader, 
    CardBody, 
    Heading,
    Text,
  } from '@chakra-ui/react'


function TopicCard() {
  return (
  
    <Card bg='gray.400' p='2'>    
        <CardHeader>
          <Heading>Titulo do topico</Heading>
        </CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio quis deleniti, esse inventore itaque facilis excepturi autem nulla quos ipsam molestiae pariatur debitis suscipit! Fugit ipsa neque debitis accusantium!
        </CardBody>
        <Box ml='3'>
          <Text fontWeight='bold'>
            Ana Paula
          </Text>
          <Text fontSize='sm'>Especialista em Acessibilidade</Text>
        </Box>
        <Box position='relative'>
          <MessageSquare width='48' height='48'/>
          <span className={styles.teste}>10</span>
        </Box>
    </Card>
  )
}

export default TopicCard;