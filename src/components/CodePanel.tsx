import { Box, Button } from '@mui/material';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { ReactElement, useState } from 'react';
import Editor from 'react-simple-code-editor';
import theme from 'prism-react-renderer/themes/nightOwl';

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
  const highlight = (_code: string): ReactElement => (
    <Highlight {...defaultProps} theme={theme} code={_code} language="css">
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
