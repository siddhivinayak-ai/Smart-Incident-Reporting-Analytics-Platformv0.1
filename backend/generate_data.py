import asyncio
import random
from faker import Faker
from database import incident_collection
from datetime import datetime, timedelta

fake = Faker()

CATEGORIES = ["Delay", "Equipment Failure", "System Outage", "Safety Issue", "Human Error", "Other"]
LOCATIONS = ["Warehouse A", "Plant B", "Logistics Hub C", "HQ", "Distribution Center North"]

def generate_severity(description, category):
    # Replicating logic here for bulk insert consistency
    desc_lower = description.lower()
    high_keywords = ["fire", "shutdown", "critical", "accident", "loss"]
    if any(word in desc_lower for word in high_keywords):
        return "High"
    if category in ["Delay", "Equipment Failure"]:
        return "Medium"
    return "Low"

async def generate_incidents(n=10000):
    print(f"Generating {n} records...")
    batch = []
    
    for _ in range(n):
        cat = random.choice(CATEGORIES)
        # Inject keywords occasionally to trigger High severity
        if random.random() < 0.1:
            desc = f"CRITICAL: {fake.sentence()} caused a huge loss."
        else:
            desc = fake.sentence()

        incident_date = fake.date_time_between(start_date="-1y", end_date="now")
        
        doc = {
            "title": fake.catch_phrase(),
            "description": desc,
            "category": cat,
            "location": random.choice(LOCATIONS),
            "reported_by": fake.name(),
            "incident_date": incident_date,
            "created_at": datetime.utcnow(),
            "severity": generate_severity(desc, cat)
        }
        batch.append(doc)

        if len(batch) >= 1000:
            await incident_collection.insert_many(batch)
            print(f"Inserted batch of 1000...")
            batch = []

    if batch:
        await incident_collection.insert_many(batch)
    
    print("Data Generation Complete!")

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(generate_incidents(15000))