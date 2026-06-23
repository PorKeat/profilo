'use client';

import { SupportBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { MarkdownInput } from '@/components/ui/markdown-input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { X, Globe, QrCode } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { SectionTitleInput } from '@/components/ui/section-title-input';

export function SupportEditor({ block }: { block: SupportBlock }) {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      handleChange('qrCodeBase64', base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    handleChange('qrCodeBase64', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const mode = data.supportMode || 'international';

  return (
    <div className="space-y-6 text-left">
      <SectionTitleInput 
        title={data.sectionTitle} 
        defaultTitle="☕ Support Me" 
        color={data.sectionTitleColor} 
        iconColor={data.iconColor}
        hasIcons={true}
        onChange={handleChange} 
      />
      <Tabs 
        value={mode} 
        onValueChange={(val) => val && handleChange('supportMode', val)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="international" className="text-xs gap-1.5">
            <Globe className="w-3.5 h-3.5" /> International
          </TabsTrigger>
          <TabsTrigger value="local" className="text-xs gap-1.5">
            <QrCode className="w-3.5 h-3.5" /> Local QR
          </TabsTrigger>
        </TabsList>

        <TabsContent value="international" className={cn("space-y-4 mt-0", mode !== 'international' && "hidden")}>
          <div className="space-y-2">
            <Label>Buy Me A Coffee Username</Label>
            <Input value={data.buyMeACoffee || ''} onChange={(e) => handleChange('buyMeACoffee', e.target.value)} placeholder="yourname" />
          </div>
          <div className="space-y-2">
            <Label>Patreon Username</Label>
            <Input value={data.patreon || ''} onChange={(e) => handleChange('patreon', e.target.value)} placeholder="yourname" />
          </div>
          <div className="space-y-2">
            <Label>Ko-fi Username</Label>
            <Input value={data.kofi || ''} onChange={(e) => handleChange('kofi', e.target.value)} placeholder="yourname" />
          </div>
          <div className="space-y-2">
            <Label>GitHub Sponsors Username</Label>
            <Input value={data.github || ''} onChange={(e) => handleChange('github', e.target.value)} placeholder="yourname" />
          </div>
        </TabsContent>

        <TabsContent value="local" className={cn("space-y-4 mt-0", mode !== 'local' && "hidden")}>
          <div className="space-y-2">
            <Label>QR Code Image (e.g. ABA / Bakong)</Label>
            
            {data.qrCodeBase64 ? (
              <div className="relative inline-block border rounded-lg p-2 bg-muted/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.qrCodeBase64} alt="QR Code Preview" className="h-32 object-contain rounded border" />
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
              <div>
                <Input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef}
                  onChange={handleFileUpload} 
                  className="text-xs file:bg-primary file:text-primary-foreground file:border-0 file:rounded file:px-2 file:py-1 file:mr-2 file:text-xs file:cursor-pointer hover:file:bg-primary/90"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Image is stored locally and will be exported in your ZIP file.
                </p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>QR Code Label</Label>
            <MarkdownInput value={data.qrCodeLabel || ''} onChange={(val) => handleChange('qrCodeLabel', val)} placeholder="Scan to donate via ABA" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
