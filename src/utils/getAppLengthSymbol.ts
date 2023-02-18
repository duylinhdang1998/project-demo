interface GetAppLengthSymbol {
  isPlural: boolean;
  isCapitalize: boolean;
}
export const getAppLengthSymbol = ({ isPlural, isCapitalize }: GetAppLengthSymbol) => {
  const withPlural = isPlural ? 'kms' : 'km';
  const withUppercase = isCapitalize ? withPlural.charAt(0).toUpperCase() + withPlural.slice(1) : withPlural;

  return withUppercase;
};
