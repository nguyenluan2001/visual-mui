import React, {
  Fragment,
  Component,
  useState,
  ReactElement,
  useEffect,
} from 'react';

import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { Box, Typography } from '@mui/material';
import { trim } from 'lodash';
import { useSelector } from 'react-redux';
import useForm from '@/hooks/useForm';

const exampleCode = ``;

const styles = {
  root: {
    boxSizing: 'border-box',
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    ...theme.plain,
  },
};
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
const CustomCSS = () => {
  const [code, setCode] = useState<string>(exampleCode);
  const { selectedComponent } = useSelector((store) => store.component);
  useEffect(() => {
    const cssString = convertCssToString(selectedComponent?.data?.props?.sx);
    setCode(cssString);
  }, [selectedComponent?.data?.uid]);
  const { updateSelectedComponentProps } = useForm();
  //   state = { code: exampleCode };

  const onValueChange = (_code: string): void => {
    // console.log('🚀 ===== onValueChange ===== _code:', _code);
    // const [key, value] = _code.split(':');
    const css = convertStringToCss(_code);
    console.log('🚀 ===== onValueChange ===== css:', css);
    updateSelectedComponentProps('sx', css);
    setCode(_code);
  };

  const highlight = (_code: string): ReactElement => (
    <Highlight {...defaultProps} theme={theme} code={code} language="css">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  );

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="h6">Custom Style</Typography>
      <Box sx={{ pl: 1 }}>
        <Editor
          value={code}
          onValueChange={onValueChange}
          highlight={highlight}
          padding={10}
          style={styles.root}
        />
      </Box>
    </Box>
  );
};
export default CustomCSS;
