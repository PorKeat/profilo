'use client';

import { HeroBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function HeroEditor({ block }: { block: HeroBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={data.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={data.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Full Stack Developer" />
      </div>
      <div className="space-y-2">
        <Label>Short Intro</Label>
        <Input value={data.shortIntro} onChange={(e) => handleChange('shortIntro', e.target.value)} placeholder="I build things for the web." />
      </div>
      <div className="space-y-2">
        <Label>Avatar URL (optional)</Label>
        <Input value={data.avatarUrl || ''} onChange={(e) => handleChange('avatarUrl', e.target.value)} placeholder="https://github.com/username.png" />
      </div>
    </div>
  );
}
