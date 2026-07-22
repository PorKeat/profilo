'use client';

import { TypingBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Terminal, Code, AlignLeft, MoveRight, ArrowDownToLine, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FONT_OPTIONS } from '@/lib/constants/fonts';

const ANIMATION_STYLES = [
  { id: 'typewriter', name: 'Typewriter', icon: AlignLeft, desc: 'Classic typing' },
  { id: 'code-editor', name: 'Code Editor', icon: Code, desc: 'Mac IDE window' },
  { id: 'terminal-scroll', name: 'Terminal', icon: Terminal, desc: 'Hacker scroller' },
  { id: 'marquee', name: 'Marquee', icon: MoveRight, desc: 'Infinite ticker' },
  { id: 'vertical-scroll', name: 'Vertical', icon: ArrowDownToLine, desc: 'Smooth scroll' },
  { id: 'glitch', name: 'Glitch', icon: Zap, desc: 'Cyberpunk effect' },
] as const;

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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {ANIMATION_STYLES.map((s) => {
            const Icon = s.icon;
            const isSelected = (data.style || 'typewriter') === s.id;
            return (
              <div 
                key={s.id}
                onClick={() => handleChange('style', s.id)}
                className={cn(
                  "cursor-pointer flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border/40 bg-muted/30 hover:bg-muted/80"
                )}
              >
                <Icon className={cn("h-6 w-6 mb-2 transition-colors", isSelected ? "text-primary" : "text-muted-foreground/70")} />
                <span className={cn("text-xs font-semibold transition-colors", isSelected ? "text-foreground" : "text-muted-foreground")}>{s.name}</span>
                <span className="text-[10px] text-muted-foreground/70 text-center mt-1">{s.desc}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          {(!data.style || data.style === 'typewriter') ? 'Typing Lines' : 'Content to Animate'}
          <span className="text-[10px] font-normal text-muted-foreground">(Press Enter for new lines)</span>
        </Label>
        <Textarea 
          value={currentText} 
          onChange={(e) => handleLinesChange(e.target.value)} 
          placeholder={data.style === 'code-editor' ? "import React from 'react';\\n\\nfunction HelloWorld() {\\n  return <div>Hello</div>;\\n}" : "Automating the Future\\nBuilding Scalable Infrastructure\\nTurning Coffee into Code"} 
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

      <div className="space-y-2 pt-2">
        <Label>Font Family</Label>
        <Select
          value={data.fontFamily || 'default'}
          onValueChange={(val) => handleChange('fontFamily', val === 'default' ? undefined : val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a font family" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Font</SelectItem>
            {FONT_OPTIONS.map((font) => (
              <SelectItem key={font.id} value={font.id}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

      {(data.style === 'marquee' || data.style === 'vertical-scroll') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
            <Label htmlFor="reverse" className="flex-1 cursor-pointer">Reverse Scroll Direction</Label>
            <Switch 
              id="reverse" 
              checked={data.direction === 'reverse'} 
              onCheckedChange={(checked) => handleChange('direction', checked ? 'reverse' : 'normal')} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
