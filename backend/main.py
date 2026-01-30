from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import incidents, analytics

app = FastAPI(title="Smart Incident API")

# Allow React to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(incidents.router, prefix="/incidents", tags=["Incidents"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])

@app.get("/")
def root():
    return {"message": "Incident Platform API is running"}