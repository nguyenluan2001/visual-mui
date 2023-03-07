import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedComponent } from '@/redux/slices/component';

const useForm = () => {
  const { selectedComponent } = useSelector((store) => store?.component);
  const dispatch = useDispatch();
  const updateSelectedComponentProps = (key: string, value: any): void => {
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
