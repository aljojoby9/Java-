export interface Clip {
  id: string;
  name: string;
  filePath: string;
  duration: number; // in seconds
  startTime: number; // position on timeline
  trackId: string;
  type: 'video' | 'audio' | 'image' | 'text';
  thumbnail?: string;
  waveform?: string;
  inPoint: number;
  outPoint: number;
  speed: number;
  volume: number;
  opacity: number;
  scale: number;
  position: { x: number; y: number };
  rotation: number;
  aiTags?: string[];
  aiMetadata?: {
    sceneType?: string;
    objects?: string[];
    emotions?: string[];
    transcription?: TranscriptionSegment[];
    qualityScore?: number;
  };
  effects: Effect[];
  keyframes: KeyframeTrack[];
}

export interface Track {
  id: string;
  name: string;
  type: 'video' | 'audio';
  height: number;
  color: string;
  muted: boolean;
  solo: boolean;
  locked: boolean;
  clips: Clip[];
}

export interface Project {
  id: string;
  name: string;
  filePath?: string;
  width: number;
  height: number;
  fps: number;
  duration: number;
  tracks: Track[];
  markers: Marker[];
  createdAt: Date;
  updatedAt: Date;
  settings: ProjectSettings;
}

export interface ProjectSettings {
  proxyEnabled: boolean;
  proxyResolution: '720p' | '1080p' | 'original';
  autoSave: boolean;
  snapEnabled: boolean;
  magneticTimeline: boolean;
  theme: 'fcpx' | 'premiere' | 'custom';
}

export interface Marker {
  id: string;
  time: number;
  name: string;
  color: string;
  notes?: string;
}

export interface Effect {
  id: string;
  name: string;
  type: 'color' | 'blur' | 'sharpen' | 'glow' | 'lut' | 'transform';
  enabled: boolean;
  parameters: Record<string, any>;
}

export interface Keyframe {
  time: number;
  value: any;
  ease?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface KeyframeTrack {
  property: string;
  keyframes: Keyframe[];
}

export interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
  speaker?: string;
  confidence: number;
}

export interface MediaItem {
  id: string;
  name: string;
  filePath: string;
  type: 'video' | 'audio' | 'image';
  duration?: number;
  resolution?: { width: number; height: number };
  fps?: number;
  thumbnail?: string;
  aiTags?: string[];
  aiMetadata?: any;
  importedAt: Date;
}

export interface AIJob {
  id: string;
  type: 'analyze' | 'transcribe' | 'generate' | 'enhance' | 'remove-object' | 'style-transfer';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  input: any;
  output?: any;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface TimelineState {
  currentTime: number;
  duration: number;
  zoom: number;
  scrollX: number;
  scrollY: number;
  selectedClipIds: string[];
  selectedTrackIds: string[];
  editMode: 'select' | 'ripple' | 'roll' | 'slip' | 'slide' | 'razor';
  snapping: boolean;
  isPlaying: boolean;
}

export interface WorkspaceLayout {
  leftPanelWidth: number;
  rightPanelWidth: number;
  viewerHeight: number;
  timelineHeight: number;
  showSourceMonitor: boolean;
  activeWorkspace: 'editing' | 'color' | 'audio' | 'ai-creative' | 'custom';
}
