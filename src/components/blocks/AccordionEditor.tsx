'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionBlock } from '@/types/blocks';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2 } from "lucide-react";
import { useDispatch } from 'react-redux';
import { updateBlock } from '@/store/builderSlice';
import { SectionTitleInput } from '@/components/ui/section-title-input';

export function AccordionEditor({ block }: { block: AccordionBlock }) {
  const dispatch = useDispatch();

  const addItem = () => {
    const items = block.data.items || [];
    dispatch(updateBlock({ id: block.id, data: { items: [...items, { id: uuidv4(), title: 'New Item', content: 'Details here...' }] } }));
  };

  const updateItem = (id: string, field: string, value: string) => {
    const items = block.data.items.map(item => item.id === id ? { ...item, [field]: value } : item);
    dispatch(updateBlock({ id: block.id, data: { items } }));
  };

  const removeItem = (id: string) => {
    const items = block.data.items.filter(item => item.id !== id);
    dispatch(updateBlock({ id: block.id, data: { items } }));
  };

  return (
    <div className="space-y-6">
      <SectionTitleInput 
        title={block.data.sectionTitle} 
        defaultTitle="FAQ / Accordion"
        color={block.data.sectionTitleColor} 
        iconColor={block.data.iconColor}
        hasIcons={false}
        onChange={(field, value) => dispatch(updateBlock({ id: block.id, data: { [field]: value } }))}
      />
      <div className="space-y-4">
        {(block.data.items || []).map((item, index) => (
          <div key={item.id} className="p-4 border border-white/10 rounded-xl space-y-4 relative group">
            <button 
              onClick={() => removeItem(item.id)}
              className="absolute top-4 right-4 text-white/40 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div>
              <Label className="text-white/60 mb-2 block">Item {index + 1} Title</Label>
              <Input 
                value={item.title}
                onChange={(e) => updateItem(item.id, 'title', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-white/60 mb-2 block">Content (Markdown supported)</Label>
              <Textarea 
                value={item.content}
                onChange={(e) => updateItem(item.id, 'content', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        ))}
        
        <Button onClick={addItem} variant="outline" className="w-full border-dashed border-white/20 bg-transparent hover:bg-white/5">
          <Plus className="w-4 h-4 mr-2" /> Add Accordion Item
        </Button>
      </div>
    </div>
  );
}
