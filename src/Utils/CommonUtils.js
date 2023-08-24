// eslint-disable-next-line import/prefer-default-export
export const moneyFormatter = (amount) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return formatter.format(amount);
};
