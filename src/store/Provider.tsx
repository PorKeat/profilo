'use client';

import { Provider } from 'react-redux';
import { store } from './index';
import { ThemeApplier } from '@/components/theme/ThemeApplier';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeApplier />
      {children}
    </Provider>
  );
}
