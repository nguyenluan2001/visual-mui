import { IDnDComponent } from 'model';
import { v4 as uuidv4 } from 'uuid';

const formatComponent = (
  component: IDnDComponent,
  parent: string
): IDnDComponent => {
  if (!component?.data?.defaultChildren) {
    return {
      ...component,
      data: {
        ...component?.data,
        uid: uuidv4(),
        parent,
      },
    };
  }
  const parentUID = uuidv4();
  const childrenUID = Array(component?.data?.defaultChildren?.length)
    .fill(0)
    ?.map(() => uuidv4());
  return {
    ...component,
    data: {
      ...component?.data,
      uid: parentUID,
      parent,
      children: childrenUID,
      defaultChildren: component?.data?.defaultChildren?.map((item, index) => {
        return {
          ...item,
          data: {
            ...item?.data,
            uid: childrenUID[index],
            parent: parentUID,
            children: [],
          },
        };
      }),
    },
  };
};
export { formatComponent };
