import os
import sys
from dotenv import load_dotenv

# Add the current directory to sys.path
sys.path.append(os.getcwd())

load_dotenv()

def count_users():
    from app.dependencies.database import Session
    from app.models.user import User
    from sqlalchemy import select, func
    
    db = Session()
    try:
        count = db.query(User).count()
        print(f"Total users in database: {count}")
        
        users = db.query(User).limit(5).all()
        for u in users:
            print(f"User: {u.email} (ID: {u.id})")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    count_users()
