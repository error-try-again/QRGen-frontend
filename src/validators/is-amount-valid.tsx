export const isValidAmount = (amount: string | undefined): boolean => {
  if (amount === undefined) {
    return true; // amount is optional
  }
  const amountNumber = Number(amount);
  return amountNumber > 0 && amountNumber <= 1_000_000;
};
