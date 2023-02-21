import React from 'react';
import { useForm} from 'react-hook-form';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from '@chakra-ui/react'

function RegisterForm() {
  const {register, handleSubmit, control} = useForm({
    defaultValues:{
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      confirmedPassword:'',
    }
  });
  
  const onSubmit = (data)=>{
    console.log(data);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl >
        <FormLabel>Nome</FormLabel>
        <Input  
          {...register('firstName')}
          id='firstName'
          placeholder='Digite o seu nome'
        />
        <FormLabel>Sobrenome</FormLabel>
        <Input  
          {...register('lastName')}
          id='lastName'
          placeholder='Digite o seu sobrenome'
        />
        <FormLabel>E-mail</FormLabel>
        <Input  
          {...register('email')}
          id='email'
          type='email'
          placeholder='Digite o seu e-mail'
        />
        <FormLabel>Senha</FormLabel>
        <Input  
          id='password'
          {...register('password')}
          type='password'
        />
        <FormLabel>Confirme a senha</FormLabel>
        <Input  
          {...register('confirmedPass')}
          id='confirmedPassword'
          type='confirmedPassword'
        />

        <Input type='submit' value='Enviar'/>
    </FormControl>
    </form>
    
  )
}

export default RegisterForm