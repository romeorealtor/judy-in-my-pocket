from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Judy in My Pocket — API",
    description="AI-powered real estate agent operations platform",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok", "platform": "judy-in-my-pocket"}

@app.get("/")
async def root():
    return {"message": "Judy in My Pocket API", "version": "0.1.0"}

# Routes will be registered here as they are built
# from app.api.routes import agents, transactions, marketing, alerts
# app.include_router(agents.router, prefix="/api/agents")
# app.include_router(transactions.router, prefix="/api/transactions")
# app.include_router(marketing.router, prefix="/api/marketing")
# app.include_router(alerts.router, prefix="/api/alerts")
