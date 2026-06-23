'use client';

import { TrophiesBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionTitleInput } from '@/components/ui/section-title-input';

const TROPHY_THEMES = [
  'flat', 'onedark', 'gruvbox', 'dracula', 'monokai', 'cobalt', 'synthwave', 'radical', 'tokyonight', 'discord', 'algolia', 'gitdimmed', 'matrix'
];

export function TrophiesEditor({ block }: { block: TrophiesBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string | boolean | number) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-6 text-left">
      <SectionTitleInput 
        title={data.sectionTitle} 
        defaultTitle="🏆 GitHub Trophies" 
        color={data.sectionTitleColor} 
        onChange={handleChange} 
      />
      <div className="space-y-2">
        <Label>GitHub Username</Label>
        <Input value={data.username} onChange={(e) => handleChange('username', e.target.value)} placeholder="yourusername" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Theme</Label>
          <Select value={data.theme} onValueChange={(v) => v && handleChange('theme', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TROPHY_THEMES.map(t => (
                <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Columns</Label>
          <Select value={data.columns.toString()} onValueChange={(v) => v && handleChange('columns', parseInt(v))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {[3, 4, 5, 6, 7].map(n => (
                <SelectItem key={n} value={n.toString()}>{n} Columns</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <div className="space-y-0.5">
          <Label className="text-sm font-medium">No Frame</Label>
          <p className="text-xs text-muted-foreground">Remove the border frame</p>
        </div>
        <Switch checked={data.noFrame} onCheckedChange={(c) => handleChange('noFrame', c)} />
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <div className="space-y-0.5">
          <Label className="text-sm font-medium">No Background</Label>
          <p className="text-xs text-muted-foreground">Make the background transparent</p>
        </div>
        <Switch checked={data.noBg} onCheckedChange={(c) => handleChange('noBg', c)} />
      </div>
    </div>
  );
}
