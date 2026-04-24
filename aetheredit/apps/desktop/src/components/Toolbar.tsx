import React from 'react';
import { MousePointer2, Scissors, ZoomIn, Hand, Move, ArrowLeftRight, RotateCcw } from 'lucide-react';
import { useAppStore } from '@store/appStore';

const tools = [
  { id: 'select', icon: MousePointer2, label: 'Selection (V)', shortcut: 'V' },
  { id: 'ripple', icon: Move, label: 'Ripple Edit (R)', shortcut: 'R' },
  { id: 'roll', icon: ArrowLeftRight, label: 'Roll Edit (N)', shortcut: 'N' },
  { id: 'slip', icon: RotateCcw, label: 'Slip Edit (U)', shortcut: 'U' },
  { id: 'slide', icon: Move, label: 'Slide Edit (Y)', shortcut: 'Y' },
  { id: 'razor', icon: Scissors, label: 'Blade/Razor (B)', shortcut: 'B' },
  { id: 'zoom', icon: ZoomIn, label: 'Zoom (Z)', shortcut: 'Z' },
  { id: 'hand', icon: Hand, label: 'Hand (H)', shortcut: 'H' },
];

const aiTools = [
  { id: 'magic-wand', icon: '✨', label: 'AI Auto-Analyze' },
  { id: 'generate', icon: '🎬', label: 'AI Generate Clip' },
  { id: 'mask', icon: '🎭', label: 'Smart Mask' },
  { id: 'color', icon: '🎨', label: 'Auto-Color' },
  { id: 'voiceover', icon: '🎙️', label: 'Voiceover AI' },
];

export const Toolbar: React.FC = () => {
  const { activeTool, setActiveTool, timeline, setEditMode } = useAppStore();

  return (
    <div className="h-10 bg-surface border-b border-border flex items-center px-2 gap-1">
      {/* Standard Editing Tools */}
      <div className="flex items-center gap-0.5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          
          return (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id);
                if (['select', 'ripple', 'roll', 'slip', 'slide', 'razor'].includes(tool.id)) {
                  setEditMode(tool.id as any);
                }
              }}
              title={`${tool.label}`}
              className={`p-1.5 rounded transition-colors relative group ${
                isActive 
                  ? 'bg-primary text-background' 
                  : 'text-text-muted hover:text-text hover:bg-surface-light'
              }`}
            >
              {typeof Icon === 'string' ? (
                <span className="text-sm">{Icon}</span>
              ) : (
                <Icon size={16} />
              )}
              
              {/* Tooltip */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-[10px] bg-background border border-border rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
                {tool.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Divider */}
      <div className="w-px h-6 bg-border mx-1" />
      
      {/* AI Tools */}
      <div className="flex items-center gap-0.5">
        {aiTools.map((tool) => (
          <button
            key={tool.id}
            title={tool.label}
            className="p-1.5 rounded text-text-muted hover:text-primary hover:bg-surface-light transition-colors relative group"
          >
            <span className="text-sm">{tool.icon}</span>
            
            {/* Tooltip */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-[10px] bg-background border border-border rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
              {tool.label}
            </span>
          </button>
        ))}
      </div>
      
      {/* Spacer */}
      <div className="flex-1" />
      
      {/* Timeline Info */}
      <div className="flex items-center gap-3 text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <span className="text-[10px]">SNAP</span>
          <kbd className={`px-1.5 py-0.5 rounded text-[10px] ${timeline.snapping ? 'bg-primary text-background' : 'bg-surface-light'}`}>S</kbd>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px]">MODE</span>
          <span className="px-1.5 py-0.5 rounded bg-surface-light capitalize">{activeTool}</span>
        </div>
      </div>
      
      {/* Divider */}
      <div className="w-px h-6 bg-border mx-1" />
      
      {/* Export Button */}
      <button className="px-3 py-1 text-xs bg-primary text-background rounded hover:bg-primary-hover transition-colors font-medium">
        Export
      </button>
    </div>
  );
};
