import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IComponent, IDnDComponent } from 'model';
import { v4 as uuidv4 } from 'uuid';
import { uniqBy, remove, isEqual } from 'lodash';
import produce from 'immer';

export interface ComponentState {
  components: IDnDComponent[] | [];
  selectedComponent: IDnDComponent | null;
  isLoading?: boolean;
  previousSwap: [number, number];
}

const initialState: ComponentState = {
  components: [
    {
      type: 'Box',
      data: {
        uid: 'root',
        props: {
          sx: {},
        },
        parent: null,
        children: [],
      },
    },
  ],
  selectedComponent: null,
  isLoading: false,
  isHistory: false,
};

export const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    initComponents: (state, action) => {
      state.components = action.payload;
    },
    updateLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    addComponent: (state, action) => {
      const currentState = current(state);
      const { data } = action.payload;
      console.log('🚀 ===== data:', [
        ...currentState?.components,
        action.payload,
      ]);
      const components = [...currentState?.components, action.payload]?.map(
        (item) => {
          if (item?.data?.uid === data?.parent) {
            // item?.data?.children.push(data?.uid);
            // return item;
            return {
              ...item,
              data: {
                ...item?.data,
                children: [...(item?.data?.children || []), data?.uid],
              },
            };
          }
          return item;
        }
      );
      console.log('🚀 ===== components:', components);
      state.components = components;
      state.isHistory = false;
      // if (data.parent?.uid !== 'root') {
      //   state.components = [...currentState?.components]?.map((item) => {
      //     if (item?.data?.uid === data?.parent?.uid) {
      //       item?.data?.children.push(data?.uid);
      //       return item;
      //     }
      //     return item;
      //   });
      // }
    },
    setSelectedComponent: (state, action) => {
      state.selectedComponent = action.payload;
    },
    updateSelectedComponent: (state, action) => {
      console.log('🚀 ===== action:', action.payload);
      const currentState = current(state);
      state.selectedComponent = action.payload;
      state.components = currentState?.components?.map((item) => {
        if (item?.data?.uid === currentState?.selectedComponent?.data?.uid) {
          return action.payload;
        }
        return item;
      });
    },
    removeSelectedComponent: (state, action) => {
      const currentState = current(state);
      const selectedComponent = currentState?.selectedComponent;
      const newComponents = currentState?.components
        ?.filter((component) => {
          return (
            component?.data?.uid !== currentState?.selectedComponent?.data?.uid
          );
        })
        ?.map((component) => {
          if (selectedComponent?.data?.parent === component?.data?.uid) {
            return {
              ...component,
              data: {
                ...component?.data,
                children: component?.data?.children?.filter(
                  (item) => item !== selectedComponent?.data?.uid
                ),
              },
            };
          }
          return component;
        });
      state.components = newComponents;
      state.selectedComponent = null;
    },
    duplicateComponent: (state, action) => {
      const currentState = current(state);
      state.components = currentState?.components?.filter((component) => {
        return (
          component?.data?.uid !== currentState?.selectedComponent?.data?.uid
        );
      });
      state.selectedComponent = null;
    },
    clearComponents: (state) => {
      state.components = initialState.components;
      state.selectedComponent = initialState.selectedComponent;
    },
    updateComponentHistory: (state, action) => {
      state.isHistory = action.payload;
    },
    swapComponent: (state, action) => {
      const currentState = current(state);
      const components = currentState?.components;
      const {
        dragComponent,
        hoverComponent,
      }: { dragComponent: IDnDComponent; hoverComponent: IDnDComponent } =
        action.payload;
      console.log('🚀 ===== hoverComponent:', hoverComponent);
      console.log('🚀 ===== dragComponent:', dragComponent);
      // ====== Hover parent ======
      const hoverParent = components?.find(
        (item) => item?.data?.uid === hoverComponent?.data?.parent
      );
      let hoverChildren = hoverParent?.data?.children;
      const hoverParentIndex = components?.findIndex(
        (item) => item?.data?.uid === hoverParent?.data?.uid
      );
      const hoverIndex = hoverChildren?.findIndex(
        (item) => item === hoverComponent?.data?.uid
      );
      const dragIndex = hoverChildren?.findIndex(
        (item) => item === dragComponent?.data?.uid
      );
      console.log('🚀 ===== hoverParent:', hoverParent);
      console.log('🚀 ===== hoverIndex:', hoverIndex);
      // ====== Drag parent ======
      const dragParent = components?.find(
        (item) => item?.data?.uid === dragComponent?.data?.parent
      );
      let dragChildren = dragParent?.data?.children;
      const dragParentIndex = components?.findIndex(
        (item) => item?.data?.uid === dragParent?.data?.uid
      );
      const newComponents = JSON.parse(JSON.stringify(components));
      if (isEqual(currentState.previousSwap, [hoverIndex, dragIndex]))
        return false;
      if (!hoverChildren?.includes(dragComponent?.data?.uid)) {
        hoverChildren = [...hoverChildren, dragComponent?.data?.uid];
        console.log('🚀 ===== hoverChildren:', hoverChildren);
        // hoverChildren = hoverChildren.push(dragComponent?.data?.uid);
        const len = hoverChildren?.length;
        if (hoverComponent?.index) {
          hoverChildren = produce(hoverChildren, (draftState: string[]) => {
            [draftState[hoverIndex], draftState[len - 1]] = [
              dragComponent?.data?.uid,
              hoverComponent?.data?.uid,
            ];
          });
        }
        dragChildren = dragChildren?.filter(
          (item: string) => item !== dragComponent?.data?.uid
        );
        newComponents[hoverParentIndex].data.children = hoverChildren;
        newComponents[dragParentIndex].data.children = dragChildren;
        // state.components[hoverParentIndex].data.children = hoverChildren;
        // state.components[dragParentIndex].data.children = dragChildren;
      } else if (hoverComponent?.index) {
        const nextState = produce(hoverChildren, (draftState: string[]) => {
          // draftState chính là 1 bản sao của baseState,
          // ta có thể thay đổi draftState tùy ý mà không sợ ảnh hưởng đến baseState
          [draftState[hoverIndex], draftState[dragIndex]] = [
            draftState[dragIndex],
            draftState[hoverIndex],
          ];
        });
        newComponents[hoverParentIndex].data.children = nextState;
        state.previousSwap = [dragIndex, hoverIndex];
      }
      state.components = newComponents;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initComponents,
  addComponent,
  setSelectedComponent,
  updateSelectedComponent,
  removeSelectedComponent,
  updateLoadingStatus,
  clearComponents,
  updateComponentHistory,
  swapComponent,
} = componentSlice.actions;

export default componentSlice.reducer;
