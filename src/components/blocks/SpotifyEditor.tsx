'use client';

import { SpotifyBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionTitleInput } from '@/components/ui/section-title-input';

export function SpotifyEditor({ block }: { block: SpotifyBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-6 text-left">
      <SectionTitleInput 
        title={data.sectionTitle} 
        defaultTitle="🎧 Currently Listening" 
        color={data.sectionTitleColor} 
        onChange={handleChange} 
      />
      <div className="space-y-2">
        <Label>Spotify Profile URL or UID</Label>
        <Input 
          value={data.spotifyUrl} 
          onChange={(e) => handleChange('spotifyUrl', e.target.value)} 
          placeholder="https://open.spotify.com/user/123456789" 
        />
        <p className="text-xs text-muted-foreground mt-1">
          Paste your Spotify profile URL or user ID. Note: Public widgets may require you to authorize your account first.
        </p>
      </div>
      <div className="space-y-2">
        <Label>Widget Theme</Label>
        <Select value={data.theme} onValueChange={(v) => v && handleChange('theme', v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="novatorem">Novatorem (Default)</SelectItem>
            <SelectItem value="dark">Dark Theme</SelectItem>
            <SelectItem value="light">Light Theme</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
