'use client';

import { ContactBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ContactEditor({ block }: { block: ContactBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-4 text-left">
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
        <Textarea 
          value={data.message} 
          onChange={(e) => handleChange('message', e.target.value)} 
          placeholder="Feel free to reach out to me!" 
        />
      </div>
    </div>
  );
}
