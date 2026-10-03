# Judy in My Pocket 🏠

> AI-powered real estate agent operations platform — built by Romeo Santos III

## What Is This?

Judy in My Pocket is the operating system for a modern AI-powered real estate team. Every agent on the team gets their own AI orchestrator. Every transaction, every marketing campaign, every lead — managed, tracked, and escalated automatically.

This is not a tool. It is an **operating system for a real estate organization.**

---

## Architecture Overview

```
ROMEO — Chief of Staff (Hermes)
│  Full visibility. Commands everything.
│
├── TRANSACTION CENTRAL AGENT
│   └── Per-Agent Transaction Sub-Agents (1 per agent)
│
├── MASTER MARKETING AGENT
│   ├── Romeo Sales Marketing Agent
│   ├── Romeo Recruiting Marketing Agent
│   └── Per-Agent Marketing Agents
│
└── PER-AGENT ORCHESTRATORS (Agent Clones)
    Each manages one agent's full business
```

---

## Project Structure

```
judy-in-my-pocket/
├── backend/          # FastAPI — REST API + WebSocket server (Railway)
├── dashboard/        # Next.js — Romeo's command center (Netlify)
├── mobile/           # React Native — The "Orgo" app agents use
├── agents/           # Hermes agent configs and templates
├── integrations/     # Connector layer for all external tools
├── infrastructure/   # Railway configs, Docker, CI/CD
├── docs/             # Architecture decisions, integration specs
└── scripts/          # Utility and deployment scripts
```

---

## Integration Categories

| Tier | Category | Tools |
|------|----------|-------|
| 1 — Core | CRM | KW Command, Follow Up Boss |
| 1 — Core | Transaction | Lone Wolf, Dotloop |
| 1 — Core | E-Signature | DocuSign, PandaDocs |
| 1 — Core | MLS/CMA | Bright MLS, RPR, Cloud CMA |
| 2 — Standard | Social | Facebook, Instagram, YouTube |
| 2 — Standard | Leads | Zillow, Realtor.com, Homes.com |
| 2 — Standard | Email/Cal | Gmail, Google Calendar, Outlook |
| 2 — Standard | Scheduling | Calendly, Acuity |
| 3 — Extended | Advertising | Google Ads, Facebook Ads |
| 3 — Extended | Accounting | QuickBooks, Wave |
| 3 — Extended | Websites | Luxury Presence, Real Geeks |

---

## Tech Stack

| Layer | Technology | Host |
|-------|-----------|------|
| Database | PostgreSQL | Railway |
| Cache/Pub-Sub | Redis | Railway |
| API Server | FastAPI (Python) | Railway |
| Dashboard | Next.js + Tailwind | Netlify |
| Mobile App | React Native | App Store / Play Store |
| Agent Runtime | Hermes | Railway |
| Auth | Google OAuth 2.0 | — |
| CI/CD | GitHub Actions | — |

---

## Railway Project

- **Project:** judy-in-my-pocket
- **Project ID:** 7faa9566-515a-4736-b36b-a5d63bbd310a
- **Workspace:** romeorealtor's Projects

---

## Getting Started (Development)

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Dashboard
cd dashboard
npm install
npm run dev

# Mobile
cd mobile
npm install
npx expo start
```

---

## Build Phases

- **Phase 1** (Weeks 1-2): Database, API, basic dashboard, connect existing automations
- **Phase 2** (Weeks 3-5): Transaction Central Agent, first agent clone pilot
- **Phase 3** (Weeks 6-9): Marketing agent hierarchy
- **Phase 4** (Ongoing): Scale to 300+ agents, predictive alerts, self-healing

---

*Built with Hermes AI — Romeo Santos III, October 2026*
