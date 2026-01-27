import bcrypt

def test_bcrypt():
    password = "MyTestPassword123!"
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    
    print(f"PASSWORD: {password}")
    print(f"SALT: {salt}")
    print(f"HASHED: {hashed.decode('utf-8')}")
    
    match = bcrypt.checkpw(password.encode("utf-8"), hashed)
    print(f"MATCH: {match}")

if __name__ == "__main__":
    test_bcrypt()
