'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TerminalBlock } from '@/lib/types/blocks';
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from 'react-redux';
import { updateBlock } from '@/store/builderSlice';

export function TerminalEditor({ block }: { block: TerminalBlock }) {
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-white/60 mb-2 block">Terminal Username</Label>
          <Input 
            value={block.data.username || ''}
            onChange={(e) => dispatch(updateBlock({ id: block.id, data: { username: e.target.value } }))}
            placeholder="e.g. torvalds"
          />
        </div>
        <div>
          <Label className="text-white/60 mb-2 block">Terminal Lines (one per line)</Label>
          <Textarea 
            value={block.data.lines?.join('\n') || ''}
            onChange={(e) => dispatch(updateBlock({ id: block.id, data: { lines: e.target.value.split('\n').filter(Boolean) } }))}
            placeholder="> _Initializing..."
            rows={4}
          />
        </div>
        <div>
          <Label className="text-white/60 mb-2 block">Text Color (Hex without #)</Label>
          <Input 
            value={block.data.color || ''}
            onChange={(e) => dispatch(updateBlock({ id: block.id, data: { color: e.target.value } }))}
            placeholder="e.g. 00ff00"
          />
        </div>
      </div>
    </div>
  );
}
