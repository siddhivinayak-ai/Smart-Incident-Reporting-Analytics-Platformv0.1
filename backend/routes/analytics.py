from fastapi import APIRouter
from database import incident_collection

router = APIRouter()

@router.get("/summary")
async def get_summary():
    count = await incident_collection.count_documents({})
    return {"total_incidents": count}

@router.get("/by-category")
async def get_by_category():
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}}
    ]
    result = await incident_collection.aggregate(pipeline).to_list(length=None)
    return [{"name": r["_id"], "value": r["count"]} for r in result]

@router.get("/by-severity")
async def get_by_severity():
    pipeline = [
        {"$group": {"_id": "$severity", "count": {"$sum": 1}}}
    ]
    result = await incident_collection.aggregate(pipeline).to_list(length=None)
    return [{"name": r["_id"], "value": r["count"]} for r in result]

@router.get("/time-series")
async def get_time_series():
    # Group by YYYY-MM-DD
    pipeline = [
        {
            "$group": {
                "_id": {
                    "$dateToString": {"format": "%Y-%m-%d", "date": "$incident_date"}
                },
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id": 1}} # Sort by date ascending
    ]
    result = await incident_collection.aggregate(pipeline).to_list(length=None)
    return [{"date": r["_id"], "count": r["count"]} for r in result]