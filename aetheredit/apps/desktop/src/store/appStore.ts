import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Project, Clip, Track, TimelineState, WorkspaceLayout, MediaItem, AIJob } from '@types/index';

interface AppState {
  // Project state
  project: Project | null;
  mediaItems: MediaItem[];
  aiJobs: AIJob[];
  
  // Timeline state
  timeline: TimelineState;
  
  // Layout state
  workspace: WorkspaceLayout;
  
  // UI state
  activeTool: string;
  isSidebarOpen: boolean;
  
  // Actions
  setProject: (project: Project) => void;
  addMediaItems: (items: MediaItem[]) => void;
  removeMediaItem: (id: string) => void;
  
  // Timeline actions
  setCurrentTime: (time: number) => void;
  setPlaying: (playing: boolean) => void;
  setZoom: (zoom: number) => void;
  setSelectedClips: (ids: string[]) => void;
  setEditMode: (mode: TimelineState['editMode']) => void;
  
  // Clip actions
  addClip: (clip: Clip) => void;
  updateClip: (id: string, updates: Partial<Clip>) => void;
  removeClip: (id: string) => void;
  moveClip: (id: string, trackId: string, startTime: number) => void;
  
  // Track actions
  addTrack: (track: Track) => void;
  removeTrack: (id: string) => void;
  updateTrack: (id: string, updates: Partial<Track>) => void;
  
  // AI actions
  addAIJob: (job: AIJob) => void;
  updateAIJob: (id: string, updates: Partial<AIJob>) => void;
  
  // Layout actions
  setWorkspaceLayout: (layout: Partial<WorkspaceLayout>) => void;
  setActiveWorkspace: (workspace: WorkspaceLayout['activeWorkspace']) => void;
  
  // UI actions
  setActiveTool: (tool: string) => void;
  toggleSidebar: () => void;
}

const createDefaultProject = (): Project => ({
  id: crypto.randomUUID(),
  name: 'Untitled Project',
  width: 1920,
  height: 1080,
  fps: 30,
  duration: 0,
  tracks: [
    { id: 'v1', name: 'V1', type: 'video', height: 64, color: '#00ff9f', muted: false, solo: false, locked: false, clips: [] },
    { id: 'v2', name: 'V2', type: 'video', height: 64, color: '#1473e6', muted: false, solo: false, locked: false, clips: [] },
    { id: 'v3', name: 'V3', type: 'video', height: 64, color: '#ffd700', muted: false, solo: false, locked: false, clips: [] },
    { id: 'a1', name: 'A1', type: 'audio', height: 64, color: '#ff6b6b', muted: false, solo: false, locked: false, clips: [] },
    { id: 'a2', name: 'A2', type: 'audio', height: 64, color: '#4ecdc4', muted: false, solo: false, locked: false, clips: [] },
    { id: 'a3', name: 'A3', type: 'audio', height: 64, color: '#95e1d3', muted: false, solo: false, locked: false, clips: [] },
  ],
  markers: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  settings: {
    proxyEnabled: true,
    proxyResolution: '1080p',
    autoSave: true,
    snapEnabled: true,
    magneticTimeline: false,
    theme: 'fcpx',
  },
});

const defaultTimelineState: TimelineState = {
  currentTime: 0,
  duration: 300, // 5 minutes default
  zoom: 1,
  scrollX: 0,
  scrollY: 0,
  selectedClipIds: [],
  selectedTrackIds: [],
  editMode: 'select',
  snapping: true,
  isPlaying: false,
};

const defaultWorkspace: WorkspaceLayout = {
  leftPanelWidth: 22,
  rightPanelWidth: 25,
  viewerHeight: 45,
  timelineHeight: 55,
  showSourceMonitor: false,
  activeWorkspace: 'editing',
};

export const useAppStore = create<AppState>()(
  immer((set, get) => ({
    // Initial state
    project: null,
    mediaItems: [],
    aiJobs: [],
    timeline: defaultTimelineState,
    workspace: defaultWorkspace,
    activeTool: 'select',
    isSidebarOpen: true,
    
    // Project actions
    setProject: (project) => {
      set((state) => {
        state.project = project;
      });
    },
    
    addMediaItems: (items) => {
      set((state) => {
        state.mediaItems.push(...items);
      });
    },
    
    removeMediaItem: (id) => {
      set((state) => {
        state.mediaItems = state.mediaItems.filter(item => item.id !== id);
      });
    },
    
    // Timeline actions
    setCurrentTime: (time) => {
      set((state) => {
        state.timeline.currentTime = time;
      });
    },
    
    setPlaying: (playing) => {
      set((state) => {
        state.timeline.isPlaying = playing;
      });
    },
    
    setZoom: (zoom) => {
      set((state) => {
        state.timeline.zoom = Math.max(0.1, Math.min(10, zoom));
      });
    },
    
    setSelectedClips: (ids) => {
      set((state) => {
        state.timeline.selectedClipIds = ids;
      });
    },
    
    setEditMode: (mode) => {
      set((state) => {
        state.timeline.editMode = mode;
      });
    },
    
    // Clip actions
    addClip: (clip) => {
      set((state) => {
        if (state.project) {
          const track = state.project.tracks.find(t => t.id === clip.trackId);
          if (track) {
            track.clips.push(clip);
            state.project.updatedAt = new Date();
          }
        }
      });
    },
    
    updateClip: (id, updates) => {
      set((state) => {
        if (state.project) {
          for (const track of state.project.tracks) {
            const clip = track.clips.find(c => c.id === id);
            if (clip) {
              Object.assign(clip, updates);
              state.project.updatedAt = new Date();
              break;
            }
          }
        }
      });
    },
    
    removeClip: (id) => {
      set((state) => {
        if (state.project) {
          for (const track of state.project.tracks) {
            track.clips = track.clips.filter(c => c.id !== id);
          }
          state.project.updatedAt = new Date();
        }
      });
    },
    
    moveClip: (id, trackId, startTime) => {
      set((state) => {
        if (state.project) {
          let clipToMove = null;
          
          // Remove from old track
          for (const track of state.project.tracks) {
            const index = track.clips.findIndex(c => c.id === id);
            if (index !== -1) {
              clipToMove = track.clips[index];
              track.clips.splice(index, 1);
              break;
            }
          }
          
          // Add to new track
          if (clipToMove) {
            const targetTrack = state.project.tracks.find(t => t.id === trackId);
            if (targetTrack) {
              clipToMove.startTime = startTime;
              targetTrack.clips.push(clipToMove);
            }
          }
          
          state.project.updatedAt = new Date();
        }
      });
    },
    
    // Track actions
    addTrack: (track) => {
      set((state) => {
        if (state.project) {
          state.project.tracks.push(track);
          state.project.updatedAt = new Date();
        }
      });
    },
    
    removeTrack: (id) => {
      set((state) => {
        if (state.project) {
          state.project.tracks = state.project.tracks.filter(t => t.id !== id);
          state.project.updatedAt = new Date();
        }
      });
    },
    
    updateTrack: (id, updates) => {
      set((state) => {
        if (state.project) {
          const track = state.project.tracks.find(t => t.id === id);
          if (track) {
            Object.assign(track, updates);
            state.project.updatedAt = new Date();
          }
        }
      });
    },
    
    // AI actions
    addAIJob: (job) => {
      set((state) => {
        state.aiJobs.push(job);
      });
    },
    
    updateAIJob: (id, updates) => {
      set((state) => {
        const job = state.aiJobs.find(j => j.id === id);
        if (job) {
          Object.assign(job, updates);
        }
      });
    },
    
    // Layout actions
    setWorkspaceLayout: (layout) => {
      set((state) => {
        Object.assign(state.workspace, layout);
      });
    },
    
    setActiveWorkspace: (workspaceName) => {
      set((state) => {
        state.workspace.activeWorkspace = workspaceName;
      });
    },
    
    // UI actions
    setActiveTool: (tool) => {
      set((state) => {
        state.activeTool = tool;
      });
    },
    
    toggleSidebar: () => {
      set((state) => {
        state.isSidebarOpen = !state.isSidebarOpen;
      });
    },
  }))
);

// Initialize project on load
export const initializeProject = () => {
  const store = useAppStore.getState();
  if (!store.project) {
    useAppStore.getState().setProject(createDefaultProject());
  }
};
