import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

def check_db():
    url = os.getenv("DATABASE_URL")
    engine = create_engine(url)
    with engine.connect() as conn:
        print("--- DATABASE HEALTH CHECK ---")
        
        # 1. Total Count
        res = conn.execute(text('SELECT count(*) FROM "user"'))
        print(f"TOTAL USERS: {res.scalar()}")
        
        # 2. Check for empty passwords
        res = conn.execute(text('SELECT count(*) FROM "user" WHERE hashed_password IS NULL OR hashed_password = \'\''))
        print(f"EMPTY PASSWORDS: {res.scalar()}")
        
        # 3. Check for non-lowercase emails
        res = conn.execute(text('SELECT count(*) FROM "user" WHERE email != LOWER(email)'))
        print(f"NON-LOWERCASE EMAILS: {res.scalar()}")
        
        # 4. Check for emails with spaces
        res = conn.execute(text('SELECT count(*) FROM "user" WHERE email LIKE \' %\' OR email LIKE \'% \''))
        print(f"EMAILS WITH SPACES: {res.scalar()}")
        
        # 5. List all users (Summary)
        print("\n--- USER LIST ---")
        res = conn.execute(text('SELECT id, email, length(hashed_password) FROM "user"'))
        for row in res:
            print(f"EMAIL: {row[1]} | PASS_LEN: {row[2]}")

if __name__ == "__main__":
    check_db()
