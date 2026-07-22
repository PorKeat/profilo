'use client';

import { useState, useEffect } from 'react';
import { PremiumHeroBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ColorPicker } from '@/components/ui/color-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Type } from 'lucide-react';
import { FONT_OPTIONS } from '@/lib/constants/fonts';

export function PremiumHeroEditor({ block }: { block: PremiumHeroBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string | string[]) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  const handleNestedChange = (parent: 'socials', field: string, value: string) => {
    dispatch(updateBlock({ 
      id: block.id, 
      data: { 
        [parent]: { ...data[parent], [field]: value } 
      } 
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      handleChange('localAvatarBase64', base64);
      handleChange('avatarUrl', ''); // Clear URL if local image is uploaded
    };
    reader.readAsDataURL(file);
  };

  const [localStyle, setLocalStyle] = useState<'solid' | 'gradient'>((data.style as 'solid' | 'gradient') || 'gradient');
  
  useEffect(() => {
    setLocalStyle((data.style as 'solid' | 'gradient') || 'gradient');
  }, [data.style]);

  const handleStyleChange = (newStyle: 'solid' | 'gradient') => {
    setLocalStyle(newStyle);
    // Allow the browser to paint the slider animation before locking the main thread with heavy SVG rendering
    setTimeout(() => {
      handleChange('style', newStyle);
    }, 10);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 p-4 border border-border/40 rounded-lg bg-card/10">
        <div className="flex flex-col gap-3 mb-2">
          <Label className="text-sm font-semibold">Visual Style</Label>
          <div className="relative grid grid-cols-2 bg-muted/50 p-1 rounded-lg border border-border/50 max-w-[280px]">
            <div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-background rounded-md shadow-sm transition-transform duration-300 ease-out"
              style={{
                transform: localStyle === 'gradient' ? 'translateX(100%)' : 'translateX(0)',
                left: '4px'
              }}
            />
            <button 
              type="button"
              className={`relative z-10 px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 ${localStyle === 'solid' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => handleStyleChange('solid')}
            >
              Solid Color
            </button>
            <button 
              type="button"
              className={`relative z-10 px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 ${localStyle === 'gradient' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => handleStyleChange('gradient')}
            >
              Animated Gradient
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {data.style === 'solid' ? 'Accent Color' : 'Gradient Start'}
            </Label>
            <ColorPicker
              value={data.sectionTitleColor || '#7C3AED'}
              onChange={(color) => handleChange('sectionTitleColor', color)}
            />
          </div>
          {(!data.style || data.style === 'gradient') && (
            <>
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Gradient Middle</Label>
                <ColorPicker
                  value={data.iconColor || '#22D3EE'}
                  onChange={(color) => handleChange('iconColor', color)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Gradient End</Label>
                <ColorPicker
                  value={data.accent3 || '#10B981'}
                  onChange={(color) => handleChange('accent3', color)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Type className="w-4 h-4 text-primary" />
          Typography
        </Label>
        <Select
          value={data.fontFamily || 'default'}
          onValueChange={(val) => handleChange('fontFamily', val === 'default' ? undefined : val)}
        >
          <SelectTrigger className="h-12 bg-muted/30 border-primary/20 hover:border-primary/40 transition-colors">
            <SelectValue placeholder="Select a beautiful font..." />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="default" className="py-3">
              <span className="font-semibold text-foreground/80">Default System Font</span>
            </SelectItem>
            {FONT_OPTIONS.map((font) => (
              <SelectItem key={font.id} value={font.id} className="py-3 cursor-pointer">
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
        <Input 
          value={data.name} 
          onChange={(e) => handleChange('name', e.target.value)} 
          placeholder="John Doe" 
        />
      </div>

      <div className="space-y-2 p-3 border border-border/40 rounded-lg bg-card/20 relative">
        <div className="flex justify-between items-center mb-1">
          <Label>Avatar Image</Label>
          {data.socials?.github && (
            <button 
              onClick={() => {
                handleChange('avatarUrl', `https://github.com/${data.socials?.github}.png`);
                handleChange('localAvatarBase64', '');
              }}
              className="text-[10px] text-primary hover:underline px-2 py-0.5 rounded bg-primary/10"
            >
              Use GitHub Avatar
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1">
            <Input 
              value={data.avatarUrl || ''} 
              onChange={(e) => {
                handleChange('avatarUrl', e.target.value);
                handleChange('localAvatarBase64', '');
              }} 
              placeholder="https://github.com/username.png" 
              className="text-sm"
            />
          </div>
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" type="button" className="w-full shrink-0">
              Upload File
            </Button>
          </div>
        </div>
        
        {data.localAvatarBase64 && (
          <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-[11px] text-yellow-600 dark:text-yellow-500">
            <strong>Warning:</strong> You uploaded a local file. It works perfectly in this preview, but when you export your markdown for GitHub, our cloud SVG server won&apos;t be able to read this file from your computer! For your actual GitHub profile, you MUST provide a public URL instead.
          </div>
        )}
        
        {!data.localAvatarBase64 && (
          <p className="text-[10px] text-muted-foreground mt-1">
            Provide a public image URL (like your GitHub profile picture) to scan your face instead of the ASCII art!
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>Titles (comma separated)</Label>
        <Input 
          value={data.titles.join(', ')} 
          onChange={(e) => handleChange('titles', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} 
          placeholder="Frontend Engineer, Open Source Contributor" 
        />
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input 
          value={data.location} 
          onChange={(e) => handleChange('location', e.target.value)} 
          placeholder="Cambodia" 
        />
      </div>

      <div className="space-y-2">
        <Label>Education</Label>
        <Input 
          value={data.education} 
          onChange={(e) => handleChange('education', e.target.value)} 
          placeholder="Computer Science, B.S." 
        />
      </div>

      <div className="space-y-2">
        <Label>Current Focus</Label>
        <Input 
          value={data.currentFocus} 
          onChange={(e) => handleChange('currentFocus', e.target.value)} 
          placeholder="Building cool things" 
        />
      </div>

      <div className="space-y-2">
        <Label>Portfolio URL</Label>
        <Input 
          value={data.portfolioUrl} 
          onChange={(e) => handleChange('portfolioUrl', e.target.value)} 
          placeholder="https://yourwebsite.com" 
        />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input 
          value={data.email} 
          onChange={(e) => handleChange('email', e.target.value)} 
          placeholder="hello@yourwebsite.com" 
        />
      </div>

      <div className="space-y-2">
        <Label>Skills (comma separated)</Label>
        <Input 
          value={data.skills.join(', ')} 
          onChange={(e) => handleChange('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} 
          placeholder="React, Next.js, TypeScript" 
        />
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground font-semibold">Social Links</Label>
        <div className="grid grid-cols-1 gap-2">
          <Input 
            value={data.socials?.github || ''} 
            onChange={(e) => handleNestedChange('socials', 'github', e.target.value)} 
            placeholder="GitHub Username" 
          />
          <Input 
            value={data.socials?.linkedin || ''} 
            onChange={(e) => handleNestedChange('socials', 'linkedin', e.target.value)} 
            placeholder="LinkedIn Username" 
          />
          <Input 
            value={data.socials?.twitter || ''} 
            onChange={(e) => handleNestedChange('socials', 'twitter', e.target.value)} 
            placeholder="Twitter Username" 
          />
        </div>
      </div>
    </div>
  );
}
