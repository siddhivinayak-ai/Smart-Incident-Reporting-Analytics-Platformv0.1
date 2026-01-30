from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# Base schema (shared fields)
class IncidentBase(BaseModel):
    title: str
    description: str
    category: str  # Delay, Equipment Failure, etc.
    location: str
    reported_by: str
    incident_date: datetime

# Schema for creating an incident (Incoming Data)
class IncidentCreate(IncidentBase):
    pass

# Schema for reading an incident (Outgoing Data)
class IncidentResponse(IncidentBase):
    id: str = Field(..., alias="_id")
    severity: str
    created_at: datetime

    class Config:
        # Allows Pydantic to work with MongoDB ObjectId
        populate_by_name = True 
        json_encoders = {datetime: lambda v: v.isoformat()}