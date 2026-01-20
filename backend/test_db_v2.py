import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Add the current directory to sys.path
sys.path.append(os.getcwd())

load_dotenv()

def test_neondb():
    # Try different connection strings
    db_urls = [
        os.getenv("DATABASE_URL"),
        # Try without channel_binding
        os.getenv("DATABASE_URL").replace("&channel_binding=require", "") if os.getenv("DATABASE_URL") else None
    ]
    
    for url in db_urls:
        if not url:
            continue
            
        print(f"\n--- Testing URL: {url} ---")
        try:
            # Use pool_pre_ping to check if connection is alive
            engine = create_engine(url, echo=True)
            with engine.connect() as conn:
                result = conn.execute(text("SELECT 1"))
                print(f"SUCCESS: {result.fetchone()}")
                return True
        except Exception as e:
            print(f"FAILED: {e}")
            import traceback
            # traceback.print_exc()
            
    return False

if __name__ == "__main__":
    if not test_neondb():
        print("\nAll connection attempts failed.")
        sys.exit(1)
