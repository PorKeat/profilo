import { configureStore } from '@reduxjs/toolkit';
import builderReducer from './builderSlice';

export const store = configureStore({
  reducer: {
    builder: builderReducer,
  },
});

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('profilo-state', JSON.stringify(state.builder));
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
