'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { setTemplate } from '@/store/builderSlice';
import { TEMPLATES } from '@/lib/templates';

export function TemplateLoader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const loadedRef = useRef(false);

  useEffect(() => {
    const templateId = searchParams.get('template');
    
    if (templateId && !loadedRef.current) {
      const template = TEMPLATES.find(t => t.id === templateId);
      
      if (template) {
        // We parse and stringify to clone the blocks and avoid mutability issues
        dispatch(setTemplate({
          templateId: template.id,
          blocks: JSON.parse(JSON.stringify(template.blocks)),
          themeId: template.themeId
        }));
        
        // Mark as loaded so we don't trigger it again
        loadedRef.current = true;
        
        // Remove the query param from URL so it doesn't reload on refresh
        router.replace(pathname, { scroll: false });
      }
    }
  }, [searchParams, dispatch, router, pathname]);

  return null; // This component has no UI
}
