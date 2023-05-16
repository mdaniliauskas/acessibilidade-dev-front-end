import {useForm} from "react-hook-form";
import CustomButton from "../../../components/CustomButton";

import styles from "./styles.module.css";

import errorValidation from "../../../utils/validations/ErrorValidation";

import {useNavigate} from "react-router-dom";

import {
  Alert, AlertIcon,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea
} from "@chakra-ui/react";
import {useAuth0} from "@auth0/auth0-react";

import {TIMESTAMP, writeData} from "../../../services/chat.service.jsx";
import {useState} from "react";

function NewChat() {
  const {user} = useAuth0();
  const navigate = useNavigate();
  const [reqError, setReqError] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: {errors},
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
        createdBy: user.nickname
      } 
    };
    const res = await writeData(payload);
    if (res.success){
      navigate(`/chat/${res.refId}}`, { replace: true });
    } else {
      console.log(res.error);
      setReqError(true);
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:container mx-auto">
        <div className="flex my-5 justify-between items-center">
          <Heading as="h1">Criar nova sala</Heading>
        </div>
        <FormControl isRequired isInvalid={errors.title}>
          <FormLabel htmlFor="title" className={styles.registerLabels}>
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

        <FormControl isRequired isInvalid={errors.description}>
          <FormLabel htmlFor="description" className={styles.registerLabels}>
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
            <FormErrorMessage>{errors.description.message}</FormErrorMessage>
          )}
        </FormControl>
        {reqError ? (
          <Alert status="error" mt={10}>
            <AlertIcon />
            Houve um erro ao criar a sala, por favor, tente novamente!
          </Alert>
        ): null}
        
        <CustomButton className={styles.registerLabels}>Abrir discussão</CustomButton>
      </div>
    </form>
  );
}

export default NewChat;
