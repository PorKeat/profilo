export const FONT_OPTIONS = [
  {
    id: 'modern-sans',
    label: 'Modern Sans (Clean & Sleek)',
    stack: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
  },
  {
    id: 'developer-mono',
    label: 'Developer Mono (Crisp)',
    stack: '"ui-monospace", "SF Mono", "Fira Code", "JetBrains Mono", Menlo, Consolas, monospace'
  },
  {
    id: 'elegant-serif',
    label: 'Elegant Serif (Classic)',
    stack: 'Georgia, Cambria, "Times New Roman", Times, serif'
  },
  {
    id: 'bold-impact',
    label: 'Bold Impact (Heavy)',
    stack: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif'
  },
  {
    id: 'playful',
    label: 'Playful (Quirky)',
    stack: '"Comic Sans MS", "Comic Sans", cursive'
  },
  {
    id: 'classic-sans',
    label: 'Classic Sans (Friendly)',
    stack: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", Tahoma, sans-serif'
  }
];

export function getFontStack(id: string | undefined, defaultStack: string): string {
  if (!id) return defaultStack;
  const font = FONT_OPTIONS.find(f => f.id === id);
  return font ? font.stack : defaultStack;
}
