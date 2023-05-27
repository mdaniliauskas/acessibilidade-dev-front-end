export const dateFormatted = (date) =>
  new Intl.DateTimeFormat("pt-BR").format(date);

export const dateTimeFormatted = (date) =>{
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  };
 return  new Intl.DateTimeFormat("pt-BR", options).format(date)
}