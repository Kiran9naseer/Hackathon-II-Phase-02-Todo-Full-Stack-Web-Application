import os
import bcrypt
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

def check_specific_user(email, plain_password):
    url = os.getenv("DATABASE_URL")
    engine = create_engine(url)
    with engine.connect() as conn:
        print(f"--- CHECKING USER: {email} ---")
        res = conn.execute(
            text('SELECT id, email, hashed_password FROM "user" WHERE email = :e'),
            {"e": email.lower().strip()}
        )
        user = res.fetchone()
        
        if not user:
            print("STATUS: USER NOT FOUND IN DATABASE")
            return
        
        user_id, email, hashed = user
        print(f"ID: {user_id}")
        print(f"EMAIL: {email}")
        print(f"HASH LEN: {len(hashed)}")
        
        try:
            # Try plain match
            match = bcrypt.checkpw(plain_password.encode("utf-8"), hashed.encode("utf-8"))
            print(f"PASSWORD MATCH: {match}")
            
            # If false, maybe it was hashed differently?
            # bcrypt hashes usually start with $2b$ or $2a$
            print(f"HASH PREFIX: {hashed[:4]}")
            
        except Exception as e:
            print(f"BYCRYPT ERROR: {e}")

if __name__ == "__main__":
    check_specific_user("kirannaseer900@gmail.com", "12345678")
