'use client';

import { AboutBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { MarkdownInput, MarkdownTextarea } from '@/components/ui/markdown-input';
import { Label } from '@/components/ui/label';
import { Button, buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Plus, Trash2, Telescope, Sprout, MessageSquare, Zap, Rocket, Star, Code, Heart, Coffee, Book, Target, Briefcase, GraduationCap, Laptop, Globe, ChevronsUpDown, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { SectionTitleInput } from '@/components/ui/section-title-input';

const AVAILABLE_ICONS = [
  { id: 'telescope', name: 'Telescope', icon: Telescope },
  { id: 'sprout', name: 'Learning', icon: Sprout },
  { id: 'message-square', name: 'Message', icon: MessageSquare },
  { id: 'zap', name: 'Lightning', icon: Zap },
  { id: 'rocket', name: 'Rocket', icon: Rocket },
  { id: 'star', name: 'Star', icon: Star },
  { id: 'code', name: 'Code', icon: Code },
  { id: 'heart', name: 'Heart', icon: Heart },
  { id: 'coffee', name: 'Coffee', icon: Coffee },
  { id: 'book', name: 'Book', icon: Book },
  { id: 'target', name: 'Target', icon: Target },
  { id: 'briefcase', name: 'Briefcase', icon: Briefcase },
  { id: 'graduation-cap', name: 'Graduation', icon: GraduationCap },
  { id: 'laptop', name: 'Laptop', icon: Laptop },
  { id: 'globe', name: 'Globe', icon: Globe },
];

const EMOJI_TO_ICON: Record<string, string> = {
  '🔭': 'telescope',
  '🌱': 'sprout',
  '💬': 'message-square',
  '⚡': 'zap',
  '🚀': 'rocket',
};

function IconSelect({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger 
        className={cn(buttonVariants({ variant: "outline" }), "w-[140px] justify-between h-9 px-3")}
        role="combobox"
        aria-expanded={open}
      >
          <div className="flex items-center gap-2 overflow-hidden">
            {(() => {
              const iconId = value || 'star';
              const i = AVAILABLE_ICONS.find(ic => ic.id === iconId) || AVAILABLE_ICONS.find(ic => ic.id === 'star')!;
              const IconComp = i.icon;
              return (
                <>
                  <IconComp className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{i.name}</span>
                </>
              );
            })()}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search icon..." />
          <CommandList>
            <CommandEmpty>No icon found.</CommandEmpty>
            <CommandGroup>
              {AVAILABLE_ICONS.map(i => {
                const IconComp = i.icon;
                const isSelected = (value || 'star') === i.id;
                return (
                  <CommandItem
                    key={i.id}
                    value={i.id}
                    onSelect={(val) => {
                      onChange(val);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <IconComp className="w-4 h-4 shrink-0" />
                      <span>{i.name}</span>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function AboutEditor({ block }: { block: AboutBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  // Migrate legacy fields to bullets array
  useEffect(() => {
    if (!data.bullets && (data.currentlyWorkingOn || data.currentlyLearning || data.askMeAbout)) {
      const initialBullets = [];
      if (data.currentlyWorkingOn) initialBullets.push({ id: uuidv4(), emoji: '🔭', text: `I’m currently working on **${data.currentlyWorkingOn}**` });
      if (data.currentlyLearning) initialBullets.push({ id: uuidv4(), emoji: '🌱', text: `I’m currently learning **${data.currentlyLearning}**` });
      if (data.askMeAbout) initialBullets.push({ id: uuidv4(), emoji: '💬', text: `Ask me about **${data.askMeAbout}**` });
      
      dispatch(updateBlock({ 
        id: block.id, 
        data: { 
          ...data, 
          bullets: initialBullets,
          currentlyWorkingOn: undefined,
          currentlyLearning: undefined,
          askMeAbout: undefined
        } 
      }));
    } else if (!data.bullets) {
      dispatch(updateBlock({ id: block.id, data: { ...data, bullets: [] } }));
    } else {
      // Migrate existing bullets with emoji to icon
      const needsMigration = data.bullets.some(b => b.emoji && !b.icon);
      if (needsMigration) {
        const migratedBullets = data.bullets.map(b => {
          if (b.emoji && !b.icon) {
            return { ...b, icon: EMOJI_TO_ICON[b.emoji] || 'star', emoji: undefined };
          }
          return b;
        });
        dispatch(updateBlock({ id: block.id, data: { bullets: migratedBullets } }));
      }
    }
  }, [data, block.id, dispatch]);

  const bullets = data.bullets || [];

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  const handleUpdateBullet = (bulletId: string, field: 'emoji' | 'icon' | 'text', value: string) => {
    const updated = bullets.map(b => b.id === bulletId ? { ...b, [field]: value } : b);
    dispatch(updateBlock({ id: block.id, data: { bullets: updated } }));
  };

  const handleAddBullet = () => {
    const newBullet = { id: uuidv4(), icon: 'star', text: 'Fun fact: ...' };
    dispatch(updateBlock({ id: block.id, data: { bullets: [...bullets, newBullet] } }));
  };

  const handleRemoveBullet = (bulletId: string) => {
    dispatch(updateBlock({ id: block.id, data: { bullets: bullets.filter(b => b.id !== bulletId) } }));
  };

  return (
    <div className="space-y-6 text-left">
      <SectionTitleInput 
        title={data.sectionTitle} 
        defaultTitle="About Me" 
        color={data.sectionTitleColor} 
        iconColor={data.iconColor}
        hasIcons={true}
        onChange={handleChange} 
      />
      <div className="space-y-2">
        <Label>About Me Paragraph</Label>
        <MarkdownTextarea 
          value={data.paragraph} 
          onChange={(val) => handleChange('paragraph', val)} 
          placeholder="I am a passionate developer..." 
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <Label>Bullet Points</Label>
        {bullets.map((bullet) => (
          <div key={bullet.id} className="flex items-center gap-2">
            <div className="w-[140px] shrink-0">
              <IconSelect 
                value={bullet.icon || 'star'} 
                onChange={(val) => handleUpdateBullet(bullet.id, 'icon', val)} 
              />
            </div>
            <div className="flex-1">
              <MarkdownInput 
                value={bullet.text} 
                onChange={(val) => handleUpdateBullet(bullet.id, 'text', val)} 
                placeholder="I'm currently working on..." 
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-destructive hover:bg-destructive/10"
              onClick={() => handleRemoveBullet(bullet.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full border-dashed" onClick={handleAddBullet}>
        <Plus className="w-4 h-4 mr-2" />
        Add Bullet Point
      </Button>
    </div>
  );
}
