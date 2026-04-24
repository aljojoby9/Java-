import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Square, Volume2 } from 'lucide-react';
import { useAppStore } from '@store/appStore';

export const ViewerSection: React.FC = () => {
  const { timeline, setPlaying, setCurrentTime } = useAppStore();
  const [showSourceMonitor, setShowSourceMonitor] = React.useState(false);

  const formatTimecode = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 30);
    
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-surface border-b border-border">
      {/* Panel Header */}
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSourceMonitor(!showSourceMonitor)}
            className={`text-xs px-2 py-1 rounded ${
              showSourceMonitor ? 'bg-primary text-background' : 'bg-surface-light text-text-muted'
            }`}
          >
            {showSourceMonitor ? 'Dual View' : 'Single View'}
          </button>
          <h2 className="text-sm font-semibold">Program Monitor</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="icon-btn" title="Safe Margins">
            <Square size={14} />
          </button>
          <button className="icon-btn" title="Full Screen">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Video Monitors */}
      <div className={`flex-1 flex ${showSourceMonitor ? 'flex-row' : ''} p-2 gap-2`}>
        {showSourceMonitor && (
          <div className="flex-1 flex flex-col bg-black rounded overflow-hidden">
            <div className="px-2 py-1 bg-surface-light text-xs text-text-muted border-b border-border">
              Source
            </div>
            <div className="flex-1 flex items-center justify-center text-text-disabled">
              <div className="text-center">
                <p className="text-sm">No Source Clip</p>
                <p className="text-xs">Double-click a clip to load</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Program Monitor */}
        <div className={`flex flex-col bg-black rounded overflow-hidden ${showSourceMonitor ? 'flex-1' : 'flex-1'}`}>
          {!showSourceMonitor && (
            <div className="px-2 py-1 bg-surface-light text-xs text-text-muted border-b border-border">
              Program
            </div>
          )}
          
          {/* Video Display */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="aspect-video bg-black/50 rounded w-full max-w-full flex items-center justify-center">
              <div className="text-center text-text-disabled">
                <p className="text-sm">No Video Output</p>
                <p className="text-xs">Add clips to timeline to preview</p>
              </div>
            </div>
            
            {/* Overlays */}
            <div className="absolute top-2 left-2 text-xs text-text-muted font-mono">
              1920x1080 @ 30fps
            </div>
          </div>
          
          {/* Timecode Display */}
          <div className="px-3 py-2 bg-surface-light border-t border-border">
            <div className="timecode text-center text-lg text-primary tracking-widest">
              {formatTimecode(timeline.currentTime)}
            </div>
          </div>
          
          {/* Transport Controls */}
          <div className="flex items-center justify-center gap-1 p-2 bg-surface border-t border-border">
            <button className="icon-btn" title="Go to Start">
              <SkipBack size={16} />
            </button>
            <button className="icon-btn" title="Step Backward">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 19V5l-7 7 7 7zm9 0V5l-7 7 7 7z" />
              </svg>
            </button>
            <button
              className="icon-btn active"
              onClick={() => setPlaying(!timeline.isPlaying)}
              title={timeline.isPlaying ? 'Pause' : 'Play'}
            >
              {timeline.isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button className="icon-btn" title="Step Forward">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 19V5l7 7-7 7zM4 19V5l7 7-7 7z" />
              </svg>
            </button>
            <button className="icon-btn" title="Go to End">
              <SkipForward size={16} />
            </button>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <button className="icon-btn" title="Stop">
              <Square size={16} />
            </button>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <button className="icon-btn" title="Volume">
              <Volume2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
