'use client';

import { ContactBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MarkdownTextarea } from '@/components/ui/markdown-input';
import { SectionTitleInput } from '@/components/ui/section-title-input';

export function ContactEditor({ block }: { block: ContactBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-6 text-left">
      <SectionTitleInput 
        title={data.sectionTitle} 
        defaultTitle="Contact" 
        color={data.sectionTitleColor} 
        onChange={handleChange} 
      />
      <div className="space-y-2">
        <Label>Email Address</Label>
        <Input 
          type="email" 
          value={data.email} 
          onChange={(e) => handleChange('email', e.target.value)} 
          placeholder="hello@example.com" 
        />
      </div>
      <div className="space-y-2">
        <Label>Message</Label>
        <MarkdownTextarea 
          value={data.message} 
          onChange={(val) => handleChange('message', val)} 
          placeholder="Feel free to reach out to me!" 
        />
      </div>
    </div>
  );
}
