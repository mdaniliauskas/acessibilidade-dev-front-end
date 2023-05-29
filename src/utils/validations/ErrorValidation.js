export default {
  names: {
    minLength: {
      value: 2,
      message: "O campo não possui o mínimo de 2 caracteres.",
    },
    maxLength: {
      value: 60,
      message: "O campo ultrapassa o limite de 60 caracteres.",
    },
  },
  email: {
    pattern: {
      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
      message: "O e-mail está fora do padrão. Exemplo: exemplo@email.com.br",
    },
    minLength: {
      value: 4,
      message: "O campo não possui o mínimo de 4 caracteres.",
    },
    maxLength: {
      value: 40,
      message: "O campo ultrapassa o limite de 40 caracteres.",
    },
  },
  password: {
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
      message: "A senha não preenche os requisitos necessários.",
    },
  },
  filled: {
    required: "Este campo é obrigatório!",
  },
  title: {
    minLength: {
      value: 20,
      message: "O título não possui o mínimo de 20 caracteres",
    },
  },
  titleChat: {
    minLength: {
      value: 5,
      message: "O título não possui o mínimo de 5 caracteres",
    },
    maxLength: {
      value: 30,
      message: "O título ultrapossou o maxímo de 30 caracteres",
    },
  },
  descriptionChat: {
    minLength: {
      value: 20,
      message: "A descrição não possui o mínimo de 20 caracteres",
    },
    maxLength: {
      value: 150,
      message: "A descrição ultrapassou o maxímo de 150 caracteres",
    },
  },
};
