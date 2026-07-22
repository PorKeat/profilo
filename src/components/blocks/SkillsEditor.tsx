 
'use client';

import { TechnicalSkillsBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Label } from '@/components/ui/label';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react';
import { SectionTitleInput } from '@/components/ui/section-title-input';
import { useState, useEffect } from 'react';
import { POPULAR_SKILLS } from '@/lib/constants/skills';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

export function SkillsEditor({ block }: { block: TechnicalSkillsBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Migration for legacy flat skills list
  useEffect(() => {
    if (!data.groups && data.skills && data.skills.length > 0) {
      dispatch(updateBlock({ 
        id: block.id, 
        data: { 
          groups: [{ id: uuidv4(), name: 'Languages & Tools', skills: [...data.skills] }],
          skills: [] 
        } 
      }));
    } else if (!data.groups) {
      dispatch(updateBlock({ 
        id: block.id, 
        data: { groups: [] } 
      }));
    }
  }, [data.groups, data.skills, block.id, dispatch]);

  const groups = data.groups || [];

  const handleChange = (field: string, value: unknown) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  const handleAddGroup = () => {
    dispatch(updateBlock({ id: block.id, data: { groups: [...groups, { id: uuidv4(), name: 'New Category', skills: [] }] } }));
  };

  const handleUpdateGroupName = (groupId: string, newName: string) => {
    const updated = groups.map(g => g.id === groupId ? { ...g, name: newName } : g);
    dispatch(updateBlock({ id: block.id, data: { groups: updated } }));
  };

  const handleRemoveGroup = (groupId: string) => {
    dispatch(updateBlock({ id: block.id, data: { groups: groups.filter(g => g.id !== groupId) } }));
  };

  const handleAddSkillToGroup = (groupId: string, skillName: string) => {
    const updated = groups.map(g => {
      if (g.id === groupId && !g.skills.includes(skillName)) {
        return { ...g, skills: [...g.skills, skillName] };
      }
      return g;
    });
    dispatch(updateBlock({ id: block.id, data: { groups: updated } }));
    setOpenGroup(null);
  };

  const handleRemoveSkillFromGroup = (groupId: string, skillToRemove: string) => {
    const updated = groups.map(g => {
      if (g.id === groupId) {
        return { ...g, skills: g.skills.filter(s => s !== skillToRemove) };
      }
      return g;
    });
    dispatch(updateBlock({ id: block.id, data: { groups: updated } }));
  };

  return (
    <div className="space-y-6 text-left">
      <SectionTitleInput 
        title={data.sectionTitle} 
        defaultTitle="Technical Skills" 
        color={data.sectionTitleColor} 
        iconColor={data.iconColor}
        hasIcons={true}
        onChange={handleChange} 
      />
      {groups.map(group => (
        <div key={group.id} className="p-4 border rounded-lg bg-background relative space-y-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
            onClick={() => handleRemoveGroup(group.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          <div className="space-y-2 pr-8">
            <Label>Category Name</Label>
            <Input value={group.name} onChange={(e) => handleUpdateGroupName(group.id, e.target.value)} placeholder="Frontend" />
          </div>

          <div className="space-y-2">
            <Label>Add a skill to this category</Label>
            <Popover open={openGroup === group.id} onOpenChange={(isOpen) => setOpenGroup(isOpen ? group.id : null)}>
              <PopoverTrigger 
                className={cn(buttonVariants({ variant: "outline" }), "w-full justify-between font-normal text-muted-foreground")}
                role="combobox"
                aria-expanded={openGroup === group.id}
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
                        const isSelected = group.skills.includes(skill.name);
                        return (
                          <CommandItem
                            key={skill.name}
                            value={skill.name}
                            onSelect={(currentValue) => {
                              const exactSkill = POPULAR_SKILLS.find(s => s.name.toLowerCase() === currentValue.toLowerCase());
                              if (exactSkill) handleAddSkillToGroup(group.id, exactSkill.name);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                isSelected ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
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
            {group.skills.length === 0 ? (
              <p className="text-sm text-muted-foreground">No skills added yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {group.skills.map(skillName => {
                  const skillDef = POPULAR_SKILLS.find(s => s.name === skillName);
                  return (
                    <div key={skillName} className="flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md text-sm border">
                      {skillDef && (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={`https://cdn.simpleicons.org/${skillDef.icon}`} 
                            alt={skillName} 
                            className="w-3.5 h-3.5 dark:invert"
                          />
                        </>
                      )}
                      <span>{skillName}</span>
                      <button 
                        onClick={() => handleRemoveSkillFromGroup(group.id, skillName)}
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
      ))}

      <Button variant="outline" className="w-full border-dashed" onClick={handleAddGroup}>
        <Plus className="w-4 h-4 mr-2" />
        Add Category
      </Button>
    </div>
  );
}
