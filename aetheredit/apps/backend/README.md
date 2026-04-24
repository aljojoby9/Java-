# Python AI Backend for AetherEdit

## Setup

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- `POST /analyze` - Analyze media file (scene detection, transcription, tagging)
- `POST /transcribe` - Transcribe audio to text
- `POST /generate` - Generate video from text/image prompt
- `POST /enhance` - Enhance video quality (super-resolution, stabilization, etc.)
- `GET /jobs/{job_id}` - Get job status and results
