export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// export function formatQuantity(quantity: number, noun: { one: string; other: string }): string {
//   return quantity === 1 ? `${quantity} ${noun.one}` : `${quantity} ${noun.other}`;
// }
export function formatQuantity(
  quantity: number,
  noun: { one: string; other: string }
): string {
  return quantity === 1
    ? `${quantity} ${noun.one}`
    : `${quantity} ${noun.other}`;
}

export const formatDate = (date: Date, onlyMonth?: boolean) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };

  if (!onlyMonth) {
    options.day = 'numeric';
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
};
