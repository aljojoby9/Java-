import React from 'react';
import { useAppStore } from '@store/appStore';
import { Clip, Track } from '@types/index';

export const Timeline: React.FC = () => {
  const { project, timeline, setCurrentTime, setSelectedClips, setPlaying } = useAppStore();
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const pixelsPerSecond = 50 * timeline.zoom;
  const totalWidth = timeline.duration * pixelsPerSecond;

  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + timeline.scrollX;
    const time = x / pixelsPerSecond;
    setCurrentTime(Math.max(0, Math.min(time, timeline.duration)));
  };

  const handleClipClick = (e: React.MouseEvent, clipId: string) => {
    e.stopPropagation();
    setSelectedClips([clipId]);
  };

  // Generate ruler markers
  const renderRuler = () => {
    const markers = [];
    const interval = timeline.zoom > 2 ? 1 : timeline.zoom > 0.5 ? 5 : 15;
    
    for (let i = 0; i <= timeline.duration; i += interval) {
      const position = i * pixelsPerSecond;
      markers.push(
        <div
          key={i}
          className="absolute bottom-0 flex flex-col items-center"
          style={{ left: position }}
        >
          <div className="h-3 w-px bg-text-muted" />
          <span className="text-[9px] text-text-muted mt-0.5">{formatTimecode(i)}</span>
        </div>
      );
    }
    return markers;
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full bg-surface text-text-muted">
        <p>No project loaded</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface border-t border-border overflow-hidden">
      {/* Timeline Header */}
      <div className="panel-header">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold">Timeline</h2>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span>{project.name}</span>
            <span>|</span>
            <span>{formatTimecode(timeline.duration)} total</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="icon-btn text-xs px-2 py-1" title="Zoom Out">−</button>
          <span className="text-xs text-text-muted w-12 text-center">{Math.round(timeline.zoom * 100)}%</span>
          <button className="icon-btn text-xs px-2 py-1" title="Zoom In">+</button>
          <button className="icon-btn text-xs px-2 py-1 ml-2 bg-primary text-background rounded">
            Fit
          </button>
        </div>
      </div>
      
      {/* Timeline Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Track Headers */}
        <div className="w-28 flex-shrink-0 bg-surface-light border-r border-border">
          <div className="h-6 border-b border-border" /> {/* Ruler space */}
          {project.tracks.map((track) => (
            <div
              key={track.id}
              className="h-16 border-b border-border px-2 flex flex-col justify-center relative"
              style={{ backgroundColor: track.color + '20' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">{track.name}</span>
                <div className="flex gap-1">
                  <button className="text-[10px] px-1 hover:bg-surface rounded">M</button>
                  <button className="text-[10px] px-1 hover:bg-surface rounded">S</button>
                </div>
              </div>
              <span className="text-[9px] text-text-muted capitalize">{track.type}</span>
            </div>
          ))}
        </div>
        
        {/* Tracks Area */}
        <div className="flex-1 overflow-auto relative" ref={timelineRef}>
          <div style={{ width: totalWidth, minHeight: '100%' }}>
            {/* Ruler */}
            <div className="h-6 bg-surface border-b border-border relative">
              {renderRuler()}
            </div>
            
            {/* Tracks */}
            <div onClick={handleTimelineClick}>
              {project.tracks.map((track) => (
                <div
                  key={track.id}
                  className="timeline-track relative"
                  style={{ height: track.height }}
                >
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: Math.ceil(timeline.duration / 5) }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-0 bottom-0 w-px bg-text"
                        style={{ left: i * 5 * pixelsPerSecond }}
                      />
                    ))}
                  </div>
                  
                  {/* Clips */}
                  {track.clips.map((clip) => (
                    <div
                      key={clip.id}
                      className={`timeline-clip ${
                        timeline.selectedClipIds.includes(clip.id) ? 'ring-2 ring-primary' : ''
                      }`}
                      style={{
                        left: clip.startTime * pixelsPerSecond,
                        width: (clip.outPoint - clip.inPoint) * pixelsPerSecond,
                        backgroundColor: track.color + '40',
                      }}
                      onClick={(e) => handleClipClick(e, clip.id)}
                    >
                      <div className="absolute inset-0 p-1 overflow-hidden">
                        <div className="text-[9px] truncate font-medium">{clip.name}</div>
                        {clip.thumbnail && (
                          <img
                            src={clip.thumbnail}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                          />
                        )}
                        {clip.aiMetadata?.sceneType && (
                          <div className="absolute bottom-0 right-0 text-[8px] bg-black/70 px-1 rounded">
                            {clip.aiMetadata.sceneType}
                          </div>
                        )}
                      </div>
                      
                      {/* AI Badge */}
                      {clip.aiMetadata && (
                        <div className="clip-badge ai-enhanced" title="AI Enhanced" />
                      )}
                      
                      {/* Trim Handles */}
                      <div className="absolute left-0 top-0 bottom-0 w-2 cursor-w-resize hover:bg-white/20" />
                      <div className="absolute right-0 top-0 bottom-0 w-2 cursor-e-resize hover:bg-white/20" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Playhead */}
          <div
            className="playhead"
            style={{ left: timeline.currentTime * pixelsPerSecond - timeline.scrollX }}
          >
            <div className="playhead-head" />
          </div>
        </div>
      </div>
      
      {/* Timeline Footer */}
      <div className="h-6 bg-surface-light border-t border-border flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>Snapping: <kbd className="px-1 bg-background rounded">S</kbd></span>
          <span>Ripple: <kbd className="px-1 bg-background rounded">R</kbd></span>
          <span>Split: <kbd className="px-1 bg-background rounded">B</kbd></span>
        </div>
        <div className="text-xs text-text-muted timecode">
          Playhead: {formatTimecode(timeline.currentTime)}
        </div>
      </div>
    </div>
  );
};
