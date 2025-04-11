import { Block } from './blocks';

export type ThemeId = 
  | 'minimal-dark' 
  | 'clean-light' 
  | 'devops-blue' 
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
