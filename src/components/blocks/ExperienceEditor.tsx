'use client';

import { ExperienceBlock, Experience } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MarkdownInput, MarkdownTextarea } from '@/components/ui/markdown-input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { SectionTitleInput } from '@/components/ui/section-title-input';

export function ExperienceEditor({ block }: { block: ExperienceBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleUpdate = (updatedData: Partial<ExperienceBlock['data']>) => {
    dispatch(updateBlock({ id: block.id, data: { ...data, ...updatedData } }));
  };

  const handleUpdateJob = (jobId: string, field: string, value: string | string[] | undefined) => {
    const updatedJobs = data.jobs.map(j => 
      j.id === jobId ? { ...j, [field]: value } : j
    );
    handleUpdate({ jobs: updatedJobs });
  };

  const handleFileUpload = (jobId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      handleUpdateJob(jobId, 'companyLogoBase64', base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (jobId: string) => {
    handleUpdateJob(jobId, 'companyLogoBase64', undefined);
  };

  const handleTechStackChange = (jobId: string, value: string) => {
    const stack = value.split(',').map(s => s.trim()).filter(s => s);
    handleUpdateJob(jobId, 'techStack', stack);
  };

  const handleAddJob = () => {
    const newJob: Experience = {
      id: uuidv4(),
      title: 'New Role',
      company: '',
      duration: '',
      description: ''
    };
    handleUpdate({ jobs: [...data.jobs, newJob] });
  };

  const handleRemoveJob = (jobId: string) => {
    handleUpdate({ jobs: data.jobs.filter(j => j.id !== jobId) });
  };

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-6 text-left">
      <SectionTitleInput 
        title={data.sectionTitle} 
        defaultTitle="💼 Work Experience" 
        color={data.sectionTitleColor} 
        iconColor={data.iconColor}
        hasIcons={true}
        onChange={handleChange} 
      />
      <div className="space-y-4">
        {data.jobs.map((job) => (
          <div key={job.id} className="p-4 border rounded-lg bg-background relative group">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => handleRemoveJob(job.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="space-y-4 pr-8">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <MarkdownInput value={job.title} onChange={(val) => handleUpdateJob(job.id, 'title', val)} placeholder="Senior Developer" />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <MarkdownInput value={job.company} onChange={(val) => handleUpdateJob(job.id, 'company', val)} placeholder="Tech Corp" />
              </div>
              <div className="space-y-2">
                <Label>Company Logo / Icon</Label>
                {job.companyLogoBase64 ? (
                  <div className="relative inline-block border rounded-lg p-2 bg-background">
                    { }
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={job.companyLogoBase64} alt="Logo Preview" className="h-16 object-contain rounded" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                      onClick={() => handleRemoveImage(job.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(job.id, e)} 
                      className="text-xs file:bg-primary file:text-primary-foreground file:border-0 file:rounded file:px-2 file:py-1 file:mr-2 file:text-xs file:cursor-pointer hover:file:bg-primary/90"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input value={job.duration} onChange={(e) => handleUpdateJob(job.id, 'duration', e.target.value)} placeholder="Jan 2020 - Present" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <MarkdownTextarea 
                  value={job.description} 
                  onChange={(val) => handleUpdateJob(job.id, 'description', val)} 
                  placeholder="Describe your responsibilities..." 
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Tech Stack (comma separated)</Label>
                <Input value={job.techStack ? job.techStack.join(', ') : ''} onChange={(e) => handleTechStackChange(job.id, e.target.value)} placeholder="React, Node.js, MongoDB" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full border-dashed" onClick={handleAddJob}>
        <Plus className="w-4 h-4 mr-2" />
        Add Role
      </Button>
    </div>
  );
}
