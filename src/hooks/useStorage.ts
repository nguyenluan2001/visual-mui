import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from 'react-use';
import {
  initComponents,
  loadComponentDone,
  updateComponentHistory,
  updateLoadingStatus,
} from '@/redux/slices/component';
import { store } from '@/redux/store';

const useStorage = () => {
  const [value, setValue, remove] = useLocalStorage(
    'components',
    '[{"type":"Box","data": {"uid":"root"} }]'
  );
  const { components } = useSelector((store) => store?.component);
  const dispatch = useDispatch();
  const saveComponents = () => {
    setValue(JSON.stringify(components));
  };
  const loadComponents = () => {
    dispatch(updateLoadingStatus(true));
    store.dispatch(initComponents(JSON.parse(value as string)));
    store.dispatch(updateComponentHistory(false));
    setTimeout(() => {
      dispatch(updateLoadingStatus(false));
    }, 3000);
  };
  const exportComponents = () => {
    const element = document.createElement('a');
    const jsonFile = new Blob([JSON.stringify(components)], {
      type: 'text/plain',
    }); // pass data from localStorage API to blob
    element.href = URL.createObjectURL(jsonFile);
    element.download = 'components.json';
    document.body.appendChild(element);
    return element.click();
  };
  const importComponents = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(updateLoadingStatus(true));
    const fileReader = new FileReader();
    fileReader.readAsText(e?.target?.files?.[0], 'UTF-8');
    fileReader.onload = (e) => {
      dispatch(initComponents(JSON.parse(e?.target?.result)));
      setTimeout(() => {
        dispatch(updateLoadingStatus(false));
      }, 3000);
    };
  };
  return { saveComponents, loadComponents, importComponents, exportComponents };
};
// eslint-disable-next-line import/prefer-default-export
export { useStorage };
