import * as React from 'react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Bold, Italic, Strikethrough, Code, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  onFormat: (prefix: string, suffix?: string) => void;
}

function FormattingToolbar({ onFormat }: ToolbarProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-black/5 dark:bg-black/20 border-b border-black/10 dark:border-white/10">
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.preventDefault(); onFormat('**'); }} title="Bold">
        <Bold className="w-3.5 h-3.5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.preventDefault(); onFormat('*'); }} title="Italic">
        <Italic className="w-3.5 h-3.5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.preventDefault(); onFormat('~~'); }} title="Strikethrough">
        <Strikethrough className="w-3.5 h-3.5" />
      </Button>
      <div className="w-px h-4 bg-border mx-1" />
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.preventDefault(); onFormat('`'); }} title="Code">
        <Code className="w-3.5 h-3.5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.preventDefault(); onFormat('[', '](url)'); }} title="Link">
        <LinkIcon className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

function useMarkdownFormatting(
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>, 
  value: string, 
  onChange?: (val: string) => void
) {
  const handleFormat = React.useCallback((prefix: string, suffix: string = prefix) => {
    if (!ref.current) return;
    const el = ref.current;
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    
    const before = value.substring(0, start);
    const selected = value.substring(start, end);
    const after = value.substring(end);
    
    // If no text selected and we are inserting a link, we might want to insert a default text
    const textToWrap = selected || (suffix === '](url)' ? 'text' : '');
    
    const newValue = before + prefix + textToWrap + suffix + after;
    
    if (onChange) {
      onChange(newValue);
    }
    
    // Schedule selection restoration
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + textToWrap.length);
    }, 0);
  }, [ref, value, onChange]);
  
  return handleFormat;
}

export interface MarkdownInputProps extends Omit<React.ComponentProps<"input">, 'onChange' | 'value'> {
  value?: string;
  onChange?: (val: string) => void;
  containerClassName?: string;
}

export function MarkdownInput({ value = '', onChange, className, containerClassName, ...props }: MarkdownInputProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const handleFormat = useMarkdownFormatting(ref, value, onChange);
  
  return (
    <div className={cn("rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/40 overflow-hidden shadow-inner transition-all duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/40 focus-within:shadow-[0_0_15px_rgba(75,134,247,0.15)] hover:border-black/20 dark:hover:border-white/20", containerClassName)}>
      <FormattingToolbar onFormat={handleFormat} />
      <Input 
        ref={ref} 
        value={value} 
        onChange={(e) => onChange && onChange(e.target.value)} 
        className={cn("border-0 focus-visible:ring-0 rounded-none shadow-none px-4 py-2 h-auto min-h-0 bg-transparent text-sm", className)}
        {...props} 
      />
    </div>
  );
}

export interface MarkdownTextareaProps extends Omit<React.ComponentProps<"textarea">, 'onChange' | 'value'> {
  value?: string;
  onChange?: (val: string) => void;
  containerClassName?: string;
}

export function MarkdownTextarea({ value = '', onChange, className, containerClassName, ...props }: MarkdownTextareaProps) {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const handleFormat = useMarkdownFormatting(ref, value, onChange);
  
  return (
    <div className={cn("rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/40 overflow-hidden shadow-inner transition-all duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/40 focus-within:shadow-[0_0_15px_rgba(75,134,247,0.15)] hover:border-black/20 dark:hover:border-white/20", containerClassName)}>
      <FormattingToolbar onFormat={handleFormat} />
      <Textarea 
        ref={ref} 
        value={value} 
        onChange={(e) => onChange && onChange(e.target.value)} 
        className={cn("border-0 focus-visible:ring-0 rounded-none shadow-none resize-y min-h-[80px] bg-transparent text-sm px-4 py-2", className)}
        {...props} 
      />
    </div>
  );
}
