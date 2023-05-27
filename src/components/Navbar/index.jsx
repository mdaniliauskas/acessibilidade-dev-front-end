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
  Text,
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
      <Box className="container-fluid">
        <Box className="row mt-2">
          <Heading as="h4" size="lg" className="col-12 text-center">
            Acessibilidade Dev
          </Heading>
        </Box>
        <Box className="row mb-1 justify-content-end align-items-center">
          <Box className="col text-end d-none d-sm-block">
            {isAuthenticated ? (
            <Text as="p" size="sm" >
              Olá, {user.nickname}
            </Text>
          ) : (
            <Link className="d-inline">
              <Text as="p" size="sm" onClick={() => loginWithRedirect()}>
                Olá, faça Login/Cadastro
              </Text>
            </Link>
            )}
          </Box>
            <Box style={{width: "fit-content"}}>
              <MenuSideBar />
            </Box>
        </Box>
        <Divider orientation="horizontal" />
        <Box className="row">
          <Tabs className="col-5"
            index={
              matches.length > 1
                ? activeTab.findIndex((a) => matches[1].pathname.includes(a))
                : null
            }
          >
            <TabList className="d-none d-sm-none d-md-flex col-5">
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
          <Box className="offset-md-2 col-md-5">
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
                <Button colorScheme='gray' variant='ghost' p={2}>
                  <Search size={48} />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        <Divider orientation="horizontal" />
      </Box>
      <Outlet />
    </>
  );
};

export default Navbar;
