import os
import uuid
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

def raw_test():
    url = os.getenv("DATABASE_URL")
    print(f"Connecting to: {url.split('@')[-1] if url else 'NONE'}")
    try:
        engine = create_engine(url)
        with engine.connect() as conn:
            email = f"raw_{uuid.uuid4().hex[:6]}@test.com"
            uid = str(uuid.uuid4())
            print(f"Inserting: {email}")
            
            # Using raw SQL to avoid any ORM magic/issues
            conn.execute(
                text("INSERT INTO \"user\" (id, email, hashed_password) VALUES (:id, :email, :password)"),
                {"id": uid, "email": email, "password": "dummy_password_hash"}
            )
            conn.commit()
            print(f"INSERT SUCCESS: {uid}")
            
            res = conn.execute(text("SELECT count(*) FROM \"user\" WHERE email = :email"), {"email": email})
            count = res.fetchone()[0]
            print(f"Count for {email}: {count}")
            
    except Exception as e:
        print(f"RAW INSERT FAILED: {e}")

if __name__ == "__main__":
    raw_test()
