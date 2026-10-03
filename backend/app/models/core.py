"""
Core database models for the Judy in My Pocket platform.
These define the schema for all agents, transactions, events, and alerts.
"""
from sqlalchemy import Column, String, DateTime, JSON, ForeignKey, Enum, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
from datetime import datetime
import uuid
import enum

Base = declarative_base()


class AgentStatus(str, enum.Enum):
    ACTIVE = "active"
    IDLE = "idle"
    STUCK = "stuck"
    OFFLINE = "offline"


class AgentRole(str, enum.Enum):
    CHIEF_OF_STAFF = "chief_of_staff"
    TRANSACTION_CENTRAL = "transaction_central"
    MARKETING_MASTER = "marketing_master"
    PER_AGENT_ORCHESTRATOR = "per_agent_orchestrator"
    PER_AGENT_MARKETING = "per_agent_marketing"
    BUILDER = "builder"
    QA = "qa"


class TransactionStatus(str, enum.Enum):
    INCOMING = "incoming"
    UNDER_CONTRACT = "under_contract"
    IN_PROGRESS = "in_progress"
    PENDING_CLOSE = "pending_close"
    CLOSED = "closed"
    DEAD = "dead"


class AlertSeverity(str, enum.Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"


class Agent(Base):
    """Registry of all deployed AI agents."""
    __tablename__ = "agents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    role = Column(Enum(AgentRole), nullable=False)
    status = Column(Enum(AgentStatus), default=AgentStatus.IDLE)
    assigned_to = Column(String(255))  # Real estate agent name/id
    hermes_profile = Column(String(255))  # Hermes profile name
    current_task = Column(Text)
    last_heartbeat = Column(DateTime)
    metadata = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Transaction(Base):
    """All active and historical transactions across all agents."""
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_id = Column(UUID(as_uuid=True), ForeignKey("agents.id"))
    address = Column(String(500), nullable=False)
    client_name = Column(String(255))
    client_email = Column(String(255))
    client_phone = Column(String(50))
    status = Column(Enum(TransactionStatus), default=TransactionStatus.INCOMING)
    transaction_type = Column(String(50))  # buyer, seller, both
    contract_price = Column(String(50))
    close_date = Column(DateTime)
    milestones = Column(JSON, default={})  # Key milestone timestamps
    notes = Column(Text)
    external_ids = Column(JSON, default={})  # IDs in Lone Wolf, Dotloop, etc.
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class AgentEvent(Base):
    """Append-only audit log of everything every agent does."""
    __tablename__ = "agent_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_id = Column(UUID(as_uuid=True), ForeignKey("agents.id"))
    event_type = Column(String(100), nullable=False)  # heartbeat, task_complete, escalation, etc.
    payload = Column(JSON, default={})
    transaction_id = Column(UUID(as_uuid=True), ForeignKey("transactions.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Alert(Base):
    """Escalations, stuck conditions, and errors needing Romeo's attention."""
    __tablename__ = "alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_id = Column(UUID(as_uuid=True), ForeignKey("agents.id"))
    transaction_id = Column(UUID(as_uuid=True), ForeignKey("transactions.id"), nullable=True)
    severity = Column(Enum(AlertSeverity), default=AlertSeverity.WARNING)
    title = Column(String(500), nullable=False)
    description = Column(Text)
    resolved = Column(String(10), default="false")
    resolved_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class IntegrationCredential(Base):
    """Encrypted credential vault — one row per agent per tool."""
    __tablename__ = "integration_credentials"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_id = Column(UUID(as_uuid=True), ForeignKey("agents.id"))
    tool_slug = Column(String(100), nullable=False)  # command, lone_wolf, docusign, etc.
    credential_type = Column(String(50))  # oauth_token, api_key, username_password
    encrypted_data = Column(Text)  # AES-256 encrypted JSON blob
    expires_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
