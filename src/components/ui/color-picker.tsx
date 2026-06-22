import * as React from "react"
import { Input } from "./input"
import { cn } from "@/lib/utils"

export interface ColorPickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange, className, ...props }: ColorPickerProps) {
  // Ensure the value is a valid hex color for the native input
  const safeValue = value && /^#?[0-9A-Fa-f]{6}$/.test(value) 
    ? (value.startsWith('#') ? value : `#${value}`) 
    : '#000000';

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // The native color picker always returns a string starting with '#'
    // If the original format didn't have '#', we strip it back to match the original expected format.
    let val = e.target.value;
    if (!value?.startsWith('#') && val.startsWith('#')) {
      val = val.substring(1);
    }
    onChange(val);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20 shadow-md transition-transform hover:scale-110">
        <input
          type="color"
          value={safeValue}
          onChange={handleColorChange}
          className="absolute -top-4 -left-4 w-16 h-16 cursor-pointer opacity-0"
          title="Pick a color"
        />
        <div 
          className="w-full h-full pointer-events-none" 
          style={{ backgroundColor: safeValue }}
        />
      </div>
      <Input
        type="text"
        value={value || ''}
        onChange={handleTextChange}
        className="font-mono"
        placeholder={value?.startsWith('#') ? "#000000" : "000000"}
        {...props}
      />
    </div>
  )
}
