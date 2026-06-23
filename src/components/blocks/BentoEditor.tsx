'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BentoBlock } from '@/lib/types/blocks';
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from 'react-redux';
import { updateBlock } from '@/store/builderSlice';

export function BentoEditor({ block }: { block: BentoBlock }) {
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-white/60 mb-2 block">GitHub Username</Label>
          <Input 
            value={block.data.githubUsername || ''}
            onChange={(e) => dispatch(updateBlock({ id: block.id, data: { githubUsername: e.target.value } }))}
            placeholder="e.g. torvalds"
          />
        </div>
        <div>
          <Label className="text-white/60 mb-2 block">Role</Label>
          <Input 
            value={block.data.role || ''}
            onChange={(e) => dispatch(updateBlock({ id: block.id, data: { role: e.target.value } }))}
            placeholder="e.g. Frontend Engineer"
          />
        </div>
        <div>
          <Label className="text-white/60 mb-2 block">Short Bio</Label>
          <Textarea 
            value={block.data.bio || ''}
            onChange={(e) => dispatch(updateBlock({ id: block.id, data: { bio: e.target.value } }))}
            placeholder="A short description about yourself..."
            rows={3}
          />
        </div>
        <div>
          <Label className="text-white/60 mb-2 block">Core Skills (comma separated)</Label>
          <Input 
            value={block.data.skills?.join(', ') || ''}
            onChange={(e) => dispatch(updateBlock({ id: block.id, data: { skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) } }))}
            placeholder="e.g. React, TypeScript, Next.js"
          />
        </div>
      </div>
    </div>
  );
}
