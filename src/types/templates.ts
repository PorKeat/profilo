import type { Block } from './blocks';
import type { ThemeId } from './theme';

export type TemplateCategory = 'Minimal' | 'Creative' | 'Professional' | 'Data-Driven' | 'Fun & Quirky';

export interface Template {
  id: string;
  name: string;
  desc: string;
  themeId: ThemeId;
  category: TemplateCategory;
  blocks: Block[];
}
