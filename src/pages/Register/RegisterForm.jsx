import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import CustomButton from "../../components/CustomButton";

import { SIGNUP } from "../../utils/constants/api";

// icones
import { Eye, EyeOff } from "react-feather";

import styles from "./styles.module.css";

import errorValidation from "./ErrorValidation";

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

function RegisterForm({ handlePorcentage }) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      birth_date: "",
      email: "",
      password: "",
      confirmedPass: "",
      disability: "",
      specialist_area: "",
      checkbox: false,
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    fetch(SIGNUP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw Error("Deu ruim");
        return res.json();
      })
      .then((data) => {
        console.log("Cadastrou o usuário");
        console.log("Usuário cadastrado:", data);
      })
      .catch((err) => console.error("Deu erro na requisicao ", err));
  };

  useEffect(() => {
    const fieldsFilled = [Object.keys(dirtyFields).length];
    const completedPorcentage =
      fieldsFilled > 0 ? Math.round((fieldsFilled / 9) * 100) : 0;
    handlePorcentage(completedPorcentage);
  }, [Object.keys(dirtyFields).length]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors.first_name}>
        <FormLabel htmlFor="first_name" className={styles.registerLabels}>
          Nome
        </FormLabel>
        <Input
          id="firstName"
          placeholder="Digite o seu nome"
          isInvalid={errors.first_name ? true : false}
          {...register("first_name", {
            ...errorValidation.names,
            ...errorValidation.filled,
          })}
        />
        {!errors.first_name ? (
          <FormHelperText>
            O campo deve possui no mínimo 2 de caracteres.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.first_name.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors.last_name}>
        <FormLabel htmlFor="lastName" className={styles.registerLabels}>
          Sobrenome
        </FormLabel>
        <Input
          id="lastName"
          placeholder="Digite o seu sobrenome"
          isInvalid={errors.last_name ? true : false}
          {...register("last_name", {
            ...errorValidation.names,
            ...errorValidation.filled,
          })}
        />
        {!errors.last_name ? (
          <FormHelperText>
            O campo deve possui no mínimo 2 de caracteres.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.last_name.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors.birth_date}>
        <FormLabel htmlFor="birth_date">Data de Nascimento</FormLabel>
        <Input
          id="birth_date"
          type="date"
          isInvalid={errors.birth_date ? true : false}
          {...register("birth_date", {
            ...errorValidation.filled,
          })}
        />
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
          <FormHelperText>exemplo@email.com.br</FormHelperText>
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
                type={show ? "text" : "password"}
                {...register("password", {
                  ...errorValidation.password,
                  ...errorValidation.filled,
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={(e) => handleClick(e)}>
                  {show ? <EyeOff /> : <Eye />}
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
                type={show ? "text" : "password"}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  name="eyeConfirmedPassword"
                >
                  {show ? <EyeOff /> : <Eye />}
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
        <FormLabel htmlFor="disability" className={styles.registerLabels}>
          Possui deficiência? Se sim, qual?
        </FormLabel>
        <Input {...register("disability")} id="disability" type="text" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="specialist_area" className={styles.registerLabels}>
          É especialista em alguma deficiência? Se sim, qual?
        </FormLabel>
        <Input {...register("specialist_area")} id="isSpecialist" type="text" />
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
        bg="green"
        bgHover="green.600"
      >
        Cadastrar
      </CustomButton>
    </form>
  );
}

export default RegisterForm;
