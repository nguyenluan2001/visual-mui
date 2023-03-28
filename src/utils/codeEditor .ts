const convertStringToCss = (string: string) => {
  const properties = string?.split(',');
  const css = properties?.reduce(
    (pre: Record<string, string>, current: string) => {
      const [key, value] = current.split(':');
      return {
        ...pre,
        [trim(key)]: isNaN(trim(value)) ? trim(value) : +trim(value),
      };
    },
    {}
  );
  return css;
};
const convertCssToString = (css: Record<string, string>): string => {
  return Object.entries(css)?.reduce((pre, current) => {
    const [key, value] = current;
    const result = `${pre}${key}:${value},` + `\n`;
    return result;
  }, '');
};
export { convertCssToString, convertStringToCss };
