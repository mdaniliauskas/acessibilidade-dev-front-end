import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import CustomButton from '../../components/CustomButton';

// icones
import {Eye, EyeOff} from 'react-feather'

import styles from "./styles.module.css";

import errorValidation from './ErrorValidation'

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";


function RegisterForm({handlePorcentage}) {

  const [show, setShow] = useState(false);
  const handleClick = () =>{
    setShow(!show)
  }

  const {
    register,
    handleSubmit,
    formState: { errors,  dirtyFields },
  } = useForm({
    defaultValues:{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmedPass:'',
      haveDesability: '',
      isSpecialist: '',
      checkbox: false,
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(()=>{
    const fieldsFilled = [Object.keys(dirtyFields).length];
    const completedPorcentage  = fieldsFilled > 0 ? Math.round((fieldsFilled / 8) * 100) : 0;
    handlePorcentage(completedPorcentage)
  }, [Object.keys(dirtyFields).length])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors.firstName}>
        <FormLabel htmlFor="firstName" className={styles.registerLabels}>
          Nome
        </FormLabel>
        <Input
          id="firstName"
          placeholder="Digite o seu nome"
          isInvalid={errors.firstName ? true : false}
          {...register("firstName", {
            ...errorValidation.names,
            ...errorValidation.filled,
          })
        }
        />
        {!errors.firstName ? (
          <FormHelperText>O campo deve possui no mínimo 2 de caracteres.</FormHelperText>
        ) : (
          <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors.lastName}>
        <FormLabel htmlFor="lastName" className={styles.registerLabels}>
          Sobrenome
        </FormLabel>
        <Input
          id="lastName"
          placeholder="Digite o seu sobrenome"
          isInvalid={errors.lastName ? true : false}
          {...register("lastName", {
            ...errorValidation.names,
            ...errorValidation.filled,
          })}
        />
        {!errors.lastName ? (
          <FormHelperText>
            O campo deve possui no mínimo 2 de caracteres.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors.email}>
        <FormLabel htmlFor="email" className={styles.registerLabels}>
          E-mail
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Digite o seu e-mail"
          isInvalid={errors.email ? true : false}
          {...register("email", {
            ...errorValidation.email,
            ...errorValidation.filled,
          })}
        />
        {!errors.email ? (
          <FormHelperText>Exemplo: exemplo@email.com.br</FormHelperText>
        ) : (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>

      <Flex gap="2">
        <Box flex="1">
          <FormControl isRequired isInvalid={errors.password}>
            <FormLabel htmlFor="password" className={styles.registerLabels}>
              Senha
            </FormLabel>
            <InputGroup>
              <Input
                isInvalid={errors.password ? true : false}
                id="password"
                type={show ? 'text' : 'password'}
                {...register("password", {
                  ...errorValidation.password,
                  ...errorValidation.filled,
                })}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={(e) => handleClick(e)}>
                  {show ? (<EyeOff/>) : (<Eye/>)}
                </Button>
              </InputRightElement>
            </InputGroup>
            {!errors.password ? (
              <FormHelperText>
                A senha deve conter no mínimo 8 caracteres.
              </FormHelperText>
            ) : (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Box flex="1">
          <FormControl isRequired isInvalid={errors.password}>
            <FormLabel
              htmlFor="confirmedPass"
              className={styles.registerLabels}
            >
              Confirme a senha
            </FormLabel>
            <InputGroup>
              <Input
                isInvalid={errors.confirmedPass ? true : false}
                {...register("confirmedPass", {
                  ...errorValidation.password,
                  ...errorValidation.filled,
                })}
                id="confirmedPass"
                type={show ? 'text' : 'password'}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick} name='eyeConfirmedPassword'>
                  {show ? (<EyeOff/>) : (<Eye/>)}
                </Button>
              </InputRightElement>
            </InputGroup>
            {!errors.password ? (
              <FormHelperText>
                A senha deve conter no mínimo 8 caracteres.
              </FormHelperText>
            ) : (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
      </Flex>

      <FormControl>
        <FormLabel htmlFor="haveDisability" className={styles.registerLabels}>
          Possui deficiência? Se sim, qual?
        </FormLabel>
        <Input
          {...register("haveDisability")}
          id="haveDisability"
          type="text"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="isSpecialist" className={styles.registerLabels}>
          É especialista em alguma deficiência? Se sim, qual?
        </FormLabel>
        <Input {...register("isSpecialist")} id="isSpecialist" type="text" />
      </FormControl>

      <FormControl>
        <Checkbox
          id="checkbox"
          className={styles.registerLabels}
          {...register("checkbox", { ...errorValidation.filled })}
        >
          Li e aceito os termos e políticas do Portal Acessibilidade Dev
        </Checkbox>
      </FormControl>
              
      <CustomButton
        className={styles.registerLabels}
        type="submit"
        value="Enviar"
        bg='green'
        bgHover='green.600'    
      > 
        Cadastrar
      </CustomButton>
    </form>
  );
}

export default RegisterForm;
