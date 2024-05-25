export const formatToUAH = (number) => {
  // Format the number as UAH currency
  const formatter = new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  });
  return formatter.format(number);
};

export const formatDate = (date) => {
  date = new Date(date);
  const year = date.getFullYear();
  const monthNames = new Intl.DateTimeFormat("uk-UA", {
    month: "long",
  }).format(date);
  return `${monthNames} ${year}`;
};
