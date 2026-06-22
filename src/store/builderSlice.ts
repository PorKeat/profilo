import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Block } from '@/lib/types/blocks';
import { ThemeId } from '@/lib/types/theme';

interface BuilderState {
  blocks: Block[];
  themeId: ThemeId;
  templateId: string | null;
}

const getInitialState = (): BuilderState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('profilo-state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
  }
  return {
    blocks: [],
    themeId: 'github-classic',
    templateId: null,
  };
};

const initialState: BuilderState = getInitialState();

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setBlocks: (state, action: PayloadAction<Block[]>) => {
      state.blocks = action.payload;
    },
    addBlock: (state, action: PayloadAction<Block>) => {
      state.blocks.push(action.payload);
    },
    updateBlock: (state, action: PayloadAction<{ id: string; data: Record<string, unknown> }>) => {
      const block = state.blocks.find(b => b.id === action.payload.id);
      if (block) {
        block.data = { ...block.data, ...action.payload.data };
      }
    },
    toggleBlockLayout: (state, action: PayloadAction<string>) => {
      const block = state.blocks.find(b => b.id === action.payload);
      if (block) {
        block.layout = block.layout === 'half' ? 'full' : 'half';
      }
    },
    removeBlock: (state, action: PayloadAction<string>) => {
      state.blocks = state.blocks.filter(b => b.id !== action.payload);
    },
    reorderBlocks: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;
      const oldIndex = state.blocks.findIndex(b => b.id === activeId);
      const newIndex = state.blocks.findIndex(b => b.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const [movedBlock] = state.blocks.splice(oldIndex, 1);
        state.blocks.splice(newIndex, 0, movedBlock);
      }
    },
    setTheme: (state, action: PayloadAction<ThemeId>) => {
      state.themeId = action.payload;
    },
    setTemplate: (state, action: PayloadAction<{ templateId: string; blocks: Block[]; themeId: ThemeId }>) => {
      state.templateId = action.payload.templateId;
      state.blocks = action.payload.blocks;
      state.themeId = action.payload.themeId;
    },
    resetBuilder: (state) => {
      state.blocks = [];
      state.themeId = 'github-classic';
      state.templateId = null;
    }
  },
});

export const {
  setBlocks,
  addBlock,
  updateBlock,
  toggleBlockLayout,
  removeBlock,
  reorderBlocks,
  setTheme,
  setTemplate,
  resetBuilder
} = builderSlice.actions;

export default builderSlice.reducer;
