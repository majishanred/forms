export const formatToZodDate = (date: string) => {
  if (date.length < 10) return date;
  const [day, month, year] = date.split('.');
  return year + '-' + month + '-' + day;
};

export const formatToDDMMYYYY = (date: string) => {
  if (!date) return '';
  if (date.length < 10) return date;
  const [year, month, day] = date.split('-');
  return day + '.' + month + '.' + year;
};
