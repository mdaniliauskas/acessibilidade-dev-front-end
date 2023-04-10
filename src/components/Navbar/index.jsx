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
  Link,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = () => {
    console.log();
  };

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Box w="100%" bg="gray.400">
      <Flex justify="center" align="center">
        <Heading as="h4" size="lg" marginLeft={5}>
          Acessibilidade Dev
        </Heading>
        <Spacer />
        {isAuthenticated ? (
          <Heading as="h4" size="sm">
            Olá, {user.nickname}
          </Heading>
        ) : (
          <Link>
            <Heading as="h4" size="sm" onClick={() => loginWithRedirect()}>
              Olá, faça Login/Cadastro
            </Heading>
          </Link>
        )}

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
