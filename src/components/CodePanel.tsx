/* eslint-disable import/extensions */
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { Key, ReactElement, useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import theme from 'prism-react-renderer/themes/nightOwl';
import { useSelector } from 'react-redux';
// import prettier from 'prettier';
import prettier from 'https://unpkg.com/prettier@2.8.7/esm/standalone.mjs';
import parserBabel from 'https://unpkg.com/prettier@2.8.7/esm/parser-babel.mjs';
import parserGraphql from 'https://unpkg.com/prettier@2.8.7/esm/parser-graphql.mjs';
import parserHtml from 'https://unpkg.com/prettier@2.8.7/esm/parser-html.mjs';
import { trim } from 'lodash';
import contentCopy from '@iconify/icons-mdi/content-copy';
import trayArrowDown from '@iconify/icons-mdi/tray-arrow-down';
import { Icon } from '@iconify/react';
import { IDnDComponent } from 'model';
import { recursionComponentCode, recursionImport } from '@/utils/recursion';
import { RootState } from '@/redux/store';

const exampleCode = ``;

const styles = {
  root: {
    boxSizing: 'border-box',
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    height: '100%',
    overflow: 'auto',
    ...theme.plain,
  },
};
const CodePanel = () => {
  const [code, setCode] = useState<string>(exampleCode);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { components } = useSelector((store: RootState) => store.component);
  const highlight = (_code: string): ReactElement => (
    <Highlight {...defaultProps} theme={theme} code={_code} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div
              {...getLineProps({ line, key: i })}
              key={line as unknown as Key}
            >
              {line.map((token, key) => (
                <span
                  {...getTokenProps({ token, key })}
                  key={token as unknown as Key}
                />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  );
  useEffect(() => {
    const root = components?.find(
      (item) => item?.data?.uid === 'root'
    ) as IDnDComponent;
    const importCode = recursionImport(root, components);
    const componentCode = recursionComponentCode(root, components);
    const joinCode = trim(importCode + componentCode);
    const formattedCode = prettier.format(joinCode, {
      semi: true,
      parser: 'babel',
      plugins: [parserBabel, parserHtml],
    });
    setCode(() => formattedCode);
  }, [components]);
  const onValueChange = (_code: string): void => {
    setCode(_code);
  };
  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const onDownload = () => {
    const element = document.createElement('a');
    const jsonFile = new Blob([code], {
      type: 'text/plain',
    }); // pass data from localStorage API to blob
    element.href = URL.createObjectURL(jsonFile);
    element.download = 'App.jsx';
    document.body.appendChild(element);
    return element.click();
  };
  return (
    <Box sx={{ height: '100%', position: 'relative', overflow: 'auto' }}>
      <Stack
        direction="row"
        sx={{
          position: 'absolute',
          top: '16px',
          right: '32px',
          zIndex: 1000,
        }}
        spacing={2}
      >
        <Tooltip title="Download">
          <IconButton onClick={onDownload}>
            <Icon icon={trayArrowDown} style={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={isCopied ? 'Copied' : 'Copy'}>
          <IconButton onClick={onCopy}>
            <Icon icon={contentCopy} style={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Editor
        value={code}
        onValueChange={onValueChange}
        highlight={highlight}
        padding={10}
        style={styles.root as React.CSSProperties}
        disabled
      />
    </Box>
  );
};

export default CodePanel;
