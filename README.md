# FoundIt - Campus Lost & Found 

FoundIt is an AI-powered lost and found platform designed for university campuses. It allows users to post lost and found items without needing a login, using AI to match descriptions and images.

## Features ✨

- **No Login Required**: Just drop the details and go.
- **AI Matching**: Automatically finds potential matches between lost and found items.
- **Visual First**: Heavy use of images and a vibrant UI
- **Mobile Friendly**: Fully responsive design.

## Tech Stack 🛠️

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: SQLite (with SQLAlchemy)
- **AI/ML**: Sentence Transformers (for text similarity), Pillow (image processing)

## Getting Started 🚀

### Backend
```bash
cd backend
python -m venv venv
# Activate venv (windows: venv\Scripts\activate, mac/linux: source venv/bin/activate)
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
