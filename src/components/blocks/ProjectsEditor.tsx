'use client';

import { FeaturedProjectsBlock, Project } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
