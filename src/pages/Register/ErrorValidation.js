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
      value:
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
      message: "A senha está fora do padrão sugerido.",
    },
  },
  filled: {
    required: "Este campo é obrigatório!",
  },
};
