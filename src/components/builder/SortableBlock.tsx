'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block } from '@/lib/types/blocks';
import { GripVertical, Trash2, ChevronDown, ChevronUp, Columns, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { removeBlock, toggleBlockLayout } from '@/store/builderSlice';
import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BlockEditor } from './BlockEditor';
import { motion } from 'framer-motion';

interface SortableBlockProps {
  block: Block;
}

export function SortableBlock({ block }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });
  
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(true);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  const getBlockTitle = () => {
    switch(block.type) {
      case 'hero': return 'Hero Section';
      case 'about': return 'About Me';
      case 'skills': return 'Technical Skills';
      case 'github-stats': return 'GitHub Statistics';
      case 'projects': return 'Featured Projects';
      case 'socials': return 'Social Links';
      case 'contact': return 'Contact';
      default: return 'Section';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`relative ${block.layout === 'half' ? 'w-[calc(50%-0.5rem)] inline-block mx-1 align-top' : 'w-full block mb-4'}`}
    >
      {/* Animated Glowing Border for expanded state */}
      {expanded && (
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-primary/40 via-blue-500/40 to-primary/40 opacity-70 z-0 animate-pulse pointer-events-none" />
      )}
      
      <Card
        id={`block-${block.id}`}
        ref={setNodeRef}
        style={style}
        className={cn(
          "relative z-10 group shadow-lg border-white/5 scroll-mt-6 rounded-xl transition-all duration-300",
          expanded ? "bg-background/90 backdrop-blur-2xl ring-1 ring-primary/20" : "bg-background/40 backdrop-blur-md hover:bg-background/60",
          isDragging && "opacity-80 ring-2 ring-primary shadow-2xl scale-[1.02] z-50"
        )}
      >
      <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0 cursor-default bg-muted/30">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1.5 hover:bg-primary/20 hover:text-primary rounded-md text-muted-foreground transition-all"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          <span className="font-medium text-sm">{getBlockTitle()}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => dispatch(toggleBlockLayout(block.id))} title={block.layout === 'half' ? 'Make Full Width' : 'Make Half Width'}>
            {block.layout === 'half' ? <Maximize className="h-4 w-4" /> : <Columns className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => dispatch(removeBlock(block.id))}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent className="p-6 bg-transparent">
          <BlockEditor block={block} />
        </CardContent>
      )}
    </Card>
    </motion.div>
  );
}
