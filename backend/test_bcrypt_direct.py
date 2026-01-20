import bcrypt

try:
    password = b"password"
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password, salt)
    print(f"Hashed: {hashed}")
    
    verified = bcrypt.checkpw(password, hashed)
    print(f"Verified: {verified}")
    
    # Try with a string that is 71 chars
    long_p = b"a" * 71
    hashed_long = bcrypt.hashpw(long_p, salt)
    print("Hashed 71 chars")
    
    # Try with 73 chars
    try:
        too_long_p = b"a" * 73
        hashed_too_long = bcrypt.hashpw(too_long_p, salt)
        print("Hashed 73 chars (successfully?!)")
    except ValueError as e:
        print(f"Caught expected error for 73 chars: {e}")
        
except Exception as e:
    print(f"General failure: {e}")
    import traceback
    traceback.print_exc()
