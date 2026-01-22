# FoundIt MVP - Free Tier Deployment Guide

This guide explains how to deploy the FoundIt MVP for free using **Render** (Backend) and **Vercel** (Frontend).

## 1. Backend Deployment (Render.com)

Render offers a free tier for web services (spins down after inactivity) and static sites.

### Steps:
1. **Push Code to GitHub**: Ensure your project is on GitHub.
2. **Create New Web Service**:
    - Go to Dashboard -> New -> Web Service.
    - Connect your GitHub repo.
3. **Configure**:
    - **Root Directory**: `backend`
    - **Runtime**: `Python 3`
    - **Build Command**: `pip install -r requirements.txt`
    - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 10000`
4. **Environment Variables**:
    - Add `PYTHON_VERSION`: `3.9.0` (or compatible)
5. **Deploy**: Click "Create Web Service".
    - **Note**: The free tier takes about 50s to spin up on first request.

**Important**: For the MVP, we are using `SQLite`. On Render's free tier, the disk is ephemeral, meaning *database data and uploaded images will be lost on restart/redeploy*.
- **Fix for Prod**: Use Render's managed PostgreSQL (Free for 90 days or cheap tile) and AWS S3 for images.
- **For Demo**: It's fine, but tell users data resets.

## 2. Frontend Deployment (Vercel)

Vercel is the creators of Next.js and offers the best free tier.

### Steps:
1. **Import Project**:
    - Go to Vercel Dashboard -> Add New -> Project.
    - Select your GitHub repo.
2. **Configure**:
    - **Framework Preset**: Next.js (Auto-detected).
    - **Root Directory**: `frontend`.
3. **Environment Variables**:
    - `NEXT_PUBLIC_API_URL`: The URL of your Render backend (e.g., `https://foundit-backend.onrender.com`).
4. **Deploy**: Click "Deploy".

## 3. Verify Connection
1. Open your Vercel URL.
2. Try reporting a lost item.
3. If it fails, check the Console (F12) for CORS errors.
    - *Fix*: Update `main.py` in Backend to add `CORSMiddleware` with the Vercel domain.

```python
# In main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-vercel-app.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```
