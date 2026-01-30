from fastapi import APIRouter, HTTPException
from database import incident_collection
from schemas import IncidentCreate, IncidentResponse
from datetime import datetime
from bson import ObjectId

router = APIRouter()

def calculate_severity(description: str, category: str) -> str:
    """Rule-based Severity Logic"""
    desc_lower = description.lower()
    high_keywords = ["fire", "shutdown", "critical", "accident", "loss"]
    
    if any(word in desc_lower for word in high_keywords):
        return "High"
    if category in ["Delay", "Equipment Failure"]:
        return "Medium"
    return "Low"

@router.post("/", response_model=IncidentResponse)
async def create_incident(incident: IncidentCreate):
    incident_dict = incident.dict()
    
    # Auto-generate fields
    incident_dict["severity"] = calculate_severity(incident.description, incident.category)
    incident_dict["created_at"] = datetime.utcnow()
    
    # Insert into DB
    result = await incident_collection.insert_one(incident_dict)
    
    # Return created object with new ID
    incident_dict["_id"] = str(result.inserted_id)
    return incident_dict

@router.get("/", response_model=list[IncidentResponse])
async def get_incidents(limit: int = 100):
    incidents = []
    cursor = incident_collection.find().sort("incident_date", -1).limit(limit)
    async for doc in cursor:
        doc["_id"] = str(doc["_id"]) # Convert ObjectId to string
        incidents.append(doc)
    return incidents