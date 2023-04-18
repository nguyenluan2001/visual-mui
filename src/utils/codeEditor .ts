import { trim } from 'lodash';

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
const convertCssToString = (
  css: Record<string, string>,
  isDoubleQuote = false
): string => {
  console.log('🚀 ===== css:', css);
  if (!css) return '';
  return Object.entries(css)?.reduce((pre, current) => {
    const [key, value] = current;
    if (key) {
      let result = '';
      if (isDoubleQuote) {
        result = `${pre}${key}:"${value}",` + `\n`;
      } else {
        result = `${pre}${key}:${value},` + `\n`;
      }
      return result;
    }
    return pre;
  }, '');
};
export { convertCssToString, convertStringToCss };
