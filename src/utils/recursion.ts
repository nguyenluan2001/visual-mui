/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line no-restricted-syntax
import React, { ReactElement, ReactNode } from 'react';
import { IDnDComponent } from 'model';
import { isEmpty, omit } from 'lodash';
import RenderComponent from '@/components/editor/RenderComponent';
import { mappingComponent } from '@/components/compoentList';
import { convertCssToString } from './codeEditor ';

const recursionComponents = (
  component: IDnDComponent,
  components: IDnDComponent[]
): IDnDComponent | ReactNode => {
  if (component?.data?.children?.length === 0) {
    return React.createElement(
      RenderComponent,
      {
        component: component as IDnDComponent,
        children: null,
      },
      null
    );
  }
  const childrenComponents: (IDnDComponent | ReactNode)[] = [];
  const uids: string[] =
    typeof component?.data?.children === 'object'
      ? component?.data?.children
      : [];
  for (const uid of uids) {
    const comp = components?.find(
      (item: IDnDComponent) => item?.data?.uid === uid
    ) as IDnDComponent;
    childrenComponents.push(recursionComponents(comp, components));
  }
  if (component?.data?.uid === 'root') {
    return React.createElement(
      mappingComponent[component?.type],
      { ...component?.data?.props },
      childrenComponents as ReactNode
    );
  }
  return React.createElement(
    RenderComponent,
    {
      component,
      children: childrenComponents,
    },
    childrenComponents as ReactNode
  );
};
const recursionImport = (
  component: IDnDComponent,
  components: IDnDComponent[],
  importGroup = new Map()
): string => {
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
  const importString = [
    ...(importGroup.size > 0 ? importGroup?.entries() : []),
  ]?.reduce((pre, current) => {
    const [directory, listComponent] = current;
    const componentString =
      `import {${listComponent.join(', ')}} from "${directory}"` + `\n`;
    const totalString = pre + componentString;
    return totalString;
  }, '');
  return importString;
};
const generateProps = (props: Record<string, any>) => {
  const joinProps = Object.entries(props)?.reduce((pre, current) => {
    let [prop, value]: [string, string | boolean | Record<string, string>] =
      current;
    if (prop === 'sx') {
      if (!isEmpty(value)) {
        value = `{${convertCssToString(
          value as Record<string, string>,
          true
        )}}`;
      } else {
        return pre;
      }
    } else if ([true, false]?.includes(value as boolean)) {
      value = Boolean(value);
    } else {
      value = `"${value}"`;
    }
    const totalProps = `${pre}${prop}={${value}}`;
    return totalProps;
  }, '');
  return joinProps;
};
const recursionComponentCode = (
  component: IDnDComponent,
  components: IDnDComponent[]
): string => {
  const {
    data: { props },
    type,
  } = component;
  if (component?.data?.children?.length === 0) {
    const joinProps = generateProps(omit(props, 'children'));
    return `<${type} ${joinProps}/>`;
  }
  if (typeof component?.data?.props?.children === 'string') {
    const joinProps = generateProps(omit(props, 'children'));
    return `<${type} ${joinProps}>${component?.data?.props?.children}</${type}>`;
  }
  const childrenComponents: (IDnDComponent | ReactNode)[] = [];
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
  if (component?.data?.uid === 'root') {
    return `function App(){return (${childrenComponents?.join('')}) }
    `;
    // return `<App>${childrenComponents?.join(`\n`)}</App>`;
  }
  const joinProps = generateProps(props);
  return `<${type} ${joinProps}> ${childrenComponents?.join('')} </${type}>`;
};
export { recursionComponents, recursionImport, recursionComponentCode };
