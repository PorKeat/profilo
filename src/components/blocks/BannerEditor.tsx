'use client';

import { BannerBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function BannerEditor({ block }: { block: BannerBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: unknown) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-4 text-left">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Section</Label>
          <Select value={data.section} onValueChange={(val) => val && handleChange('section', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="header">Header</SelectItem>
              <SelectItem value="footer">Footer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Banner Type</Label>
          <Select value={data.bannerType} onValueChange={(val) => val && handleChange('bannerType', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="waving">Waving</SelectItem>
              <SelectItem value="rect">Rectangle</SelectItem>
              <SelectItem value="soft">Soft</SelectItem>
              <SelectItem value="cylinder">Cylinder</SelectItem>
              <SelectItem value="transparent">Transparent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Main Text</Label>
        <Input 
          value={data.text} 
          onChange={(e) => handleChange('text', e.target.value)} 
          placeholder="e.g. Hello World" 
        />
      </div>

      <div className="space-y-2">
        <Label>Description (Subtitle)</Label>
        <Input 
          value={data.desc} 
          onChange={(e) => handleChange('desc', e.target.value)} 
          placeholder="e.g. Welcome to my profile" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Height</Label>
          <Input 
            type="number"
            value={data.height} 
            onChange={(e) => handleChange('height', parseInt(e.target.value) || 250)} 
          />
        </div>
        <div className="space-y-2">
          <Label>Font Color (Hex)</Label>
          <ColorPicker 
            value={data.fontColor} 
            onChange={(v) => handleChange('fontColor', v)} 
            placeholder="FFFFFF"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Background Color (Hex)</Label>
        <ColorPicker 
          value={data.color} 
          onChange={(v) => handleChange('color', v)} 
          placeholder="000000"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Use hex colors without the # symbol. Or simply use &apos;timeAuto&apos; for a dynamic gradient!
        </p>
      </div>
    </div>
  );
}
