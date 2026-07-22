'use client';

import { HeroBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { MarkdownInput } from '@/components/ui/markdown-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ColorPicker } from '@/components/ui/color-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Type } from 'lucide-react';
import { FONT_OPTIONS } from '@/lib/constants/fonts';

export function HeroEditor({ block }: { block: HeroBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string | undefined) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      handleChange('localAvatarBase64', base64);
      handleChange('avatarUrl', undefined); // Clear URL if local image is uploaded
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    handleChange('localAvatarBase64', undefined);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Type className="w-4 h-4 text-primary" />
          Typography
        </Label>
        <Select
          value={data.fontFamily || 'default'}
          onValueChange={(val) => handleChange('fontFamily', (val === 'default' ? undefined : val) as any)}
        >
          <SelectTrigger className="h-12 bg-muted/30 border-primary/20 hover:border-primary/40 transition-colors">
            <SelectValue placeholder="Select a beautiful font..." />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {/* @ts-ignore */}
            <SelectItem value="default" label="Default System Font" textValue="Default System Font" className="py-3">
              <span className="font-semibold text-foreground/80">Default System Font</span>
            </SelectItem>
            {FONT_OPTIONS.map((font) => (
              /* @ts-ignore */
              <SelectItem key={font.id} value={font.id} label={font.label} textValue={font.label} className="py-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-xs text-muted-foreground uppercase tracking-wider">{font.label}</span>
                  <span className="text-lg text-foreground" style={{ fontFamily: font.stack }}>
                    The quick brown fox jumps
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Name</Label>
        <MarkdownInput value={data.name} onChange={(val) => handleChange('name', val)} placeholder="John Doe" />
        <div className="pt-2">
          <Label className="text-muted-foreground text-xs block mb-1">Name Color (Hex without #)</Label>
          <ColorPicker value={data.nameColor || ''} onChange={(val) => handleChange('nameColor', val)} placeholder="e.g. 58a6ff" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <MarkdownInput value={data.title} onChange={(val) => handleChange('title', val)} placeholder="Full Stack Developer" />
        <div className="pt-2">
          <Label className="text-muted-foreground text-xs block mb-1">Title Color (Hex without #)</Label>
          <ColorPicker value={data.titleColor || ''} onChange={(val) => handleChange('titleColor', val)} placeholder="e.g. 79c0ff" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Short Intro</Label>
        <MarkdownInput value={data.shortIntro} onChange={(val) => handleChange('shortIntro', val)} placeholder="I build things for the web." />
      </div>
      <div className="space-y-2">
        <Label>Avatar Image</Label>
        
        {data.localAvatarBase64 ? (
          <div className="relative inline-block border rounded-lg p-2 bg-background">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.localAvatarBase64} alt="Avatar Preview" className="h-16 w-16 object-cover rounded-full" />
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
              onClick={handleRemoveImage}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="text-xs file:bg-primary file:text-primary-foreground file:border-0 file:rounded file:px-2 file:py-1 file:mr-2 file:text-xs file:cursor-pointer hover:file:bg-primary/90"
            />
            <div className="text-xs text-muted-foreground text-center">OR</div>
            <Input value={data.avatarUrl || ''} onChange={(e) => handleChange('avatarUrl', e.target.value)} placeholder="https://github.com/username.png" />
          </div>
        )}
      </div>
    </div>
  );
}
