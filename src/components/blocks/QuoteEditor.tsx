'use client';

import { QuoteBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const QUOTE_THEMES = [
  'radical', 'tokyonight', 'dracula', 'dark', 'light', 'vision-friendly-dark', 'algolia', 'vue-dark', 'github-dark'
];

export function QuoteEditor({ block }: { block: QuoteBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-2">
        <Label>Theme</Label>
        <Select value={data.theme} onValueChange={(v) => handleChange('theme', v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {QUOTE_THEMES.map(t => (
              <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Layout</Label>
        <Select value={data.layout} onValueChange={(v) => handleChange('layout', v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="horizontal">Horizontal</SelectItem>
            <SelectItem value="vertical">Vertical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
