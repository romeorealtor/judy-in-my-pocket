"""
Agent Communication Protocol
Every agent instance must implement this contract to participate in the platform.
"""

AGENT_PROTOCOL = """
# Judy in My Pocket — Agent Communication Protocol v1.0

Every agent in the platform follows this contract.
All calls go to the central API at api.judyinmypocket.com

## 1. Heartbeat (every 5 minutes)
POST /api/agents/{agent_id}/heartbeat
{
  "status": "active|idle|stuck",
  "current_task": "Brief description of what the agent is doing",
  "last_completed": "Brief description of last completed task"
}

## 2. Event Log (every meaningful action)
POST /api/events
{
  "agent_id": "uuid",
  "event_type": "lead_received|task_started|task_completed|email_sent|showing_scheduled|...",
  "payload": { ...relevant data... },
  "transaction_id": "uuid or null"
}

## 3. Escalation (when stuck or needs attention)
POST /api/alerts
{
  "agent_id": "uuid",
  "transaction_id": "uuid or null",
  "severity": "info|warning|critical",
  "title": "Short description of the issue",
  "description": "Full context — what happened, what was tried, what is needed"
}

## 4. Task Completion
POST /api/agents/{agent_id}/tasks/{task_id}/complete
{
  "result": "Summary of what was accomplished",
  "next_action": "What should happen next (or null if done)"
}
"""
