import React from 'react';
import { Folder, Save, Import, Settings, Undo, Redo, Scissors, Copy, Clipboard } from 'lucide-react';

export const MenuBar: React.FC = () => {
  return (
    <div className="h-8 bg-surface border-b border-border flex items-center px-2 text-xs">
      {/* App Logo/Name */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
          <span className="text-background font-bold text-[10px]">A</span>
        </div>
        <span className="font-semibold text-text-muted">AetherEdit</span>
      </div>
      
      {/* Menu Items */}
      <div className="flex items-center gap-1">
        <MenuDropdown label="File" items={[
          { label: 'New Project', shortcut: 'Cmd+N', icon: Folder },
          { label: 'Open Project...', shortcut: 'Cmd+O' },
          { type: 'separator' },
          { label: 'Save', shortcut: 'Cmd+S', icon: Save },
          { label: 'Save As...' },
          { type: 'separator' },
          { label: 'Import Media...', shortcut: 'Cmd+I', icon: Import },
          { label: 'Import Folder...' },
          { type: 'separator' },
          { label: 'Export', submenu: [
            { label: 'Current Frame...' },
            { label: 'Selection...' },
            { label: 'Full Timeline...', shortcut: 'Cmd+E' },
          ]},
          { type: 'separator' },
          { label: 'Project Settings...', icon: Settings },
        ]} />
        
        <MenuDropdown label="Edit" items={[
          { label: 'Undo', shortcut: 'Cmd+Z', icon: Undo },
          { label: 'Redo', shortcut: 'Cmd+Shift+Z', icon: Redo },
          { type: 'separator' },
          { label: 'Cut', shortcut: 'Cmd+X', icon: Scissors },
          { label: 'Copy', shortcut: 'Cmd+C', icon: Copy },
          { label: 'Paste', shortcut: 'Cmd+V', icon: Clipboard },
          { type: 'separator' },
          { label: 'Ripple Delete', shortcut: 'Shift+Backspace' },
          { label: 'Delete', shortcut: 'Backspace' },
          { type: 'separator' },
          { label: 'Select All', shortcut: 'Cmd+A' },
          { label: 'Deselect All', shortcut: 'Cmd+Shift+A' },
        ]} />
        
        <MenuDropdown label="View" items={[
          { label: 'Zoom In', shortcut: 'Cmd+=' },
          { label: 'Zoom Out', shortcut: 'Cmd+-' },
          { label: 'Fit to Window', shortcut: 'Cmd+0' },
          { type: 'separator' },
          { label: 'Show Media Browser', shortcut: 'Cmd+1' },
          { label: 'Show Inspector', shortcut: 'Cmd+2' },
          { label: 'Show Timeline', shortcut: 'Cmd+3' },
          { type: 'separator' },
          { label: 'Workspaces', submenu: [
            { label: 'Editing' },
            { label: 'Color Grading' },
            { label: 'Audio' },
            { label: 'AI Creative' },
          ]},
          { type: 'separator' },
          { label: 'Full Screen', shortcut: 'Ctrl+Cmd+F' },
        ]} />
        
        <MenuDropdown label="Insert" items={[
          { label: 'Clip', shortcut: 'Cmd+K' },
          { label: 'Transition', submenu: [
            { label: 'Cross Dissolve' },
            { label: 'Fade to Black' },
            { label: 'Wipe' },
            { label: 'Glitch' },
          ]},
          { label: 'Title', shortcut: 'Cmd+T' },
          { label: 'Generator', submenu: [
            { label: 'Solid Color' },
            { label: 'Gradient' },
            { label: 'Countdown' },
          ]},
          { type: 'separator' },
          { label: 'AI Generated Clip...', icon: Sparkles },
        ]} />
        
        <MenuDropdown label="Modify" items={[
          { label: 'Speed/Duration...', shortcut: 'Cmd+R' },
          { label: 'Nest' },
          { label: 'Compound Clip', shortcut: 'Cmd+G' },
          { type: 'separator' },
          { label: 'AI Enhance', submenu: [
            { label: 'Stabilize' },
            { label: 'Super Resolution' },
            { label: 'Slow Motion (Frame Interpolation)' },
            { label: 'Deblur' },
          ]},
        ]} />
        
        <MenuDropdown label="AI Tools" highlight items={[
          { label: 'Auto-Edit from Selection...', icon: Sparkles },
          { label: 'Generate B-Roll...', icon: Sparkles },
          { type: 'separator' },
          { label: 'Transcribe & Subtitle', icon: Sparkles },
          { label: 'Magic Color Grade', icon: Sparkles },
          { label: 'Object Removal', icon: Sparkles },
          { label: 'Style Transfer', icon: Sparkles },
          { type: 'separator' },
          { label: 'Chat with AI Editor', shortcut: 'Cmd+/', icon: Sparkles },
        ]} />
        
        <MenuDropdown label="Window" items={[
          { label: 'Media Browser' },
          { label: 'Timeline' },
          { label: 'Inspector' },
          { label: 'Effects' },
          { label: 'Audio Mixer' },
          { type: 'separator' },
          { label: 'Reset Layout' },
        ]} />
        
        <MenuDropdown label="Help" items={[
          { label: 'Documentation' },
          { label: 'Keyboard Shortcuts', shortcut: 'Cmd+?' },
          { label: 'Video Tutorials' },
          { type: 'separator' },
          { label: 'About AetherEdit' },
        ]} />
      </div>
      
      {/* Right side - User/Cloud status */}
      <div className="ml-auto flex items-center gap-3 text-text-muted">
        <span className="text-xs">Local Mode</span>
        <div className="w-2 h-2 rounded-full bg-primary" title="All systems operational" />
      </div>
    </div>
  );
};

interface MenuItem {
  label: string;
  shortcut?: string;
  icon?: React.ElementType;
  type?: 'separator';
  submenu?: MenuItem[];
}

interface MenuDropdownProps {
  label: string;
  items: MenuItem[];
  highlight?: boolean;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ label, items, highlight }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className={`px-2 py-1 rounded hover:bg-surface-light transition-colors ${
          highlight ? 'text-primary hover:text-primary-hover' : ''
        }`}
      >
        {label}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-surface border border-border rounded-lg shadow-xl py-1 z-50">
          {items.map((item, index) => (
            item.type === 'separator' ? (
              <div key={index} className="h-px bg-border my-1" />
            ) : (
              <button
                key={index}
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs hover:bg-surface-light transition-colors group"
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon size={12} className="text-text-muted" />}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="text-text-muted opacity-50">{item.shortcut}</span>
                )}
                {item.submenu && (
                  <span className="text-text-muted">›</span>
                )}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

// Placeholder for Sparkles icon
const Sparkles = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
  </svg>
);
