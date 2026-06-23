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
