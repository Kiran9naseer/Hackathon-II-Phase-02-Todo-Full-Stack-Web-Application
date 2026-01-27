import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

def count_raw():
    url = os.getenv("DATABASE_URL")
    engine = create_engine(url)
    with engine.connect() as conn:
        result = conn.execute(text('SELECT count(*) FROM "user"'))
        count = result.scalar()
        print(f"RAW USER COUNT: {count}")
        
        result = conn.execute(text('SELECT id, email FROM "user"'))
        for row in result:
            print(f"ID: {row[0]}, EMAIL: {row[1]}")

if __name__ == "__main__":
    count_raw()
