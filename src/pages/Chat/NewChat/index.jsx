import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../../components/CustomButton";
import errorValidation from "../../../utils/validations/ErrorValidation";
import { useNavigate } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { TIMESTAMP, writeData } from "../../../services/chat.service.jsx";

import {
  Alert,
  AlertIcon,
  Box,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";

import styles from "./styles.module.css";
import LoginRedirect from "../../LoginRedirect";

function NewChat() {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [reqError, setReqError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      describe: "",
    },
  });

  const onSubmit = async (formData) => {
    const payload = {
      path: "chats",
      data: {
        title: formData.title,
        description: formData.description,
        createdAt: TIMESTAMP(),
        ownerId: user.id,
        createdBy: user.nickname,
        isOpen: true,
      },
    };
    const res = await writeData(payload);
    if (res.success) {
      const chatId = res.refId;
      navigate(`/chat/${chatId}`, { replace: true });
    } else {
      console.log(res.error);
      setReqError(true);
    }
  };

  return (
    <Box className="container py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="mb-3">
          <Heading as="h1" className="title-color">
            Criar nova sala
          </Heading>
        </Box>
        <Card className="mb-3">
          <CardBody className="shadow bg-white rounded">
            <FormControl isRequired ishufflednvalid={errors.title}>
              <FormLabel className="title-color" htmlFor="title">
                Nome da sala
              </FormLabel>
              <Input
                id="title"
                placeholder="Digite o nome da sala de discussão."
                isInvalid={errors.title ? true : false}
                {...register("title", {
                  ...errorValidation.titleChat,
                  ...errorValidation.filled,
                })}
              />
              {!errors.title ? (
                <FormHelperText>
                  O campo deve possui no mínimo 5 e o maxímo 30 de caracteres.
                </FormHelperText>
              ) : (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardBody className="shadow bg-white rounded">
            <FormControl isRequired isInvalid={errors.description}>
              <FormLabel htmlFor="description" className="title-color">
                Uma breve descrição
              </FormLabel>
              <Textarea
                id="description"
                placeholder="Dê uma breve descrição do objetivo dessa sala de discussão."
                isInvalid={errors.description ? true : false}
                {...register("description", {
                  ...errorValidation.descriptionChat,
                  ...errorValidation.filled,
                })}
              />
              {!errors.description ? (
                <FormHelperText>
                  O campo deve possui no mínimo 20 e o maxímo 150 caracteres.
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </CardBody>
        </Card>

        {reqError ? (
          <Alert status="error" mt={10}>
            <AlertIcon />
            Houve um erro ao criar a sala, por favor, tente novamente!
          </Alert>
        ) : null}

        <CustomButton className={styles.registerLabels}>
          Abrir discussão
        </CustomButton>
      </form>
    </Box>
  );
}

export default withAuthenticationRequired(NewChat, {
  onRedirecting: () => <LoginRedirect />,
});
