import { configureStore } from '@reduxjs/toolkit'
import { fileTreeReducers } from './features/fileTreeSlice'
// ...

export const store = configureStore({
  reducer: {
    tree:fileTreeReducers,
  
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
