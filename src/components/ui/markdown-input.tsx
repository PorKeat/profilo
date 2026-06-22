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
    <div className="flex items-center gap-1 p-1 bg-muted/50 border-b border-input rounded-t-md">
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
    <div className={cn("border border-input rounded-md focus-within:ring-3 focus-within:ring-ring/50 focus-within:border-ring transition-colors", containerClassName)}>
      <FormattingToolbar onFormat={handleFormat} />
      <Input 
        ref={ref} 
        value={value} 
        onChange={(e) => onChange && onChange(e.target.value)} 
        className={cn("border-0 focus-visible:ring-0 rounded-none rounded-b-md shadow-none px-2.5 py-1.5 h-auto min-h-0", className)}
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
    <div className={cn("border border-input rounded-md focus-within:ring-3 focus-within:ring-ring/50 focus-within:border-ring transition-colors", containerClassName)}>
      <FormattingToolbar onFormat={handleFormat} />
      <Textarea 
        ref={ref} 
        value={value} 
        onChange={(e) => onChange && onChange(e.target.value)} 
        className={cn("border-0 focus-visible:ring-0 rounded-none rounded-b-md shadow-none resize-y min-h-[80px]", className)}
        {...props} 
      />
    </div>
  );
}
