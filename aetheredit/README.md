# AetherEdit

**AI-Powered Professional Video Editor**

A next-generation AI-native professional video editor that replicates the workflow of Final Cut Pro and Adobe Premiere Pro while integrating state-of-the-art AI capabilities.

## Features

### Professional NLE Layout
- Three-panel layout with resizable sections (Media Browser, Viewer, Timeline, Inspector)
- Multi-track timeline with ripple, roll, slip, slide edit modes
- Dual monitor setup (Source + Program)
- Full transport controls with timecode display
- Keyboard shortcuts matching industry standards

### AI-Powered Tools
- **Auto-Analysis**: Scene detection, object/people recognition, emotion detection
- **Smart Transcription**: Whisper-based transcription with speaker diarization
- **Generative AI**: Text-to-video, image-to-video insertion
- **Intelligent Editing**: Auto-cut to music, filler word removal, smart B-roll
- **AI Assistant**: Chat-based interface for complex editing tasks

### Technical Stack
- **Desktop Framework**: Tauri v2 (Rust core + web frontend)
- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **State Management**: Zustand + Immer
- **Timeline**: Custom Canvas-based renderer
- **Backend**: FastAPI + Python for AI processing

## Project Structure

```
aetheredit/
├── apps/
│   ├── desktop/          # Tauri + React application
│   │   ├── src/
│   │   │   ├── components/   # UI components
│   │   │   ├── store/        # Zustand state management
│   │   │   ├── types/        # TypeScript interfaces
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   └── utils/        # Utility functions
│   │   └── src-tauri/        # Rust backend
│   └── backend/          # Python AI microservice
├── packages/
│   ├── shared/           # Shared types and utilities
│   └── ai/               # AI model wrappers
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Rust >= 1.70.0 (for Tauri)
- Python >= 3.10 (for AI backend)
- FFmpeg (for media processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/aetheredit.git
   cd aetheredit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Tauri CLI**
   ```bash
   npm install -g @tauri-apps/cli
   ```

4. **Run in development mode**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run tauri build
   ```

## Development

### Running the Desktop App

```bash
cd apps/desktop
npm run dev
```

### Setting up the AI Backend

```bash
cd apps/backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| V | Selection Tool |
| B | Blade/Razor Tool |
| R | Ripple Edit Mode |
| N | Roll Edit Mode |
| U | Slip Edit Mode |
| Y | Slide Edit Mode |
| Z | Zoom Tool |
| H | Hand Tool |
| Space | Play/Pause |
| J | Reverse Playback |
| K | Stop |
| L | Forward Playback |
| I | Set In Point |
| O | Set Out Point |
| Cmd/Ctrl + S | Save Project |
| Cmd/Ctrl + E | Export |

## Roadmap

### Phase 1: Core Desktop Shell (Weeks 1-3) ✅
- [x] Project bootstrap & layout
- [x] Media Browser component
- [x] Viewer section with transport controls
- [x] Timeline foundation
- [x] Inspector panel
- [ ] File system integration

### Phase 2: Professional Editing Tools (Weeks 4-6)
- [ ] Full edit modes implementation
- [ ] Transitions & titles
- [ ] Audio mixer
- [ ] Proxy workflow

### Phase 3: AI Integration (Weeks 7-11)
- [ ] Backend AI pipeline
- [ ] Transcription & analysis
- [ ] Generative AI features
- [ ] AI chat assistant

### Phase 4: Performance & Polish (Weeks 12-15)
- [ ] GPU acceleration
- [ ] 4K/8K handling
- [ ] Export pipeline
- [ ] Documentation

## License

MIT License - See LICENSE file for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

Built with ❤️ using Tauri, React, and AI
