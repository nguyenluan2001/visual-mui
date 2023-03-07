import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IComponent, IDnDComponent } from 'model';
import { v4 as uuidv4 } from 'uuid';

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
      state.components.push(action.payload);
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
