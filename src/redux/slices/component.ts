import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IComponent, IDnDComponent } from 'model';
import { v4 as uuidv4 } from 'uuid';
import { uniqBy } from 'lodash';

export interface ComponentState {
  components: IDnDComponent[] | [];
  selectedComponent: IDnDComponent | null;
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
      },
    },
  ],
  selectedComponent: null,
};

export const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    addComponent: (state, action) => {
      const currentState = current(state);
      const { data } = action.payload;
      console.log('🚀 ===== data:', [
        ...currentState?.components,
        action.payload,
      ]);
      const components = [...currentState?.components, action.payload]?.map(
        (item) => {
          if (item?.data?.uid === data?.parent?.uid) {
            // item?.data?.children.push(data?.uid);
            // return item;
            return {
              ...item,
              data: {
                ...item?.data,
                children: [...item?.data?.children, data?.uid],
              },
            };
          }
          return item;
        }
      );
      state.components = components;
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
      state.components = currentState?.components?.filter((component) => {
        return (
          component?.data?.uid !== currentState?.selectedComponent?.data?.uid
        );
      });
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
  },
});

// Action creators are generated for each case reducer function
export const {
  addComponent,
  setSelectedComponent,
  updateSelectedComponent,
  removeSelectedComponent,
} = componentSlice.actions;

export default componentSlice.reducer;