'use client';

import { FeaturedProjectsBlock, Project } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function ProjectsEditor({ block }: { block: FeaturedProjectsBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleUpdateProject = (projectId: string, field: string, value: string) => {
    const updatedProjects = data.projects.map(p => 
      p.id === projectId ? { ...p, [field]: value } : p
    );
    dispatch(updateBlock({ id: block.id, data: { projects: updatedProjects } }));
  };

  const handleChange = (field: string, value: unknown) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: uuidv4(),
      name: 'New Project',
      description: '',
      githubUrl: '',
      demoUrl: '',
      techStack: []
    };
    dispatch(updateBlock({ id: block.id, data: { projects: [...data.projects, newProject] } }));
  };

  const handleRemoveProject = (projectId: string) => {
    dispatch(updateBlock({ id: block.id, data: { projects: data.projects.filter(p => p.id !== projectId) } }));
  };

  const handleTechStackChange = (projectId: string, value: string) => {
    const stack = value.split(',').map(s => s.trim()).filter(s => s);
    const updatedProjects = data.projects.map(p => 
      p.id === projectId ? { ...p, techStack: stack } : p
    );
    dispatch(updateBlock({ id: block.id, data: { projects: updatedProjects } }));
  };

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-4 pb-4 border-b">
        <div className="space-y-2">
          <Label>Project Display Style</Label>
          <Select value={data.style} onValueChange={(val) => handleChange('style', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Standard Text Links</SelectItem>
              <SelectItem value="cards">GitHub Pinned Repo Cards</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {data.style === 'cards' && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="useCustomColorsProjects" className="font-semibold cursor-pointer">Use Custom Hex Colors</Label>
              <Switch 
                id="useCustomColorsProjects" 
                checked={data.useCustomColors} 
                onCheckedChange={(checked) => handleChange('useCustomColors', checked)} 
              />
            </div>

            {!data.useCustomColors ? (
              <div className="space-y-2">
                <Label>Card Theme</Label>
                <Select value={data.theme} onValueChange={(val) => handleChange('theme', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="radical">Radical</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="merko">Merko</SelectItem>
                    <SelectItem value="gruvbox">Gruvbox</SelectItem>
                    <SelectItem value="tokyonight">Tokyo Night</SelectItem>
                    <SelectItem value="onedark">One Dark</SelectItem>
                    <SelectItem value="cobalt">Cobalt</SelectItem>
                    <SelectItem value="synthwave">Synthwave</SelectItem>
                    <SelectItem value="highcontrast">High Contrast</SelectItem>
                    <SelectItem value="dracula">Dracula</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Background (Hex)</Label>
                  <Input 
                    value={data.customColors?.bg} 
                    onChange={(e) => handleChange('customColors', { ...data.customColors, bg: e.target.value })} 
                    placeholder="000000" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title (Hex)</Label>
                  <Input 
                    value={data.customColors?.title} 
                    onChange={(e) => handleChange('customColors', { ...data.customColors, title: e.target.value })} 
                    placeholder="ff003c" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Text (Hex)</Label>
                  <Input 
                    value={data.customColors?.text} 
                    onChange={(e) => handleChange('customColors', { ...data.customColors, text: e.target.value })} 
                    placeholder="ffffff" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon (Hex)</Label>
                  <Input 
                    value={data.customColors?.icon} 
                    onChange={(e) => handleChange('customColors', { ...data.customColors, icon: e.target.value })} 
                    placeholder="ff003c" 
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Border (Hex)</Label>
                  <Input 
                    value={data.customColors?.border} 
                    onChange={(e) => handleChange('customColors', { ...data.customColors, border: e.target.value })} 
                    placeholder="ff003c" 
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {data.projects.map((project, index) => (
        <div key={project.id} className="p-4 border rounded-lg space-y-4 relative bg-muted/20">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-sm">Project {index + 1}</h4>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10" onClick={() => handleRemoveProject(project.id)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Project Name</Label>
            <Input value={project.name} onChange={(e) => handleUpdateProject(project.id, 'name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={project.description} onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>GitHub URL</Label>
            <Input value={project.githubUrl} onChange={(e) => handleUpdateProject(project.id, 'githubUrl', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Live Demo URL</Label>
            <Input value={project.demoUrl} onChange={(e) => handleUpdateProject(project.id, 'demoUrl', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Tech Stack (comma separated)</Label>
            <Input value={project.techStack.join(', ')} onChange={(e) => handleTechStackChange(project.id, e.target.value)} placeholder="React, Node.js, MongoDB" />
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full" onClick={handleAddProject}>
        <Plus className="h-4 w-4 mr-2" /> Add Project
      </Button>
    </div>
  );
}
