import React from 'react';
import { Sliders, Volume2, Palette, Sparkles, Info, Clock } from 'lucide-react';

const tabs = [
  { id: 'video', label: 'Video', icon: Sliders },
  { id: 'audio', label: 'Audio', icon: Volume2 },
  { id: 'color', label: 'Color', icon: Palette },
  { id: 'effects', label: 'Effects', icon: Sparkles },
  { id: 'ai', label: 'AI Assistant', icon: Sparkles },
  { id: 'info', label: 'Info', icon: Info },
];

export const InspectorPanel: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('ai');

  return (
    <div className="flex flex-col h-full bg-surface border-l border-border">
      {/* Panel Header */}
      <div className="panel-header">
        <h2 className="text-sm font-semibold">Inspector</h2>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 text-xs transition-colors ${
                activeTab === tab.id
                  ? 'bg-surface-light text-primary border-b-2 border-primary'
                  : 'text-text-muted hover:text-text hover:bg-surface-light'
              }`}
            >
              <Icon size={14} />
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === 'video' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Transform</h3>
            
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs">
                <span>Position X</span>
                <input type="number" defaultValue={960} className="w-20 px-2 py-1 bg-background border border-border rounded text-xs" />
              </label>
              <label className="flex items-center justify-between text-xs">
                <span>Position Y</span>
                <input type="number" defaultValue={540} className="w-20 px-2 py-1 bg-background border border-border rounded text-xs" />
              </label>
              <label className="flex items-center justify-between text-xs">
                <span>Scale</span>
                <input type="range" min="0" max="200" defaultValue={100} className="flex-1 ml-2" />
                <span className="w-12 text-right">100%</span>
              </label>
              <label className="flex items-center justify-between text-xs">
                <span>Rotation</span>
                <input type="range" min="0" max="360" defaultValue={0} className="flex-1 ml-2" />
                <span className="w-12 text-right">0°</span>
              </label>
              <label className="flex items-center justify-between text-xs">
                <span>Opacity</span>
                <input type="range" min="0" max="100" defaultValue={100} className="flex-1 ml-2" />
                <span className="w-12 text-right">100%</span>
              </label>
            </div>
            
            <div className="pt-2 border-t border-border">
              <h4 className="text-xs font-semibold text-text-muted mb-2">Crop</h4>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Left" className="px-2 py-1 bg-background border border-border rounded text-xs" />
                <input type="number" placeholder="Right" className="px-2 py-1 bg-background border border-border rounded text-xs" />
                <input type="number" placeholder="Top" className="px-2 py-1 bg-background border border-border rounded text-xs" />
                <input type="number" placeholder="Bottom" className="px-2 py-1 bg-background border border-border rounded text-xs" />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'audio' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Volume</h3>
            
            <label className="flex items-center gap-2">
              <Volume2 size={14} />
              <input type="range" min="0" max="200" defaultValue={100} className="flex-1" />
              <span className="text-xs w-12 text-right">0 dB</span>
            </label>
            
            <label className="flex items-center justify-between text-xs">
              <span>Pan</span>
              <input type="range" min="-100" max="100" defaultValue={0} className="flex-1 mx-2" />
              <span className="w-8 text-center">C</span>
            </label>
            
            <div className="pt-2 border-t border-border">
              <button className="w-full py-1.5 text-xs bg-primary text-background rounded hover:bg-primary-hover transition-colors flex items-center justify-center gap-1">
                <Sparkles size={12} />
                AI Auto-Mix
              </button>
            </div>
            
            <div className="pt-2 border-t border-border">
              <h4 className="text-xs font-semibold text-text-muted mb-2">EQ</h4>
              <div className="h-20 bg-background border border-border rounded flex items-end justify-around p-2">
                {[60, 80, 100, 90, 70, 85, 95].map((val, i) => (
                  <div key={i} className="w-4 bg-primary/50 rounded-t" style={{ height: `${val}%` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'color' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Color Wheels</h3>
            
            <div className="grid grid-cols-3 gap-2">
              {['Lift', 'Gamma', 'Gain'].map((wheel) => (
                <div key={wheel} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full border-4 border-surface-light bg-gradient-to-br from-blue-500 via-transparent to-red-500" />
                  <span className="text-[10px] text-text-muted">{wheel}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-2 border-t border-border">
              <button className="w-full py-1.5 text-xs bg-surface-light hover:bg-primary hover:text-background rounded transition-colors flex items-center justify-center gap-1">
                <Palette size={12} />
                AI Match Color
              </button>
            </div>
            
            <div className="pt-2 border-t border-border">
              <h4 className="text-xs font-semibold text-text-muted mb-2">Scopes</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-video bg-background border border-border rounded" />
                <div className="aspect-video bg-background border border-border rounded" />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'ai' && (
          <div className="space-y-3">
            {/* AI Chat Interface */}
            <div className="bg-background border border-border rounded-lg p-3 min-h-[200px]">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles size={14} className="text-background" />
                  </div>
                  <div className="bg-surface-light rounded-lg px-3 py-2 text-xs">
                    <p>Hi! I'm your AI editing assistant. What would you like to create today?</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 space-y-1">
                <p className="text-[10px] text-text-muted font-semibold">Quick Actions:</p>
                <button className="w-full text-left px-2 py-1.5 text-xs bg-surface-light hover:bg-primary hover:text-background rounded transition-colors">
                  🎬 Create a 90-second highlight reel
                </button>
                <button className="w-full text-left px-2 py-1.5 text-xs bg-surface-light hover:bg-primary hover:text-background rounded transition-colors">
                  🗣️ Remove filler words from dialogue
                </button>
                <button className="w-full text-left px-2 py-1.5 text-xs bg-surface-light hover:bg-primary hover:text-background rounded transition-colors">
                  🎨 Apply cinematic color grade
                </button>
                <button className="w-full text-left px-2 py-1.5 text-xs bg-surface-light hover:bg-primary hover:text-background rounded transition-colors">
                  📝 Generate subtitles with speakers
                </button>
              </div>
            </div>
            
            {/* Input */}
            <div className="relative">
              <textarea
                placeholder="Describe what you want to do... (e.g., 'Add slow motion to the action scene and add epic music')"
                className="w-full px-3 py-2 text-xs bg-background border border-border rounded-lg resize-none focus:outline-none focus:border-primary min-h-[60px]"
              />
              <button className="absolute bottom-2 right-2 p-1 bg-primary text-background rounded hover:bg-primary-hover transition-colors">
                <Sparkles size={14} />
              </button>
            </div>
            
            {/* Apply Options */}
            <div className="flex gap-1">
              <button className="flex-1 py-1 text-xs bg-surface-light hover:bg-primary hover:text-background rounded transition-colors">
                Selection
              </button>
              <button className="flex-1 py-1 text-xs bg-surface-light hover:bg-primary hover:text-background rounded transition-colors">
                Timeline
              </button>
              <button className="flex-1 py-1 text-xs bg-surface-light hover:bg-primary hover:text-background rounded transition-colors">
                New Track
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'effects' && (
          <div className="space-y-3">
            <button className="w-full py-1.5 text-xs bg-surface-light hover:bg-primary hover:text-background rounded transition-colors">
              + Add Effect
            </button>
            
            <div className="space-y-2">
              {['Blur', 'Sharpen', 'Glow'].map((effect) => (
                <div key={effect} className="flex items-center justify-between p-2 bg-background border border-border rounded">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-xs">{effect}</span>
                  </div>
                  <button className="text-text-muted hover:text-text">⚙️</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'info' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Clip Info</h3>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">Name:</span>
                  <span>No clip selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Duration:</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Resolution:</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Format:</span>
                  <span>-</span>
                </div>
              </div>
            </div>
            
            <div className="pt-3 border-t border-border">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">AI Analysis</h3>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="px-2 py-0.5 text-[10px] bg-surface-light rounded text-text-muted">No AI data</span>
              </div>
            </div>
            
            <div className="pt-3 border-t border-border">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">History</h3>
              <div className="space-y-1 mt-2">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Clock size={10} />
                  <span>Project created</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
