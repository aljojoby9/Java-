import React from 'react';
import { Folder, Film, Music, Image, Sparkles, Star, Layers, Type } from 'lucide-react';

const tabs = [
  { id: 'media', label: 'Media', icon: Folder },
  { id: 'effects', label: 'Effects', icon: Sparkles },
  { id: 'transitions', label: 'Transitions', icon: Layers },
  { id: 'titles', label: 'Titles', icon: Type },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'ai', label: 'AI Library', icon: Sparkles },
  { id: 'favorites', label: 'Favorites', icon: Star },
];

export const MediaBrowser: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('media');

  return (
    <div className="flex flex-col h-full bg-surface border-r border-border">
      {/* Panel Header */}
      <div className="panel-header">
        <h2 className="text-sm font-semibold">Media Browser</h2>
        <button className="icon-btn text-xs bg-primary text-background px-2 py-1 rounded">
          Import
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-3 py-2 text-xs whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-surface-light text-primary border-b-2 border-primary'
                  : 'text-text-muted hover:text-text hover:bg-surface-light'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>
      
      {/* Search Bar */}
      <div className="p-2 border-b border-border">
        <input
          type="text"
          placeholder="Search media... (AI tags: scene, objects, emotion)"
          className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded focus:outline-none focus:border-primary text-text placeholder-text-disabled"
        />
      </div>
      
      {/* Filter Tags */}
      <div className="flex gap-1 p-2 border-b border-border overflow-x-auto">
        <span className="px-2 py-0.5 text-xs bg-surface-light rounded text-text-muted">All</span>
        <span className="px-2 py-0.5 text-xs bg-surface-light rounded text-text-muted hover:text-text cursor-pointer">Video</span>
        <span className="px-2 py-0.5 text-xs bg-surface-light rounded text-text-muted hover:text-text cursor-pointer">Audio</span>
        <span className="px-2 py-0.5 text-xs bg-surface-light rounded text-text-muted hover:text-text cursor-pointer">Images</span>
        <span className="px-2 py-0.5 text-xs bg-surface-light rounded text-text-muted hover:text-text cursor-pointer">🎬 Interview</span>
        <span className="px-2 py-0.5 text-xs bg-surface-light rounded text-text-muted hover:text-text cursor-pointer">🌅 Landscape</span>
        <span className="px-2 py-0.5 text-xs bg-surface-light rounded text-text-muted hover:text-text cursor-pointer">😊 Happy</span>
      </div>
      
      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Placeholder media items */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="clip-thumbnail aspect-video rounded border border-border hover:border-primary cursor-grab active:cursor-grabbing group relative"
            >
              <div className="absolute inset-0 flex items-center justify-center text-text-disabled">
                <Film size={24} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1 py-0.5">
                <p className="text-xs truncate">Clip_{i}.mp4</p>
                <p className="text-[10px] text-text-muted">00:00:{String(i * 15).padStart(2, '0')}</p>
              </div>
              {i % 2 === 0 && (
                <div className="clip-badge ai-generated" title="AI Generated"></div>
              )}
              {i % 3 === 0 && (
                <div className="absolute top-1 left-1 flex gap-0.5">
                  <span className="text-[8px] bg-primary text-background px-1 rounded">HD</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Analyze Button */}
      <div className="p-2 border-t border-border">
        <button className="w-full py-1.5 text-xs bg-surface-light hover:bg-primary hover:text-background rounded transition-colors flex items-center justify-center gap-1">
          <Sparkles size={12} />
          Analyze All with AI
        </button>
      </div>
    </div>
  );
};
