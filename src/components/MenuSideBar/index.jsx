import React, { useState } from "react";
import { Menu } from "react-feather";
import CustomButton from "../CustomButton";

import LoginButton from "../LoginButton";

import {
  Button,
  Drawer,
  DrawerBody, //centro afastado do outro
  DrawerFooter, //deixa para baixo na direita
  DrawerHeader, //deixa com negrito
  DrawerOverlay, //escurece tudo
  DrawerContent, //some com tudo
  DrawerCloseButton,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const index = () => {
  const { user, isAuthenticated, error, loginWithRedirect, logout } =
    useAuth0();

  console.log(isAuthenticated);
  console.log(error);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="white" onClick={onOpen}>
        <Menu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Text>Menu ou Foto do user</Text>
            {error ? <p>{error.message}</p> : null}
            <DrawerCloseButton size="lg" />
          </DrawerHeader>

          <DrawerBody as="b" textAlign="center">
            {isAuthenticated ? (
              <>
                <Link>Minhas notícias</Link>
                <br />
                <Link>Minhas ferramentas</Link>
                <br />
                <Link>Minhas perguntas</Link>
                <br />
              </>
            ) : (
              <>
                {/* <LoginButton /> */}
                <br />
                <Link onClick={() => loginWithRedirect()}>Entrar</Link>
                <br />
                <Link>Cadastrar</Link>
                <br />
              </>
            )}

            <Link>Sobre o projeto</Link>
            <br />
            <Link>Ajuda</Link>

            {JSON.stringify(user)}
          </DrawerBody>

          <DrawerFooter justifyContent="center">
            <Link onClick={logout}>sair aaaaaa</Link>

            <CustomButton
              onClick={logout}
              type="button"
              bg="red"
              bgHover="red.500"
            >
              Sair
            </CustomButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default index;
