import { configureStore } from '@reduxjs/toolkit';
import ComponentReduce from './slices/component';

export const store = configureStore({
  reducer: {
    component: ComponentReduce,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
