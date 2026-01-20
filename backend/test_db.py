import sys
import os

# Add the current directory to sys.path to import app
sys.path.append(os.getcwd())

from app.dependencies.database import engine
from sqlalchemy import text

def test_connection():
    try:
        print("Attempting to connect to database...")
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print(f"Connection successful! Result: {result.fetchone()}")
    except Exception as e:
        print(f"Connection failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_connection()
