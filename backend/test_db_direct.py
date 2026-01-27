import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

def test_conn():
    url = os.getenv("DATABASE_URL")
    print(f"Testing connection to: {url.split('@')[-1] if url else 'NONE'}")
    try:
        engine = create_engine(url)
        with engine.connect() as conn:
            res = conn.execute(text("SELECT version()"))
            print(f"CONNECTED! Version: {res.fetchone()[0]}")
            
            res = conn.execute(text("SELECT count(*) FROM \"user\""))
            print(f"Users in 'user' table: {res.fetchone()[0]}")
    except Exception as e:
        print(f"CONNECTION FAILED: {e}")

if __name__ == "__main__":
    test_conn()
