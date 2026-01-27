import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

def fix_emails():
    url = os.getenv("DATABASE_URL")
    engine = create_engine(url)
    with engine.connect() as conn:
        print("Fetching users...")
        users = conn.execute(text('SELECT id, email FROM "user"')).fetchall()
        
        for user_id, email in users:
            new_email = email.strip().lower()
            if email != new_email:
                print(f"Updating: '{email}' -> '{new_email}'")
                try:
                    conn.execute(
                        text('UPDATE "user" SET email = :new_email WHERE id = :user_id'),
                        {"new_email": new_email, "user_id": user_id}
                    )
                    conn.commit()
                except Exception as e:
                    print(f"FAILED to update {email}: {e}")
        print("Total users in DB: ", len(users))

if __name__ == "__main__":
    fix_emails()
