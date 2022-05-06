export const generateOptionsValue = (
  options: string[]
): { label: string; value: string }[] => {
  return options.map((option) => ({ value: option, label: option }));
};
