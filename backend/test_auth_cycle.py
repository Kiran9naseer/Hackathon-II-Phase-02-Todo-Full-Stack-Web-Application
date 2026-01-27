import requests
import uuid

def test_full_cycle():
    base_url = "http://127.0.0.1:8000/api/v1/auth"
    email = f"test_{uuid.uuid4().hex[:6]}@example.com"
    password = "SecurePassword123!"
    
    print(f"--- TESTING WITH: {email} / {password} ---")
    
    # 1. Register
    print("\n1. Registering...")
    reg_payload = {"email": email, "password": password}
    try:
        resp = requests.post(f"{base_url}/register", json=reg_payload)
        print(f"RES: {resp.status_code}, BODY: {resp.text}")
        if resp.status_code != 200:
            return
    except Exception as e:
        print(f"REG ERROR: {e}")
        return

    # 2. Login
    print("\n2. Logging in...")
    login_payload = {"email": email, "password": password}
    try:
        resp = requests.post(f"{base_url}/login", json=login_payload)
        print(f"LOGIN RES: {resp.status_code}, BODY: {resp.text}")
    except Exception as e:
        print(f"LOGIN ERROR: {e}")

if __name__ == "__main__":
    test_full_cycle()
