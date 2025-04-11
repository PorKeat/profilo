'use client';

import { SocialLinksBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SocialsEditor({ block }: { block: SocialLinksBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-2">
        <Label>GitHub URL</Label>
        <Input value={data.github} onChange={(e) => handleChange('github', e.target.value)} placeholder="https://github.com/username" />
      </div>
      <div className="space-y-2">
        <Label>LinkedIn URL</Label>
        <Input value={data.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
      </div>
      <div className="space-y-2">
        <Label>Twitter/X URL</Label>
        <Input value={data.twitter} onChange={(e) => handleChange('twitter', e.target.value)} placeholder="https://twitter.com/username" />
      </div>
      <div className="space-y-2">
        <Label>Portfolio Website</Label>
        <Input value={data.portfolio} onChange={(e) => handleChange('portfolio', e.target.value)} placeholder="https://mywebsite.com" />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input value={data.email} type="email" onChange={(e) => handleChange('email', e.target.value)} placeholder="hello@example.com" />
      </div>
    </div>
  );
}
