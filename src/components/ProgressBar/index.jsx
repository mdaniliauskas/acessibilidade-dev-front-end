//fazer o progress bar aqui e usar o styles para estilizar
import React from 'react'
import { Progress } from '@chakra-ui/react'
import "./styles.css"
import { Link } from '@chakra-ui/react'

//original
// function ProgressBar() {
//     return (<div id='bar'>
//         <Link href='#' id="link" >Cancelar</Link>
//         <Progress value={80} size='xs' colorScheme='gray' borderRadius={7} width={600} height={4}/>
//         80%
//     </div>)
    
// }
// export default ProgressBar;



//Tentativa 01 - renderizar como props a barra de progresso de uma jeito que fique a porcentagem. 
//de uma maneira que renderize e mexa com a porcentagem 80%
function ProgressBar(props) {
    return <div id='bar'>
            {/* <Link href='#' id="link" >Cancelar</Link> */}
            <Progress value={props.number} size='xs' colorScheme='gray' borderRadius={7} width={600} height={4}/>
            {props.number}%
    </div>;
}

export default ProgressBar;


