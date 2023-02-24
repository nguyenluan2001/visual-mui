import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IComponent, IDnDComponent } from 'model';

export interface ComponentState {
  components: IDnDComponent[] | [];
  selectedComponent: IDnDComponent | null;
}

const initialState: ComponentState = {
  components: [],
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
        if (item?.uid === currentState?.selectedComponent?.uid) {
          return action.payload;
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addComponent, setSelectedComponent, updateSelectedComponent } =
  componentSlice.actions;

export default componentSlice.reducer;
