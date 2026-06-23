'use client';

import { SocialLinksBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PLATFORMS } from '@/lib/constants/platforms';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { SectionTitleInput } from '@/components/ui/section-title-input';

export function SocialsEditor({ block }: { block: SocialLinksBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  // Migration from legacy fields
  useEffect(() => {
    if (!data.links && (data.github || data.linkedin || data.twitter || data.portfolio || data.email)) {
      const initialLinks = [];
      if (data.github) initialLinks.push({ id: uuidv4(), platform: 'github', url: data.github, color: '181717', icon: 'github' });
      if (data.linkedin) initialLinks.push({ id: uuidv4(), platform: 'linkedin', url: data.linkedin, color: '0A66C2', icon: 'linkedin' });
      if (data.twitter) initialLinks.push({ id: uuidv4(), platform: 'twitter', url: data.twitter, color: '1DA1F2', icon: 'twitter' });
      if (data.portfolio) initialLinks.push({ id: uuidv4(), platform: 'portfolio', url: data.portfolio, color: '2563EB', icon: 'globe' });
      if (data.email) initialLinks.push({ id: uuidv4(), platform: 'email', url: data.email, color: 'D14836', icon: 'gmail' });
      
      dispatch(updateBlock({ id: block.id, data: { ...data, links: initialLinks, github: undefined, linkedin: undefined, twitter: undefined, portfolio: undefined, email: undefined } }));
    }
  }, [data, block.id, dispatch]);

  const links = data.links || [];

  const handleUpdateLink = (linkId: string, field: string, value: string) => {
    const updatedLinks = links.map(l => {
      if (l.id === linkId) {
        const updated = { ...l, [field]: value };
        if (field === 'platform') {
          const plat = PLATFORMS.find(p => p.id === value);
          if (plat) {
            updated.color = plat.color;
            updated.icon = plat.icon;
          }
        }
        return updated;
      }
      return l;
    });
    dispatch(updateBlock({ id: block.id, data: { links: updatedLinks } }));
  };

  const handleAddLink = () => {
    const plat = PLATFORMS[0];
    const newLink = {
      id: uuidv4(),
      platform: plat.id,
      url: '',
      color: plat.color,
      icon: plat.icon
    };
    dispatch(updateBlock({ id: block.id, data: { links: [...links, newLink] } }));
  };

  const handleRemoveLink = (linkId: string) => {
    dispatch(updateBlock({ id: block.id, data: { links: links.filter(l => l.id !== linkId) } }));
  };

  const handleChangeBadgeStyle = (val: string) => {
    dispatch(updateBlock({ id: block.id, data: { badgeStyle: val } }));
  };

  return (
    <div className="space-y-6 text-left">
      <SectionTitleInput 
        title={data.sectionTitle} 
        defaultTitle="Connect With Me" 
        color={data.sectionTitleColor} 
        iconColor={data.iconColor}
        hasIcons={true}
        onChange={handleChange} 
      />
      <div className="space-y-2">
        <Label>Badge Style</Label>
        <Select value={data.badgeStyle || 'for-the-badge'} onValueChange={(v) => v && handleChangeBadgeStyle(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="for-the-badge">For the Badge (Default)</SelectItem>
            <SelectItem value="flat">Flat</SelectItem>
            <SelectItem value="flat-square">Flat Square</SelectItem>
            <SelectItem value="plastic">Plastic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {links.map((link) => {
          return (
            <div key={link.id} className="flex items-center gap-2 p-2 border rounded-lg bg-background group">
              <div className="w-1/3">
                <Select value={link.platform} onValueChange={(val) => val && handleUpdateLink(link.id, 'platform', val)}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input 
                  className="h-8"
                  value={link.url} 
                  onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)} 
                  placeholder={`https://${link.platform}.com/username`} 
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleRemoveLink(link.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="w-full border-dashed" onClick={handleAddLink}>
        <Plus className="w-4 h-4 mr-2" />
        Add Link
      </Button>
    </div>
  );
}
