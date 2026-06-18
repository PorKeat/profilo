'use client';

import { PacmanBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PacmanEditor({ block }: { block: PacmanBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: unknown) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-2">
        <Label>GitHub Username</Label>
        <Input 
          value={data.username} 
          onChange={(e) => handleChange('username', e.target.value)} 
          placeholder="torvalds" 
        />
      </div>
      <div className="bg-primary/10 p-3 rounded-lg text-xs text-muted-foreground">
        Note: The Pacman animation requires you to set up the <code>abozanona/pacman-contribution-graph</code> GitHub Action in your profile repository.
      </div>
    </div>
  );
}
