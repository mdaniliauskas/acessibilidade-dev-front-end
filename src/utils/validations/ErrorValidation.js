export default {
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
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
      message: "A senha está fora do padrão sugerido.",
    },
  },
  filled: {
    required: "Este campo é obrigatório!",
  },
  title: {
    minLength: {
      value: 20,
      message: "O título não possui o mínimo de caracteres",
    },
  },
  titleChat: {
    minLength: {
      value: 5,
      message: "O título não possui o mínimo de caracteres",
    },
    maxLength: {
      value: 30,
      message: "O título passou o maxímo de caracteres",
    },
  },
  descriptionChat: {
    minLength: {
      value: 20,
      message: "O título não possui o mínimo de caracteres",
    },
    maxLength: {
      value: 80,
      message: "O título passou o maxímo de caracteres",
    },
  },
};
