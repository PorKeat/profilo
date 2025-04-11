'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { reorderBlocks } from '@/store/builderSlice';
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
import { ScrollArea } from '@/components/ui/scroll-area';

export function Canvas() {
  const blocks = useAppSelector((state) => state.builder.blocks);
  const dispatch = useAppDispatch();

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

  return (
    <div className="flex-1 bg-muted/10 flex flex-col">
      <div className="p-4 border-b bg-background">
        <h2 className="font-semibold">Editor Canvas</h2>
        <p className="text-xs text-muted-foreground">Drag and drop sections to reorder them.</p>
      </div>
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
            <div className="text-center p-12 border-2 border-dashed rounded-lg bg-background text-muted-foreground">
              No sections added yet. Click a section in the sidebar to add it.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
