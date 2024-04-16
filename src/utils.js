export const formatToUAH = (number) => {
  // Format the number as UAH currency
  const formatter = new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  });
  return formatter.format(number);
};
