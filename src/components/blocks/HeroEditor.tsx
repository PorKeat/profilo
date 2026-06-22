'use client';

import { HeroBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { MarkdownInput } from '@/components/ui/markdown-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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
    <div className="space-y-4 text-left">
      <div className="space-y-2">
        <Label>Name</Label>
        <MarkdownInput value={data.name} onChange={(val) => handleChange('name', val)} placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <MarkdownInput value={data.title} onChange={(val) => handleChange('title', val)} placeholder="Full Stack Developer" />
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
