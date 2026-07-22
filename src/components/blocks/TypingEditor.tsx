'use client';

import { TypingBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TypingEditor({ block }: { block: TypingBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: unknown) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  const handleLinesChange = (value: string) => {
    const lines = value.split('\\n').filter(line => line.trim() !== '');
    handleChange('lines', lines);
    handleChange('text', value);
  };
  
  const currentText = data.text || (data.lines ? data.lines.join('\\n') : '');

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-2">
        <Label>Animation Style</Label>
        <Select 
          value={data.style || 'typewriter'} 
          onValueChange={(val) => handleChange('style', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an animation style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="typewriter">Classic Typewriter (Single lines)</SelectItem>
            <SelectItem value="code-editor">Mac IDE Code Editor</SelectItem>
            <SelectItem value="terminal-scroll">Hacker Terminal Scroller</SelectItem>
            <SelectItem value="marquee">Infinite Marquee Ticker</SelectItem>
            <SelectItem value="vertical-scroll">Vertical Scroller</SelectItem>
            <SelectItem value="glitch">Cyberpunk Glitch Loop</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{(!data.style || data.style === 'typewriter') ? 'Typing Lines (One per line)' : 'Content to Animate'}</Label>
        <Textarea 
          value={currentText} 
          onChange={(e) => handleLinesChange(e.target.value)} 
          placeholder="import React from 'react';\\n\\nfunction HelloWorld() {\\n  return <div>Hello</div>;\\n}" 
          rows={6}
          className="font-mono text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Text Color (Hex)</Label>
          <ColorPicker 
            value={data.color} 
            onChange={(v) => handleChange('color', v)} 
            placeholder="00ff9f" 
          />
        </div>
        {(data.style && data.style !== 'typewriter') && (
          <div className="space-y-2">
            <Label>Background (Hex)</Label>
            <ColorPicker 
              value={data.background || '0d1117'} 
              onChange={(v) => handleChange('background', v)} 
              placeholder="0d1117" 
            />
          </div>
        )}
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Input 
            type="number"
            value={data.size} 
            onChange={(e) => handleChange('size', parseInt(e.target.value) || 24)} 
          />
        </div>
      </div>

      {(!data.style || data.style === 'typewriter') && (
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
      )}
    </div>
  );
}
