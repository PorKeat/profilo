'use client';

import { ExperienceBlock, Experience } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function ExperienceEditor({ block }: { block: ExperienceBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleUpdateJob = (jobId: string, field: string, value: string) => {
    const updatedJobs = data.jobs.map(j => 
      j.id === jobId ? { ...j, [field]: value } : j
    );
    dispatch(updateBlock({ id: block.id, data: { jobs: updatedJobs } }));
  };

  const handleAddJob = () => {
    const newJob: Experience = {
      id: uuidv4(),
      title: 'New Role',
      company: '',
      duration: '',
      description: ''
    };
    dispatch(updateBlock({ id: block.id, data: { jobs: [...data.jobs, newJob] } }));
  };

  const handleRemoveJob = (jobId: string) => {
    dispatch(updateBlock({ id: block.id, data: { jobs: data.jobs.filter(j => j.id !== jobId) } }));
  };

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-4">
        {data.jobs.map((job, index) => (
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
                <Input value={job.title} onChange={(e) => handleUpdateJob(job.id, 'title', e.target.value)} placeholder="Senior Developer" />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={job.company} onChange={(e) => handleUpdateJob(job.id, 'company', e.target.value)} placeholder="Tech Corp" />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input value={job.duration} onChange={(e) => handleUpdateJob(job.id, 'duration', e.target.value)} placeholder="Jan 2020 - Present" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={job.description} 
                  onChange={(e) => handleUpdateJob(job.id, 'description', e.target.value)} 
                  placeholder="Describe your responsibilities..." 
                  rows={3}
                />
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
