import { MinimalistHeroBlock } from '@/types/blocks';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from '@/components/ui/color-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FONT_OPTIONS } from '@/lib/constants/fonts';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { LayoutTemplate, PanelRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function MinimalistHeroEditor({ block }: { block: MinimalistHeroBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: unknown) => {
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
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input 
              value={data.name || ''} 
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Steve Jobs"
            />
          </div>
          <div className="space-y-2">
            <Label>Title / Role</Label>
            <Input 
              value={data.title || ''} 
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Design Visionary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Bio / Tagline</Label>
          <Textarea 
            value={data.bio || ''} 
            onChange={(e) => handleChange('bio', e.target.value)}
            placeholder="Simplicity is the ultimate sophistication."
            className="h-20"
          />
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Background Color</Label>
            <ColorPicker 
              value={data.bgColor || '#000000'} 
              onChange={(v) => handleChange('bgColor', v)} 
            />
          </div>
          <div className="space-y-2">
            <Label>Accent Color</Label>
            <ColorPicker 
              value={data.accentColor || '#ffffff'} 
              onChange={(v) => handleChange('accentColor', v)} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select 
            value={data.fontFamily || 'default'} 
            onValueChange={(v) => handleChange('fontFamily', v === 'default' ? undefined : v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a modern font..." />
            </SelectTrigger>
            <SelectContent>
              {/* @ts-expect-error - textValue and label needed for BaseUI */}
              <SelectItem value="default" label="Default System Font" textValue="Default System Font" className="py-3">
                <span className="font-semibold text-foreground/80">Default System Font</span>
              </SelectItem>
              {FONT_OPTIONS.map((font) => (
                // @ts-expect-error - textValue and label needed for BaseUI
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
          <Label>Layout</Label>
          <div className="grid grid-cols-2 gap-2">
            <div 
              onClick={() => handleChange('layout', 'left')}
              className={cn(
                "cursor-pointer flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                (!data.layout || data.layout === 'left')
                  ? "border-primary bg-primary/5 shadow-sm" 
                  : "border-border/40 bg-muted/30 hover:bg-muted/80"
              )}
            >
              <LayoutTemplate className={cn("h-6 w-6 mb-2 transition-colors", (!data.layout || data.layout === 'left') ? "text-primary" : "text-muted-foreground/70")} />
              <span className={cn("text-xs font-semibold transition-colors", (!data.layout || data.layout === 'left') ? "text-foreground" : "text-muted-foreground")}>Avatar Right</span>
            </div>
            <div 
              onClick={() => handleChange('layout', 'right')}
              className={cn(
                "cursor-pointer flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                (data.layout === 'right')
                  ? "border-primary bg-primary/5 shadow-sm" 
                  : "border-border/40 bg-muted/30 hover:bg-muted/80"
              )}
            >
              <PanelRight className={cn("h-6 w-6 mb-2 transition-colors", (data.layout === 'right') ? "text-primary" : "text-muted-foreground/70")} />
              <span className={cn("text-xs font-semibold transition-colors", (data.layout === 'right') ? "text-foreground" : "text-muted-foreground")}>Avatar Left</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
