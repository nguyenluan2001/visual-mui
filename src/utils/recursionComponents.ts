import React, { ReactElement } from 'react';
import { IDnDComponent } from 'model';
import RenderComponent from '@/components/editor/RenderComponent';
import { mappingComponent } from '@/components/compoentList';

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
  // eslint-disable-next-line no-restricted-syntax
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
export default recursionComponents;
