'use client';

import { TypingBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export function TypingEditor({ block }: { block: TypingBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: any) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  const handleLinesChange = (value: string) => {
    const lines = value.split('\n').filter(line => line.trim() !== '');
    handleChange('lines', lines);
  };

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-2">
        <Label>Typing Lines (One per line)</Label>
        <Textarea 
          value={data.lines.join('\n')} 
          onChange={(e) => handleLinesChange(e.target.value)} 
          placeholder="Automating the Future&#10;Building Scalable Infrastructure" 
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Text Color (Hex)</Label>
          <Input 
            value={data.color} 
            onChange={(e) => handleChange('color', e.target.value)} 
            placeholder="e.g. ff003c" 
          />
        </div>
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Input 
            type="number"
            value={data.size} 
            onChange={(e) => handleChange('size', parseInt(e.target.value) || 24)} 
          />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <Label htmlFor="center" className="flex-1 cursor-pointer">Center Horizontally</Label>
          <Switch 
            id="center" 
            checked={data.center} 
            onCheckedChange={(checked) => handleChange('center', checked)} 
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <Label htmlFor="vCenter" className="flex-1 cursor-pointer">Center Vertically</Label>
          <Switch 
            id="vCenter" 
            checked={data.vCenter} 
            onCheckedChange={(checked) => handleChange('vCenter', checked)} 
          />
        </div>
      </div>
    </div>
  );
}
