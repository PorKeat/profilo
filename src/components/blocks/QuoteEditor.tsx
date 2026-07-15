'use client';

import { QuoteBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Label } from '@/components/ui/label';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const QUOTE_THEMES = [
  'radical', 'tokyonight', 'dracula', 'dark', 'light', 'vision-friendly-dark', 'algolia', 'vue-dark', 'github-dark'
];

export function QuoteEditor({ block }: { block: QuoteBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string | boolean) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-2">
        <Label>Theme</Label>
        <SearchableSelect 
          value={data.theme} 
          onChange={(v) => v && handleChange('theme', v)}
          options={QUOTE_THEMES.map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
          placeholder="Select a theme..."
          searchPlaceholder="Search themes..."
        />
      </div>
      <div className="space-y-2">
        <Label>Layout</Label>
        <SearchableSelect 
          value={data.layout} 
          onChange={(v) => v && handleChange('layout', v)}
          options={[
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'vertical', label: 'Vertical' }
          ]}
          placeholder="Select layout..."
          searchPlaceholder="Search layouts..."
        />
      </div>
      <div className="space-y-2">
        <Label>Custom Quote (Optional)</Label>
        <Input 
          value={data.quote || ''} 
          onChange={(e) => handleChange('quote', e.target.value)} 
          placeholder="Leave blank for random quote" 
        />
      </div>
      <div className="space-y-2">
        <Label>Custom Author</Label>
        <Input 
          value={data.author || ''} 
          onChange={(e) => handleChange('author', e.target.value)} 
          placeholder="e.g. Linus Torvalds" 
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          checked={data.showAuthor !== false} 
          onCheckedChange={(v) => handleChange('showAuthor', v)} 
        />
        <Label>Show Author Name</Label>
      </div>
    </div>
  );
}
