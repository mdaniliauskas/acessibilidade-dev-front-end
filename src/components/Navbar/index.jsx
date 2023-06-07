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
      <Box className="bg-white container-fluid ps-0 shadow-sm ">
        <Box className="row pt-2 border-bottom">
          <Heading as="h4" size="lg" className="col-12 text-center">
            Acessibilidade Dev
          </Heading>
        </Box>
        <Box className="row ps-2 ps-lg-0 justify-content-end justify-content-sm-between">
          <Tabs
            className="d-none d-sm-flex col-auto align-items-end"
            index={
              matches.length > 1
                ? activeTab.findIndex((a) => matches[1].pathname.includes(a))
                : null
            }
          >
            <TabList style={{ width: "fit-content" }}>
              <LinkRouter to="ferramentas">
                <Tab color="#5A9A08" fontWeight="bold">
                  Ferramentas
                </Tab>
              </LinkRouter>
              <LinkRouter to="forum">
                <Tab color="#C05746" fontWeight="bold">
                  Fórum
                </Tab>
              </LinkRouter>
              <LinkRouter to="chat">
                <Tab color="#0070BB" fontWeight="bold">
                  Sala Virtual
                </Tab>
              </LinkRouter>
              <LinkRouter to="openIA">
                <Tab color="#EEA243" fontWeight="bold">
                  Dúvidas
                </Tab>
              </LinkRouter>
            </TabList>
          </Tabs>
          <Box className="col-auto d-flex mb-1 justify-content-end align-items-center">
            <Box
              className="text-end me-3 d-none d-sm-none d-md-none d-lg-block"
              style={{ width: "fit-content" }}
            >
              {isAuthenticated ? (
                <Text as="p" size="sm">
                  Olá, {user.nickname}
                </Text>
              ) : (
                <Link style={{ textDecoration: "none" }}>
                  <Text as="p" size="sm" onClick={() => loginWithRedirect()}>
                    Olá, faça Login/Cadastro
                  </Text>
                </Link>
              )}
            </Box>
            <Box style={{ width: "fit-content" }}>
              <MenuSideBar />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default Navbar;
