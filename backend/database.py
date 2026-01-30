import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")

CLIENT = AsyncIOMotorClient(MONGO_URL)
DB = CLIENT["incident_db"]

# Collections
incident_collection = DB["incidents"]