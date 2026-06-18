/* eslint-disable @next/next/no-img-element */
'use client';

import { TechnicalSkillsBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Label } from '@/components/ui/label';
import { buttonVariants } from '@/components/ui/button';
import { X, Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { POPULAR_SKILLS } from '@/lib/constants/skills';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

export function SkillsEditor({ block }: { block: TechnicalSkillsBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;
  const [open, setOpen] = useState(false);

  const handleAddSkill = (skillName: string) => {
    if (!data.skills.includes(skillName)) {
      dispatch(updateBlock({ id: block.id, data: { skills: [...data.skills, skillName] } }));
    }
    setOpen(false);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    dispatch(updateBlock({ id: block.id, data: { skills: data.skills.filter(s => s !== skillToRemove) } }));
  };

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-2 flex flex-col">
        <Label>Add a skill</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger 
            className={cn(buttonVariants({ variant: "outline" }), "w-full justify-between font-normal text-muted-foreground")}
            role="combobox"
            aria-expanded={open}
          >
            Select a skill...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search skills..." />
              <CommandList>
                <CommandEmpty>No skill found.</CommandEmpty>
                <CommandGroup>
                  {POPULAR_SKILLS.map((skill) => {
                    const isSelected = data.skills.includes(skill.name);
                    return (
                      <CommandItem
                        key={skill.name}
                        value={skill.name}
                        onSelect={(currentValue) => {
                          const exactSkill = POPULAR_SKILLS.find(s => s.name.toLowerCase() === currentValue.toLowerCase());
                          if (exactSkill) handleAddSkill(exactSkill.name);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <img 
                          src={`https://cdn.simpleicons.org/${skill.icon}`} 
                          alt={skill.name} 
                          className="w-4 h-4 mr-2"
                        />
                        {skill.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label>Current Skills</Label>
        {data.skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">No skills added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map(skillName => {
              const skillDef = POPULAR_SKILLS.find(s => s.name === skillName);
              return (
                <div key={skillName} className="flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md text-sm border">
                  {skillDef && (
                    <img 
                      src={`https://cdn.simpleicons.org/${skillDef.icon}`} 
                      alt={skillName} 
                      className="w-3.5 h-3.5 dark:invert"
                    />
                  )}
                  <span>{skillName}</span>
                  <button 
                    onClick={() => handleRemoveSkill(skillName)}
                    className="text-muted-foreground hover:text-foreground transition-colors ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
