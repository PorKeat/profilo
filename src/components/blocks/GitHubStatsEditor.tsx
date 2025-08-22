'use client';

import { GitHubStatsBlock } from '@/lib/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
          <Label htmlFor="showProfileViews" className="flex-1 cursor-pointer">Show Profile Views</Label>
          <Switch 
            id="showProfileViews" 
            checked={data.showProfileViews} 
            onCheckedChange={(checked) => handleChange('showProfileViews', checked)} 
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

        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
          <div className="flex-1">
            <Label htmlFor="showPacman" className="cursor-pointer">Show Pacman Animation</Label>
            <p className="text-[10px] text-muted-foreground leading-tight mt-1">Requires GitHub Action (abozanona/pacman)</p>
          </div>
          <Switch 
            id="showPacman" 
            checked={data.showPacman} 
            onCheckedChange={(checked) => handleChange('showPacman', checked)} 
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="useCustomColors" className="font-semibold cursor-pointer">Use Custom Hex Colors</Label>
            <Switch 
              id="useCustomColors" 
              checked={data.useCustomColors} 
              onCheckedChange={(checked) => handleChange('useCustomColors', checked)} 
            />
          </div>

          {!data.useCustomColors ? (
            <div className="space-y-2">
              <Label>Widget Theme</Label>
              <Select value={data.theme} onValueChange={(val) => handleChange('theme', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radical">Radical</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="merko">Merko</SelectItem>
                  <SelectItem value="gruvbox">Gruvbox</SelectItem>
                  <SelectItem value="tokyonight">Tokyo Night</SelectItem>
                  <SelectItem value="onedark">One Dark</SelectItem>
                  <SelectItem value="cobalt">Cobalt</SelectItem>
                  <SelectItem value="synthwave">Synthwave</SelectItem>
                  <SelectItem value="highcontrast">High Contrast</SelectItem>
                  <SelectItem value="dracula">Dracula</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Background (Hex)</Label>
                <Input 
                  value={data.customColors?.bg} 
                  onChange={(e) => handleChange('customColors', { ...data.customColors, bg: e.target.value })} 
                  placeholder="000000" 
                />
              </div>
              <div className="space-y-2">
                <Label>Title (Hex)</Label>
                <Input 
                  value={data.customColors?.title} 
                  onChange={(e) => handleChange('customColors', { ...data.customColors, title: e.target.value })} 
                  placeholder="ff003c" 
                />
              </div>
              <div className="space-y-2">
                <Label>Text (Hex)</Label>
                <Input 
                  value={data.customColors?.text} 
                  onChange={(e) => handleChange('customColors', { ...data.customColors, text: e.target.value })} 
                  placeholder="ffffff" 
                />
              </div>
              <div className="space-y-2">
                <Label>Icon (Hex)</Label>
                <Input 
                  value={data.customColors?.icon} 
                  onChange={(e) => handleChange('customColors', { ...data.customColors, icon: e.target.value })} 
                  placeholder="ff003c" 
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Border (Hex)</Label>
                <Input 
                  value={data.customColors?.border} 
                  onChange={(e) => handleChange('customColors', { ...data.customColors, border: e.target.value })} 
                  placeholder="ff003c" 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
