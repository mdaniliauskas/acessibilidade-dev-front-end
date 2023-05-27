import React, { useState } from "react";
import { Menu } from "react-feather";
import CustomButton from "../CustomButton";

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

import { Link as LinkRouter } from "react-router-dom";

const index = () => {
  const { user, isAuthenticated, error, loginWithRedirect, logout } =
    useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme='gray' variant='ghost' onClick={onOpen}>
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
            {isAuthenticated ? <Text>{user.nickname}</Text> : <Text>Menu</Text>}
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
                {!user.completedProfile ? (
                  <>
                    <LinkRouter to="/completarCadastro">
                      Completar cadastro
                    </LinkRouter>
                    <br />
                  </>
                ) : null}
              </>
            ) : (
              <>
                <br />
                <Link onClick={() => loginWithRedirect()}>
                  Entrar/Cadastrar
                </Link>
                <br />
              </>
            )}

            <Link>Sobre o projeto</Link>
            <br />
            <Link>Ajuda</Link>
          </DrawerBody>

          <DrawerFooter justifyContent="center">
            {isAuthenticated ? (
              <CustomButton
                onClick={logout}
                type="button"
                bg="red"
                bgHover="red.500"
              >
                Sair
              </CustomButton>
            ) : null}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default index;
