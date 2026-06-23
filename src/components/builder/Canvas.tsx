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
  rectSortingStrategy,
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
        <div className="max-w-2xl mx-auto pb-20">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map(b => b.id)}
              strategy={rectSortingStrategy}
            >
              {blocks.map((block) => (
                <SortableBlock key={block.id} block={block} />
              ))}
            </SortableContext>
          </DndContext>

          {blocks.length === 0 && (
            <div className="text-center p-12 border-2 border-dashed border-primary/30 rounded-3xl bg-primary/[0.02] shadow-[inset_0_0_50px_rgba(75,134,247,0.05)] text-muted-foreground flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group transition-all duration-500 hover:border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(75,134,247,0.2)] animate-pulse">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-foreground mb-2 tracking-tight">Your Canvas is Empty</h3>
              <p className="relative z-10 text-base max-w-sm text-muted-foreground">Click any widget in the sidebar to drop it into your canvas and start building your perfect profile.</p>
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
