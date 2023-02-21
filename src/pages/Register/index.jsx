
import React from 'react'
import ProgressBar from '../../components/ProgressBar/'
import RegisterForm from './RegisterForm';
import styles from './styles.module.css'
import { Heading } from '@chakra-ui/react'


function RegisterPage () {
  return (
    <div>
      <ProgressBar number={75}/>
        <Heading>Cadastro</Heading>
      <RegisterForm/>
      
    </div>
  )
}

export default RegisterPage;