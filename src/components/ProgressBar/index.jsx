//fazer o progress bar aqui e usar o styles para estilizar
import React from 'react'
import { Progress, Flex } from '@chakra-ui/react'
import styles from "./styles.module.css"


function ProgressBar(props) {
    return (
        <Flex alignItems={"center"} justifyContent={"center"}>
            <Progress value={props.number} size='xs' colorScheme='gray' borderRadius={7} width={"100%"} height={4} />
            <p className={styles.progressValue}>
                {props.number}%
            </p>
        </Flex>
    );
}
export default ProgressBar;