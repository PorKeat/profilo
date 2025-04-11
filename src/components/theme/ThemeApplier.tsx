'use client';

import { useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';

export function ThemeApplier() {
  const theme = useAppSelector(state => state.builder.themeId);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return null;
}
