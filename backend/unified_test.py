import os
import sys
import uuid
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Add the current directory to sys.path
sys.path.append(os.getcwd())

load_dotenv()

def unified_test():
    url = os.getenv("DATABASE_URL")
    print(f"DATABASE_URL ends with: {url.split('@')[-1] if url else 'NONE'}")
    
    from app.dependencies.database import Session
    from app.models.user import User
    from app.core.security import hash_password
    
    db = Session()
    try:
        email = f"unified_{uuid.uuid4().hex[:6]}@test.com"
        print(f"Registering: {email}")
        
        user = User(
            id=uuid.uuid4(),
            email=email,
            hashed_password=hash_password("password123")
        )
        db.add(user)
        db.commit()
        print(f"Committed user: {user.id}")
        
        # Now query it back in the same script but new session
        db.close()
        
        db2 = Session()
        queried = db2.query(User).filter(User.email == email).first()
        if queried:
            print(f"VERIFIED: User {queried.email} found after commit.")
        else:
            print("FAILED: User not found after commit!")
        db2.close()
        
    except Exception as e:
        print(f"ERROR: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    unified_test()
