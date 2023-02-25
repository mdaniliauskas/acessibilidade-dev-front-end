
import React, {useState} from 'react'
import ProgressBar from '../../components/ProgressBar/'
import RegisterForm from './RegisterForm';
import { Heading } from '@chakra-ui/react'

function RegisterPage () {

  const [porcentage, setPorcentage] = useState(0)

  return (
    <div>
      <ProgressBar number={porcentage}/>
        <Heading>Cadastro</Heading>      
      <RegisterForm handlePorcentage={(p => setPorcentage(p))}/>
      
    </div>
  )
}

export default RegisterPage;