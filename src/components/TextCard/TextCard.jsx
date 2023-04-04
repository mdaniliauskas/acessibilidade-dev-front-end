import React from 'react'
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import CustomButton from "../CustomButton";
import {MessageSquare} from 'react-feather'

  import { 
    Box,
    Card, 
    CardHeader, 
    CardBody, 
    Flex,
    Heading,
    Text,
  } from '@chakra-ui/react'


function TextCard() {
  return (
  
    <Card bg='gray.400' p='2'>
      <Box className='grid grid-cols-12'>
        <Box className='col-span-10'>
          <CardHeader>
            <Heading>Titulo do topico</Heading>
          </CardHeader>
          <CardBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          </CardBody>
          <Box ml='3'>
            <Text fontWeight='bold'>
              Ana Paula
            </Text>
            <Text fontSize='sm'>Especialista em Acessibilidade</Text>
          </Box>
        </Box>
        <Box className='col-span-2'>
        <Flex justifyContent="center" alignItems="center" h="100%">
          <Box position='relative'>
            <MessageSquare width='48' height='48'/>
            <span className={styles.teste}>10</span>
          </Box>
        </Flex>
        </Box>
      </Box>
    </Card> 
  )
}

export default TextCard;