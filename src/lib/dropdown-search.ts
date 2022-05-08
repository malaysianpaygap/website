export interface SearchableDropdownOption {
  label: string;
  description?: string;
  value: string;
}

export function filterOptionsByQuery(
  options: Array<SearchableDropdownOption>,
  query: string
): Array<SearchableDropdownOption> {
  const queryWords = query.toLowerCase().split(' ');

  return options.filter((option) => {
    const optionString = `${option.label} ${option.description}}`.toLowerCase();

    return (
      queryWords.map((word) => optionString.includes(word)).filter(Boolean)
        .length /
        queryWords.length >
      0.6
    );
  });
}
