import { useForm } from "react-hook-form";
import { useEffect } from "react";

import CustomButton from "../../components/CustomButton";

import { COMPLETED_PROFILE } from "../../utils/constants/api";

import styles from "./styles.module.css";

import errorValidation from "../../utils/validations/ErrorValidation";

import { useNavigate } from "react-router-dom";

import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

function RegisterForm({ handlePorcentage }) {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      birth_date: "",
      disability: "",
      specialist_area: "",
      checkbox: false,
    },
  });

  const onSubmit = async (formData) => {
    const body = {
      id: user.id,
      completedProfile: true,
      first_name: formData.first_name,
      last_name: formData.last_name,
      specialist_area: formData.specialist_area,
      disability: formData.disability,
      birth_date: new Date(formData.birth_date + " 00:00:00"),
    };

    const res = await fetch(COMPLETED_PROFILE, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    const data = await res.json();

    if (data.success) {
      user.completedProfile = true;
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const fieldsFilled = [Object.keys(dirtyFields).length];
    const completedPorcentage =
      fieldsFilled > 0 ? Math.round((fieldsFilled / 6) * 100) : 0;
    handlePorcentage(completedPorcentage);
  }, [Object.keys(dirtyFields).length]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        className="bg-white border rounded p-3 my-3"
        isRequired
        isInvalid={errors.first_name}
      >
        <FormLabel className="title-color" htmlFor="first_name">
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

      <FormControl
        className="bg-white border rounded p-3 mb-3"
        isRequired
        isInvalid={errors.last_name}
      >
        <FormLabel className="title-color" htmlFor="lastName">
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

      <FormControl
        className="bg-white border rounded p-3 mb-3"
        isRequired
        isInvalid={errors.birth_date}
      >
        <FormLabel className="title-color" htmlFor="birth_date">
          Data de Nascimento
        </FormLabel>
        <Input
          id="birth_date"
          type="date"
          isInvalid={errors.birth_date ? true : false}
          {...register("birth_date", {
            ...errorValidation.filled,
          })}
        />
      </FormControl>

      <FormControl className="bg-white border rounded p-3 mb-3">
        <FormLabel className="title-color" htmlFor="disability">
          Possui deficiência? Se sim, qual?
        </FormLabel>
        <Input {...register("disability")} id="disability" type="text" />
      </FormControl>

      <FormControl className="bg-white border rounded p-3 mb-3">
        <FormLabel className="title-color" htmlFor="specialist_area">
          É especialista em alguma deficiência? Se sim, qual?
        </FormLabel>
        <Input {...register("specialist_area")} id="isSpecialist" type="text" />
      </FormControl>

      <FormControl className="bg-white border rounded p-3 mb-3">
        <Checkbox
          id="checkbox"
          className="title-color"
          {...register("checkbox", { ...errorValidation.filled })}
        >
          Li e aceito os termos e políticas do Portal Acessibilidade Dev
        </Checkbox>
      </FormControl>

      <CustomButton>Cadastrar</CustomButton>
    </form>
  );
}

export default RegisterForm;
