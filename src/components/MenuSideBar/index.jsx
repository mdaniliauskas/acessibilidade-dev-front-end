
import React, {useState} from 'react'
import { Menu } from 'react-feather';
import CustomButton from '../CustomButton';

import {
  Button,
  Drawer,
  DrawerBody,    //centro afastado do outro
  DrawerFooter,   //deixa para baixo na direita
  DrawerHeader,     //deixa com negrito
  DrawerOverlay,    //escurece tudo
  DrawerContent,    //some com tudo
  DrawerCloseButton,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const [isLogged, setIsLogged] = useState(true)

  return (
    <>
      <Button ref={btnRef} colorScheme='white' onClick={onOpen}>
        <Menu/>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent >
        
        <DrawerHeader>
          <Text>
            Menu ou Foto do user  
          </Text>    
          <DrawerCloseButton size='lg'/>       
        </DrawerHeader>

          <DrawerBody 
            as='b'
            textAlign='center'
          >
            { isLogged ?
              <>
                <Link>
                  Minhas notícias
                </Link>
                <br/>  
                <Link>
                  Minhas ferramentas
                </Link>
                <br/>  
                <Link>
                  Minhas perguntas
                </Link>
                <br/>  
              </>
            :
              <>
                <Link>
                  Entrar
                </Link>  
                <br/>  
                <Link>
                Cadastrar
                </Link> 
                <br/>  
              </>    
            }
            
            <Link>
              Sobre o projeto
            </Link>
            <br/>
            <Link >
              Ajuda
            </Link>
          </DrawerBody>

          <DrawerFooter justifyContent='center'>
          {isLogged ? 
            (
              <CustomButton
                type='button'
                bg='red'
                bgHover='red.500'
              >
                Sair 
              </CustomButton>
            ): null}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default index;