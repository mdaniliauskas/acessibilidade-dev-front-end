import { useForm } from "react-hook-form";

import { useEffect } from "react";

import styles from "./styles.module.css";

import {
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

function RegisterForm() {
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
    console.log("Dirty fields");
    console.log(dirtyFields);
    console.log(data);
  };

  const errorValidation = {
    names: {
      minLength: {
        value: 2,
        message: "O campo não possui o mínimo de caracteres.",
      },
      maxLength: {
        value: 60,
        message: "O campo ultrapassa o limite de caracteres.",
      },
    },
    email: {
      pattern: {
        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        message: "O e-mail está fora do padrão. Exemplo: exemplo@email.com.br",
      },
      minLength: {
        value: 4,
        message: "O campo não possui o mínimo de caracteres.",
      },
      maxLength: {
        value: 40,
        message: "O campo ultrapassa o limite de caracteres.",
      },
    },
    password: {
      pattern: {
        value:
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
        message: "A senha está fora do padrão sugerido.",
      },
    },
    filled: {
      required: "Este campo é obrigatório!",
    },
  };


  useEffect(()=>{
    console.log('Chamou Dirty', dirtyFields);
    const fieldsFilled = [Object.keys(dirtyFields).length];
    const completedPorcentage  = fieldsFilled > 0 ? Math.round((fieldsFilled / 8) * 100) : 0
    console.log(completedPorcentage);
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
            <Input
              isInvalid={errors.password ? true : false}
              id="password"
              type="password"
              {...register("password", {
                ...errorValidation.password,
                ...errorValidation.filled,
              })}
            />
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
            <Input
              isInvalid={errors.confirmedPass ? true : false}
              {...register("confirmedPass", {
                ...errorValidation.password,
                ...errorValidation.filled,
              })}
              id="confirmedPass"
              type="password"
            />
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

      <Input
        className={styles.registerLabels}
        type="submit"
        value="Enviar"
        color="blue"
      />

      <button type="button" onClick={()=>{console.log('Dirty Botao', dirtyFields)}}>Teste do Dirty</button>
    </form>
  );
}

export default RegisterForm;
