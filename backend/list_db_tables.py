import os
from sqlalchemy import create_engine, inspect
from dotenv import load_dotenv

load_dotenv()

def list_tables():
    url = os.getenv("DATABASE_URL")
    try:
        engine = create_engine(url)
        inspector = inspect(engine)
        for table in inspector.get_table_names():
            columns = inspector.get_columns(table)
            print(f"TABLE: {table}")
            print(f"COLUMNS: {[c['name'] for c in columns]}")
            
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    list_tables()
