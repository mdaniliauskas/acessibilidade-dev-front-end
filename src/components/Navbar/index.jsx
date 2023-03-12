import React from 'react'

import MenuSideBar from '../MenuSideBar/'

import { 
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react'

const index = () => {
  return (  
    <Box h='115' w='100%' bg='green' >
      <Flex justify="center">
        <Spacer/>
        <Heading as='h4' size='md'>
          Acessibilidade Dev
        </Heading>
        <Spacer/>
        <MenuSideBar/>
      </Flex>
      <Divider orientation='horizontal'/>
    </Box>
  )
}

export default index;