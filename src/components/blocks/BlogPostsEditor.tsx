'use client';

import { BlogPostsBlock } from '@/types/blocks';
import { useAppDispatch } from '@/store/hooks';
import { updateBlock } from '@/store/builderSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { SectionTitleInput } from '@/components/ui/section-title-input';

export function BlogPostsEditor({ block }: { block: BlogPostsBlock }) {
  const dispatch = useAppDispatch();
  const { data } = block;

  const handleChange = (field: string, value: string) => {
    dispatch(updateBlock({ id: block.id, data: { [field]: value } }));
  };

  return (
    <div className="space-y-6 text-left">
      <SectionTitleInput 
        title={data.sectionTitle} 
        defaultTitle="✍️ Latest Blog Posts" 
        color={data.sectionTitleColor} 
        onChange={handleChange} 
      />
      <div className="space-y-2">
        <Label>Platform</Label>
        <SearchableSelect 
          value={data.platform} 
          onChange={(v) => v && handleChange('platform', v)}
          options={[
            { value: 'dev.to', label: 'Dev.to' },
            { value: 'medium', label: 'Medium' },
            { value: 'hashnode', label: 'Hashnode' }
          ]}
          placeholder="Select a platform..."
          searchPlaceholder="Search platforms..."
        />
      </div>
      <div className="space-y-2">
        <Label>Username</Label>
        <Input value={data.username} onChange={(e) => handleChange('username', e.target.value)} placeholder="yourusername" />
      </div>
      <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded border">
        Note: Dynamic blog posts require a GitHub Action like <a href="https://github.com/gautamkrishnar/blog-post-workflow" target="_blank" className="text-primary hover:underline">blog-post-workflow</a>. The generated markdown will include the necessary comment tags.
      </div>
    </div>
  );
}
