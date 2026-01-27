import os
from sqlalchemy import create_engine, inspect
from dotenv import load_dotenv

load_dotenv()

def check_user_columns():
    url = os.getenv("DATABASE_URL")
    engine = create_engine(url)
    inspector = inspect(engine)
    columns = inspector.get_columns("user")
    print(f"Columns in 'user' table:")
    for c in columns:
        print(f" - {c['name']}")

if __name__ == "__main__":
    check_user_columns()
