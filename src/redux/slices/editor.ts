import { createSlice } from '@reduxjs/toolkit';

export interface EditorState {
  isOpenCodePanel: boolean;
  isOpenBuildMode: boolean;
}

const initialState: EditorState = {
  isOpenCodePanel: false,
  isOpenBuildMode: false,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    toggleCodePanel: (state, action) => {
      state.isOpenCodePanel = action.payload;
    },
    toggleBuildMode: (state, action) => {
      state.isOpenBuildMode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleBuildMode, toggleCodePanel } = editorSlice.actions;

export default editorSlice.reducer;
