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

  const activeTab = ["ferramentas", "forum", "chat", "openIA"];

  return (
    <>
      <Box className="container-fluid bg-white px-0" >
        <Box className="row pt-2">
          <Heading as="h4" size="lg" className="col-12 text-center" style={{marginBottom: "-40px" }}>
            Acessibilidade Dev
          </Heading>
        </Box>
        <Box className="row mb-1 justify-content-end align-items-center">
          <Box className="text-end d-none d-sm-none d-md-none d-lg-block" style={{width: "fit-content"}}>
            {isAuthenticated ? (
            <Text as="p" size="sm" >
              Olá, {user.nickname}
            </Text>
          ) : (
            <Link style={{textDecoration: "none"}}>
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
          <Tabs className="d-none d-sm-none d-md-flex col-5 align-items-end"
            index={
              matches.length > 1
                ? activeTab.findIndex((a) => matches[1].pathname.includes(a))
                : null
            }
          >
            <TabList style={{width: "fit-content"}}  >
              <LinkRouter to="ferramentas">
                <Tab color="#5A9A08" fontWeight="bold">
                  Ferramentas
                </Tab>
              </LinkRouter>
              <LinkRouter to="forum">
                <Tab color="#FF0000" fontWeight="bold">
                  Fórum
                </Tab>
              </LinkRouter>
              <LinkRouter to="chat">
                <Tab color="#201CFE" fontWeight="bold">
                  Discussões
                </Tab>
              </LinkRouter>
              <LinkRouter to="openIA">
                <Tab color="#EFC222" fontWeight="bold">
                  Dúvidas
                </Tab>
              </LinkRouter>
            </TabList>
          </Tabs>
          <Box className="offset-md-2 col-md-5 my-2">
            <InputGroup>
              <InputLeftAddon bgColor="#B8B6B6">
                <Select variant="flushed" style={{cursor: "pointer"}}>
                  <option value="Ferramentas">Ferramentas</option>
                  <option value="Fórum">Fórum</option>
                </Select>
              </InputLeftAddon>
              <Input
                type="text"
                name="searchTerm"
                value={searchTerm}
                style={{cursor: "pointer"}}
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
      <Box> 
        <Outlet/>
      </Box>
    </>
  );
};

export default Navbar;
