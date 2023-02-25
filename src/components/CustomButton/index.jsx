import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import styles from "./styles.module.css"

function CustomButton (props) {
    return (
      <Button 
        borderRadius={30} 
        width={200}
        boxShadow='lg'
        bg={props.bg} 
        color='white'
        _hover={{bg: props.bgHover ? props.bgHover : props.bg}}
        >
        {props.children}       
      </Button>
        
    )
}

export default CustomButton;