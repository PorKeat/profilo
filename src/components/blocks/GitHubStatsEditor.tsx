'use client';

import { GitHubStatsBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function GitHubStatsEditor({ block }: { block: GitHubStatsBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: any) => {
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
      
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <Label htmlFor="showStats" className="flex-1 cursor-pointer">Show Profile Stats</Label>
          <Switch 
            id="showStats" 
            checked={data.showStats} 
            onCheckedChange={(checked) => handleChange('showStats', checked)} 
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <Label htmlFor="showTopLanguages" className="flex-1 cursor-pointer">Show Top Languages</Label>
          <Switch 
            id="showTopLanguages" 
            checked={data.showTopLanguages} 
            onCheckedChange={(checked) => handleChange('showTopLanguages', checked)} 
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <Label htmlFor="showStreak" className="flex-1 cursor-pointer">Show Contribution Streak</Label>
          <Switch 
            id="showStreak" 
            checked={data.showStreak} 
            onCheckedChange={(checked) => handleChange('showStreak', checked)} 
          />
        </div>

        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <Label htmlFor="showActivityGraph" className="flex-1 cursor-pointer">Show Activity Graph</Label>
          <Switch 
            id="showActivityGraph" 
            checked={data.showActivityGraph} 
            onCheckedChange={(checked) => handleChange('showActivityGraph', checked)} 
          />
        </div>

        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <div className="flex-1">
            <Label htmlFor="showSnake" className="cursor-pointer">Show Snake Animation</Label>
            <p className="text-[10px] text-muted-foreground leading-tight mt-1">Requires GitHub Action (Platane/snk)</p>
          </div>
          <Switch 
            id="showSnake" 
            checked={data.showSnake} 
            onCheckedChange={(checked) => handleChange('showSnake', checked)} 
          />
        </div>

        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <div className="flex-1">
            <Label htmlFor="show3dContrib" className="cursor-pointer">Show 3D Contribution Graph</Label>
            <p className="text-[10px] text-muted-foreground leading-tight mt-1">Requires GitHub Action (yoshi389111)</p>
          </div>
          <Switch 
            id="show3dContrib" 
            checked={data.show3dContrib} 
            onCheckedChange={(checked) => handleChange('show3dContrib', checked)} 
          />
        </div>
      </div>
    </div>
  );
}
