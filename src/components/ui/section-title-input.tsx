import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';

interface SectionTitleInputProps {
  title: string | undefined;
  defaultTitle: string;
  color: string | undefined;
  iconColor?: string | undefined;
  hasIcons?: boolean;
  onChange: (field: string, value: string) => void;
}

export function SectionTitleInput({ title, defaultTitle, color, iconColor, hasIcons, onChange }: SectionTitleInputProps) {
  return (
    <div className="space-y-4 p-4 border border-border/50 rounded-lg bg-card/30">
      <div className="space-y-2">
        <Label>Section Title</Label>
        <Input 
          value={title ?? ''} 
          onChange={(e) => onChange('sectionTitle', e.target.value)} 
          placeholder={`Default: ${defaultTitle}`} 
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <Label className="text-muted-foreground text-xs">Title Color (empty for standard text)</Label>
          <ColorPicker 
            value={color ?? ''} 
            onChange={(v) => onChange('sectionTitleColor', v)} 
            placeholder="e.g. 4B86F7" 
          />
        </div>
        {hasIcons && (
          <div className="flex-1 space-y-2">
            <Label className="text-muted-foreground text-xs">Icon Color (empty for theme accent)</Label>
            <ColorPicker 
              value={iconColor ?? ''} 
              onChange={(v) => onChange('iconColor', v)} 
              placeholder="e.g. 4B86F7" 
            />
          </div>
        )}
      </div>
    </div>
  );
}
