import React from 'react';
import { useForm} from 'react-hook-form';

import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Spacer,
} from '@chakra-ui/react'

function RegisterForm() {
  const {register, handleSubmit} = useForm();
  
  const onSubmit = (data)=>{
    console.log(data);
  }

  const errorValidation = {
    names: {
      minLength: {
        value: 2,
        message: 'O campo possui menos de 2 caracteres.'
      },
      maxLength: {
        value: 60,
        message: 'O campo possui mais de 60 caracteres.'
      }
    },
    email:{     
    } 
  }

  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl >

        <FormLabel>Nome</FormLabel>
        <Input  
          id='firstName'
          placeholder='Digite o seu nome'
          {...register('firstName',
          {
            required: true,
            minLength: {
              value: 2
            },
            maxLength: 60}
            )}
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
        <Flex gap='2'>
          <Box flex='1'>
            <FormLabel>Senha</FormLabel>
              <Input  
                id='password'
                {...register('password')}
                type='password'
              />
          </Box>
          <Box flex='1'>
            <FormLabel>Confirme a senha</FormLabel>
            <Input  
              {...register('confirmedPass')}
              id='confirmedPassword'
              type='password'
            />
          </Box>
        </Flex>

        <FormLabel>Possui deficiência? Se sim, qual?</FormLabel>
        <Input  
          {...register('haveDisability')}
          id='haveDisability'
          type='text'
        />

        <FormLabel>É especialista em alguma deficiência? Se sim, qual?</FormLabel>
        <Input  
          {...register('isSpecialist')}
          id='isSpecialist'
          type='text'
        />
        
        <Checkbox id='checkbox'>
          Li e aceito os termos e políticas do Portal Acessibilidade Dev
        </Checkbox>
        
        <Input type='submit' value='Enviar' color='blue' />
     
      </FormControl>
    </form>
    
  )
}

export default RegisterForm;