import React from 'react'

import MenuSideBar from '../MenuSideBar/'

import { 
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels

} from '@chakra-ui/react'

const index = () => {
  return (  
    <Box h='115' w='100%' bg='gray.400' >
      <Flex justify="center">
        <Spacer/>
        <Heading as='h4' size='md'>
          Acessibilidade Dev
        </Heading>
        <Spacer/>
        <MenuSideBar/>
      </Flex>
      <Divider orientation='horizontal'/>
        <Tabs>
          <TabList>
            <Tab color='red' fontWeight='bold'>Artigos</Tab>
            <Tab color='green' fontWeight='bold'>Ferramentas</Tab>
            <Tab color='blue' fontWeight='bold'>Fórum</Tab>
            <Tab color='yellow' fontWeight='bold'>Notícias</Tab>
          </TabList>
              <TabPanels>
                <TabPanel>
                  <p>Link para pagina artigos</p>
                </TabPanel>  
                <TabPanel>
                  <p>Link para pagina ferramentas</p>
                </TabPanel>
                <TabPanel>
                  <p>Link para pagina fórum</p>
                </TabPanel>
                <TabPanel>
                  <p>Link para pagina notícias</p>
                </TabPanel>
              </TabPanels>
      </Tabs>
    </Box>
  )
}

export default index;