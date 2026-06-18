'use client';

import { ActivityGraphBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ActivityGraphEditor({ block }: { block: ActivityGraphBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: unknown) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-2">
        <Label>GitHub Username</Label>
        <Input 
          value={data.username} 
          onChange={(e) => handleChange('username', e.target.value)} 
          placeholder="torvalds" 
        />
      </div>
      
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="useCustomColorsActivity" className="font-semibold cursor-pointer">Use Custom Hex Colors</Label>
          <Switch 
            id="useCustomColorsActivity" 
            checked={data.useCustomColors} 
            onCheckedChange={(checked) => handleChange('useCustomColors', checked)} 
          />
        </div>

        {!data.useCustomColors ? (
          <div className="space-y-2">
            <Label>Widget Theme</Label>
            <Select value={data.theme} onValueChange={(val) => handleChange('theme', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="radical">Radical</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="merko">Merko</SelectItem>
                <SelectItem value="gruvbox">Gruvbox</SelectItem>
                <SelectItem value="tokyonight">Tokyo Night</SelectItem>
                <SelectItem value="onedark">One Dark</SelectItem>
                <SelectItem value="cobalt">Cobalt</SelectItem>
                <SelectItem value="synthwave">Synthwave</SelectItem>
                <SelectItem value="highcontrast">High Contrast</SelectItem>
                <SelectItem value="dracula">Dracula</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Background (Hex)</Label>
              <Input 
                value={data.customColors?.bg} 
                onChange={(e) => handleChange('customColors', { ...data.customColors, bg: e.target.value })} 
                placeholder="000000" 
              />
            </div>
            <div className="space-y-2">
              <Label>Graph Line (Hex)</Label>
              <Input 
                value={data.customColors?.line} 
                onChange={(e) => handleChange('customColors', { ...data.customColors, line: e.target.value })} 
                placeholder="ff003c" 
              />
            </div>
            <div className="space-y-2">
              <Label>Data Points (Hex)</Label>
              <Input 
                value={data.customColors?.point} 
                onChange={(e) => handleChange('customColors', { ...data.customColors, point: e.target.value })} 
                placeholder="ffffff" 
              />
            </div>
            <div className="space-y-2">
              <Label>Text Color (Hex)</Label>
              <Input 
                value={data.customColors?.color} 
                onChange={(e) => handleChange('customColors', { ...data.customColors, color: e.target.value })} 
                placeholder="ff003c" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
