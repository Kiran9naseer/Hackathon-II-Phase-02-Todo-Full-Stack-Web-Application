import os
import bcrypt
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

def ensure_user():
    email = "kirannaseer900@gmail.com"
    password = "12345678"
    
    url = os.getenv("DATABASE_URL")
    engine = create_engine(url)
    with engine.connect() as conn:
        print(f"--- ENSURING USER: {email} ---")
        
        # Check if exists
        res = conn.execute(
            text('SELECT id FROM "user" WHERE email = :e'),
            {"e": email}
        )
        user = res.fetchone()
        
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")
        
        if user:
            print(f"User exists (ID: {user[0]}). Updating password...")
            conn.execute(
                text('UPDATE "user" SET hashed_password = :h WHERE id = :i'),
                {"h": hashed, "i": user[0]}
            )
            print("Password updated successfully.")
        else:
            print("User does not exist. Creating user...")
            from uuid import uuid4
            conn.execute(
                text('INSERT INTO "user" (id, email, hashed_password) VALUES (:i, :e, :h)'),
                {"i": str(uuid4()), "e": email, "h": hashed}
            )
            print("User created successfully.")
            
        conn.commit()
        print("Done.")

if __name__ == "__main__":
    ensure_user()
