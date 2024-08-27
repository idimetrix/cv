export const decodeJSON = (value: string | undefined | null, defaultValue?: any) => {
  if (value === undefined || value === null) return defaultValue;

  try {
    return JSON.parse(value) || defaultValue;
  } catch (error) {
    // console.error(error);

    return defaultValue;
  }
};

export const encodeJSON = (value: any): string => {
  return JSON.stringify(value);
};
