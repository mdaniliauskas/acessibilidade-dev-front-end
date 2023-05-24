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
import { Outlet, Link as LinkRouter, useMatches } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const matches = useMatches();

  const activeTab = ["artigos", "ferramentas", "forum", "noticias", "chat"];

  const handleSearchTerm = () => {
    console.log();
  };

  return (
    <>
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
          <Tabs
            flex={1}
            index={
              matches.length > 1
                ? activeTab.findIndex((a) => matches[1].pathname.includes(a))
                : null
            }
          >
            <TabList>
              <LinkRouter to="artigos">
                <Tab color="red" fontWeight="bold">
                  Artigos
                </Tab>
              </LinkRouter>
              <LinkRouter to="ferramentas">
                <Tab color="green" fontWeight="bold">
                  Ferramentas
                </Tab>
              </LinkRouter>
              <LinkRouter to="forum">
                <Tab color="blue" fontWeight="bold">
                  Fórum
                </Tab>
              </LinkRouter>
              <LinkRouter to="noticias">
                <Tab color="yellow" fontWeight="bold">
                  Notícias
                </Tab>
              </LinkRouter>
              <LinkRouter to="chat">
                <Tab color="purple" fontWeight="bold">
                  Discussões
                </Tab>
              </LinkRouter>
              <LinkRouter to="openIA">
                <Tab color="Orange" fontWeight="bold">
                  Dúvidas
                </Tab>
              </LinkRouter>
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
      <Outlet />
    </>
  );
};

export default Navbar;
