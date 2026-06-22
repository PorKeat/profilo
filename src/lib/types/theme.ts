import { Block } from './blocks';

export type ThemeId = 
  | 'clean-light' 
  | 'cyberpunk' 
  | 'github-classic' 
  | 'purple-gradient';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  themeId: ThemeId;
  blocks: Block[];
}
