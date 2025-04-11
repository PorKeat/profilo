'use client';

import { AboutBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function AboutEditor({ block }: { block: AboutBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-2">
        <Label>About Me Paragraph</Label>
        <Textarea 
          value={data.paragraph} 
          onChange={(e) => handleChange('paragraph', e.target.value)} 
          placeholder="I am a passionate developer..." 
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <Label>Currently Working On</Label>
        <Input value={data.currentlyWorkingOn} onChange={(e) => handleChange('currentlyWorkingOn', e.target.value)} placeholder="An open source project" />
      </div>
      <div className="space-y-2">
        <Label>Currently Learning</Label>
        <Input value={data.currentlyLearning} onChange={(e) => handleChange('currentlyLearning', e.target.value)} placeholder="Next.js" />
      </div>
      <div className="space-y-2">
        <Label>Ask Me About</Label>
        <Input value={data.askMeAbout} onChange={(e) => handleChange('askMeAbout', e.target.value)} placeholder="React, TypeScript, Web Dev" />
      </div>
    </div>
  );
}
