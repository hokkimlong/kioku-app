export const pluralize = (value: string, count: number) =>
  `${value}${count > 1 ? 's' : ''}`;
