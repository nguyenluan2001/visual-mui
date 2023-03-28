// eslint-disable-next-line no-restricted-syntax
import React, { ReactElement } from 'react';
import { IDnDComponent } from 'model';
import RenderComponent from '@/components/editor/RenderComponent';
import { mappingComponent } from '@/components/compoentList';
import { convertCssToString } from './codeEditor ';

const recursionComponents = (
  component: IDnDComponent,
  components: IDnDComponent[]
): IDnDComponent | ReactElement => {
  //   console.log('🚀 ===== recursionComponents ===== component:', component);
  if (component?.data?.children?.length === 0) {
    return React.createElement(
      RenderComponent,
      {
        component: component as IDnDComponent,
      },
      null
    );
  }
  const childrenComponents: (IDnDComponent | ReactElement)[] = [];
  const uids: string[] =
    typeof component?.data?.children === 'object'
      ? component?.data?.children
      : [];
  for (const uid of uids) {
    const comp: IDnDComponent = components?.find(
      (item: IDnDComponent) => item?.data?.uid === uid
    ) as IDnDComponent;
    childrenComponents.push(recursionComponents(comp, components));
  }
  if (component?.data?.uid === 'root') {
    return React.createElement(
      mappingComponent[component?.type],
      { ...component?.data?.props },
      childrenComponents
    );
  }
  return React.createElement(
    RenderComponent,
    {
      component,
      children: childrenComponents,
    },
    childrenComponents
  );
};
const recursionImport = (
  component: IDnDComponent,
  components: IDnDComponent[],
  importGroup = new Map()
): IDnDComponent | ReactElement => {
  if (component?.data?.uid !== 'root') {
    const directory = component?.data?.directory;
    if (importGroup.has(directory)) {
      importGroup.set(directory, [
        ...new Set([...importGroup.get(directory), component.type]),
      ]);
    } else {
      importGroup.set(directory, [component?.type]);
    }
  }
  // if (component?.data?.children?.length === 0) {
  //   return React.createElement(
  //     RenderComponent,
  //     {
  //       component: component as IDnDComponent,
  //     },
  //     null
  //   );
  // }
  const childrenComponents: (IDnDComponent | ReactElement)[] = [];
  const uids: string[] =
    typeof component?.data?.children === 'object'
      ? component?.data?.children
      : [];
  for (const uid of uids) {
    const comp: IDnDComponent = components?.find(
      (item: IDnDComponent) => item?.data?.uid === uid
    ) as IDnDComponent;
    recursionImport(comp, components, importGroup);
  }
  const importString = [...importGroup?.entries()]?.reduce((pre, current) => {
    const [directory, listComponent] = current;
    const componentString =
      `import {${listComponent.join(', ')}} from "${directory}"` + `\n`;
    return (pre += componentString);
  }, '');
  return importString;
};
const generateProps = (props) => {
  const joinProps = Object.entries(props)?.reduce((pre, current) => {
    let [prop, value] = current;
    if (prop === 'sx') {
      value = `{${convertCssToString(value)}}`;
    }
    return (pre += `${prop}={${value}}` + `\n`);
  }, '');
  return joinProps;
};
const recursionComponentCode = (
  component: IDnDComponent,
  components: IDnDComponent[]
): IDnDComponent | ReactElement => {
  //   console.log('🚀 ===== recursionComponents ===== component:', component);
  const {
    data: { props },
    type,
  } = component;
  if (component?.data?.children?.length === 0) {
    const joinProps = generateProps(props);
    return `<${type}${`\n`}    ${joinProps}/>`;
  }
  if (typeof component?.data?.props?.children === 'string') {
    const joinProps = generateProps(props);
    return `<${type}${`\n`}    ${joinProps}>${
      component?.data?.props?.children
    }</${type}>`;
  }
  const childrenComponents: (IDnDComponent | ReactElement)[] = [];
  const uids: string[] =
    typeof component?.data?.children === 'object'
      ? component?.data?.children
      : [];
  for (const uid of uids) {
    const comp: IDnDComponent = components?.find(
      (item: IDnDComponent) => item?.data?.uid === uid
    ) as IDnDComponent;
    childrenComponents.push(recursionComponentCode(comp, components));
  }
  console.log('🚀 ===== childrenComponents:', childrenComponents);
  if (component?.data?.uid === 'root') {
    return `function App(){${`\n`}return (${`\n`}  ${childrenComponents?.join(
      `\n`
    )}) }
    `;
    // return `<App>${childrenComponents?.join(`\n`)}</App>`;
  }
  const joinProps = generateProps(props);
  return `<${type}${`\n`} ${joinProps}> ${childrenComponents?.join(
    `\n`
  )} </${type}>`;
};
export { recursionComponents, recursionImport, recursionComponentCode };
