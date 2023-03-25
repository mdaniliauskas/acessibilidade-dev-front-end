import React, { useState } from "react";

import MenuSideBar from "../MenuSideBar/";

import { Search } from "react-feather";

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightElement,
  Select,
  Spacer,
  Tab,
  Tabs,
  TabList,
} from "@chakra-ui/react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = () => {
    console.log();
  };

  return (
    <Box w="100%" bg="gray.400">
      <Flex justify="center">
        <Spacer />
        <Heading as="h4" size="md">
          Acessibilidade Dev
        </Heading>
        <Spacer />
        <MenuSideBar />
      </Flex>
      <Divider orientation="horizontal" />
      <Flex pt={3} pr={2}>
        <Tabs flex={1}>
          <TabList>
            <Tab color="red" fontWeight="bold">
              Artigos
            </Tab>
            <Tab color="green" fontWeight="bold">
              Ferramentas
            </Tab>
            <Tab color="blue" fontWeight="bold">
              Fórum
            </Tab>
            <Tab color="yellow" fontWeight="bold">
              Notícias
            </Tab>
          </TabList>
        </Tabs>
        <Spacer />
        <Box flex={2}>
          <InputGroup>
            <InputLeftAddon>
              <Select variant="flushed">
                <option value="Artigos">Artigos</option>
                <option value="Ferramentas">Ferramentas</option>
                <option value="Fórum">Fórum</option>
                <option value="Notícias">Notícias</option>
              </Select>
            </InputLeftAddon>
            <Input
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement>
              <Button variant="outline" p={2}>
                <Search color="#fff" size={48} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
