from passlib.context import CryptContext

try:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    p = "password"
    h = pwd_context.hash(p)
    print(f"Hashed: {h}")
    v = pwd_context.verify(p, h)
    print(f"Verified: {v}")
    
    p_long = "a" * 71
    h_long = pwd_context.hash(p_long)
    print(f"Hashed 71 chars: {h_long}")
    
    p_too_long = "a" * 73
    try:
        h_too_long = pwd_context.hash(p_too_long)
        print(f"Hashed 73 chars: {h_too_long}")
    except Exception as e:
        print(f"Expected failure for 73 chars: {e}")
except Exception as e:
    print(f"Failure: {e}")
    import traceback
    traceback.print_exc()
