import React from 'react';
import RenderComponent from '@/components/editor/RenderComponent';
import { mappingComponent } from '@/components/compoentList';

const recursionComponents = (component, components) => {
  //   console.log('🚀 ===== recursionComponents ===== component:', component);
  if (component?.data?.children?.length === 0) {
    return React.createElement(RenderComponent, {
      component,
    });
  }
  const childrenComponents = [];
  const uids =
    typeof component?.data?.children === 'object'
      ? component?.data?.children
      : [];
  for (const uid of uids) {
    const _comp = components?.find((item) => item?.data?.uid === uid);
    childrenComponents.push(recursionComponents(_comp, components));
    // if (_comp?.data?.children?.length !== 0) {
    // }
    // childrenComponents.push(_comp);
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
  //   return React.createElement(
  //     mappingComponent[component?.type],
  //     { ...component?.data?.props },
  //     childrenComponents
  //   );
};
export default recursionComponents;
