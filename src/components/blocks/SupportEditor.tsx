'use client';

import { SupportBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useRef } from 'react';

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

  return (
    <div className="space-y-4 text-left">
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
      <hr className="my-4" />
      <div className="space-y-2">
        <Label>QR Code Image (e.g. ABA / Bakong)</Label>
        
        {data.qrCodeBase64 ? (
          <div className="relative inline-block border rounded-lg p-2 bg-muted/30">
            <img src={data.qrCodeBase64} alt="QR Code" className="w-24 h-24 object-contain rounded" />
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
        <Input value={data.qrCodeLabel || ''} onChange={(e) => handleChange('qrCodeLabel', e.target.value)} placeholder="Scan to donate via ABA" />
      </div>
    </div>
  );
}
