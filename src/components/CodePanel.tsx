import { Box, Button } from '@mui/material';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { ReactElement, useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import theme from 'prism-react-renderer/themes/nightOwl';
import { useSelector } from 'react-redux';
import { recursionComponentCode, recursionImport } from '@/utils/recursion';

const exampleCode = ``;

const styles = {
  root: {
    boxSizing: 'border-box',
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    height: '100%',
    ...theme.plain,
  },
};
const CodePanel = () => {
  const [code, setCode] = useState<string>(exampleCode);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { components } = useSelector((store) => store.component);
  const highlight = (_code: string): ReactElement => (
    <Highlight {...defaultProps} theme={theme} code={_code} language="jsx">
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
  useEffect(() => {
    const root = components?.find((item) => item?.data?.uid === 'root');
    const importCode = recursionImport(root, components);
    const componentCode = recursionComponentCode(root, components);
    setCode(() => importCode+componentCode);
  }, [components]);
  const onValueChange = (_code: string): void => {
    setCode(_code);
  };
  const onCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Button
        variant="contained"
        color="success"
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 1000,
        }}
        onClick={onCopy}
      >
        {isCopied ? 'Copied' : 'Copy'}
      </Button>
      <Editor
        value={code}
        onValueChange={onValueChange}
        highlight={highlight}
        padding={10}
        style={styles.root}
      />
    </Box>
  );
};

export default CodePanel;
