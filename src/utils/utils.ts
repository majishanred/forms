export const formatToYYYYMMDD = (date: string) => {
  const [day, month, year] = date.split('-');
  return year + '.' + month + '.' + day;
};

export const formatToZodDate = (date: string) => {
  const [day, month, year] = date.split('.');
  return day + '-' + month + '-' + day;
};

export const formatToDDMMYYYY = (date: string) => {};
