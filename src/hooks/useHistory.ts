import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from 'react-use';
import { v4 as uuidv4 } from 'uuid';
import {
  initComponents,
  loadComponentDone,
  updateComponentHistory,
  updateLoadingStatus,
} from '@/redux/slices/component';
import { store } from '@/redux/store';

const useHistory = () => {
  const { components, isHistory } = useSelector((store) => store?.component);
  // const [version, setVersion] = useLocalStorage('version', 0);
  // const [history, setHistory] = useLocalStorage('history', [
  //   {
  //     uid: uuidv4(),
  //     components,
  //     isHistory: false,
  //   },
  // ]);
  const dispatch = useDispatch();
  const saveHistory = () => {
    if (!isHistory) {
      const _history = JSON.parse(localStorage.getItem('history'));
      const latestVersion = _history?.length - 1;
      // setHistory(
      //   JSON.stringify([
      //     ...JSON.parse(history),
      //     {
      //       uid: uuidv4(),
      //       components,
      //       isHistory: true,
      //     },
      //   ])
      // );
      localStorage.setItem('history', [
        ..._history,
        {
          uid: uuidv4(),
          components,
          isHistory: true,
        },
      ]);
      localStorage.setItem('verison', latestVersion);
    }
  };
  const previousVersion = () => {
    const _history = localStorage.getItem('history');
    const _version = localStorage.getItem('verison');
    const currentState = _history?.[_version - 1];
    store.dispatch(updateComponentHistory(true));
    store.dispatch(initComponents(currentState?.components));
    setVersion(_version - 1);
  };
  const nextVersion = () => {
    const _history = localStorage.getItem('history');
    const currentState = _history?.[version + 1];
    store.dispatch(updateComponentHistory(true));
    store.dispatch(initComponents(currentState?.components));
    setVersion(version + 1);
  };
  return { saveHistory, previousVersion, nextVersion };
};
// eslint-disable-next-line import/prefer-default-export
export { useHistory };
