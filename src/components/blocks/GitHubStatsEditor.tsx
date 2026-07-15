'use client';

import { GitHubStatsBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';
import { SectionTitleInput } from '@/components/ui/section-title-input';
import { Switch } from '@/components/ui/switch';
import { SearchableSelect } from '@/components/ui/searchable-select';

export function GitHubStatsEditor({ block }: { block: GitHubStatsBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: unknown) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-6 text-left">
      <SectionTitleInput 
        title={data.sectionTitle} 
        defaultTitle="GitHub Statistics" 
        color={data.sectionTitleColor} 
        onChange={handleChange} 
      />
      <div className="space-y-2">
        <Label>GitHub Username</Label>
        <Input 
          value={data.username} 
          onChange={(e) => handleChange('username', e.target.value)} 
          placeholder="torvalds" 
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <Label htmlFor="showStats" className="flex-1 cursor-pointer">Show Profile Stats</Label>
          <Switch 
            id="showStats" 
            checked={data.showStats} 
            onCheckedChange={(checked) => handleChange('showStats', checked)} 
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <Label htmlFor="showTopLanguages" className="flex-1 cursor-pointer">Show Top Languages</Label>
          <Switch 
            id="showTopLanguages" 
            checked={data.showTopLanguages} 
            onCheckedChange={(checked) => handleChange('showTopLanguages', checked)} 
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <Label htmlFor="showStreak" className="flex-1 cursor-pointer">Show Contribution Streak</Label>
          <Switch 
            id="showStreak" 
            checked={data.showStreak} 
            onCheckedChange={(checked) => handleChange('showStreak', checked)} 
          />
        </div>

        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <Label htmlFor="showProfileViews" className="flex-1 cursor-pointer">Show Profile Views</Label>
          <Switch 
            id="showProfileViews" 
            checked={data.showProfileViews} 
            onCheckedChange={(checked) => handleChange('showProfileViews', checked)} 
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="useCustomColors" className="font-semibold cursor-pointer">Use Custom Hex Colors</Label>
            <Switch 
              id="useCustomColors" 
              checked={data.useCustomColors} 
              onCheckedChange={(checked) => handleChange('useCustomColors', checked)} 
            />
          </div>

          {!data.useCustomColors ? (
            <div className="space-y-2">
              <Label>Widget Theme</Label>
              <SearchableSelect 
                value={data.theme || 'default'} 
                onChange={(val) => val && handleChange('theme', val)}
                options={[
                  { value: 'radical', label: 'Radical' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'merko', label: 'Merko' },
                  { value: 'gruvbox', label: 'Gruvbox' },
                  { value: 'tokyonight', label: 'Tokyo Night' },
                  { value: 'onedark', label: 'One Dark' },
                  { value: 'cobalt', label: 'Cobalt' },
                  { value: 'synthwave', label: 'Synthwave' },
                  { value: 'highcontrast', label: 'High Contrast' },
                  { value: 'dracula', label: 'Dracula' }
                ]}
                placeholder="Select a theme..."
                searchPlaceholder="Search themes..."
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Background (Hex)</Label>
                <ColorPicker 
                  value={data.customColors?.bg || ''} 
                  onChange={(v) => handleChange('customColors', { ...data.customColors, bg: v })} 
                  placeholder="000000" 
                />
              </div>
              <div className="space-y-2">
                <Label>Title (Hex)</Label>
                <ColorPicker 
                  value={data.customColors?.title || ''} 
                  onChange={(v) => handleChange('customColors', { ...data.customColors, title: v })} 
                  placeholder="ff003c" 
                />
              </div>
              <div className="space-y-2">
                <Label>Text (Hex)</Label>
                <ColorPicker 
                  value={data.customColors?.text || ''} 
                  onChange={(v) => handleChange('customColors', { ...data.customColors, text: v })} 
                  placeholder="ffffff" 
                />
              </div>
              <div className="space-y-2">
                <Label>Icon (Hex)</Label>
                <ColorPicker 
                  value={data.customColors?.icon || ''} 
                  onChange={(v) => handleChange('customColors', { ...data.customColors, icon: v })} 
                  placeholder="ff003c" 
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Border (Hex)</Label>
                <ColorPicker 
                  value={data.customColors?.border || ''} 
                  onChange={(v) => handleChange('customColors', { ...data.customColors, border: v })} 
                  placeholder="ff003c" 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
