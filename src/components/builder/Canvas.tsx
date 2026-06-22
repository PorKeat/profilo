'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { reorderBlocks, resetBuilder } from '@/store/builderSlice';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableBlock } from './SortableBlock';
import { Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export function Canvas() {
  const blocks = useAppSelector((state) => state.builder.blocks);
  const dispatch = useAppDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      dispatch(reorderBlocks({ activeId: active.id as string, overId: over.id as string }));
    }
  };

  const handleClearAll = () => {
    dispatch(resetBuilder());
    setConfirmOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-transparent relative z-10">
      {/* ── Header ── */}
      <div className="px-8 py-5 border-b border-white/5 bg-background/40 backdrop-blur-md flex items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold">Editor Canvas</h2>
          <p className="text-xs text-muted-foreground">Drag and drop sections to reorder them.</p>
        </div>

        {blocks.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setConfirmOpen(true)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5 shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </Button>
        )}
      </div>

      {/* ── Blocks ── */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-4 pb-20">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map(b => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((block) => (
                <SortableBlock key={block.id} block={block} />
              ))}
            </SortableContext>
          </DndContext>

          {blocks.length === 0 && (
            <div className="text-center p-12 border border-dashed border-primary/20 rounded-2xl bg-background/40 backdrop-blur-md shadow-xl text-muted-foreground flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-primary/60" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Your canvas is empty</h3>
              <p className="text-sm max-w-sm">Click any section in the sidebar to add it to your README canvas.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Confirm dialog ── */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <DialogTitle>Clear all sections?</DialogTitle>
            </div>
            <DialogDescription>
              This will remove all <span className="font-semibold text-foreground">{blocks.length}</span> section{blocks.length !== 1 ? 's' : ''} from your canvas. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleClearAll}>
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
