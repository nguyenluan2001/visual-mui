import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedComponent } from '@/redux/slices/component';

const useForm = () => {
  const { selectedComponent } = useSelector((store) => store?.component);
  const dispatch = useDispatch();
  const updateSelectedComponentProps = (
    key: string | string[],
    value: any
  ): void => {
    if (typeof key === 'string') {
      dispatch(
        updateSelectedComponent({
          ...selectedComponent,
          data: {
            ...selectedComponent?.data,
            props: {
              ...selectedComponent?.data?.props,
              [key]: value,
            },
          },
        })
      );
    } else {
      const newProps = key?.reduce((pre, current, index) => {
        return {
          ...pre,
          [current]: value?.[index],
        };
      }, {});
      dispatch(
        updateSelectedComponent({
          ...selectedComponent,
          data: {
            ...selectedComponent?.data,
            props: {
              ...selectedComponent?.data?.props,
              ...newProps,
            },
          },
        })
      );
    }
  };
  const updateSelectedComponentChildren = (value: any): void => {
    dispatch(
      updateSelectedComponent({
        ...selectedComponent,
        data: {
          ...selectedComponent?.data,
          children: value,
        },
      })
    );
  };
  return { updateSelectedComponentProps, updateSelectedComponentChildren };
};
export default useForm;
