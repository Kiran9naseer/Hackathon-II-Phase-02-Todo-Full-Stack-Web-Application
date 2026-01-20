import os
import sys
from sqlmodel import SQLModel, create_engine
from dotenv import load_dotenv

# Add the current directory to sys.path
sys.path.append(os.getcwd())

load_dotenv()

def test_init_db():
    url = os.getenv("DATABASE_URL")
    print(f"Testing init_db with URL: {url}")
    
    try:
        from app.models import Base
        engine = create_engine(url, echo=True)
        print("Attempting to create all tables...")
        Base.metadata.create_all(bind=engine)
        print("Tables initialized successfully!")
        return True
    except Exception as e:
        print(f"FAILED to initialize tables: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    if not test_init_db():
        sys.exit(1)
