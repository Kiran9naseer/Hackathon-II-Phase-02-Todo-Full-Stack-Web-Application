import requests
import uuid

def simulate_register():
    url = "http://127.0.0.1:8000/api/v1/auth/register"
    payload = {
        "email": f"sim_{uuid.uuid4().hex[:6]}@test.com",
        "password": "Password123!",
        "name": "Simulated User"
    }
    
    print(f"Sending request to {url}...")
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    simulate_register()
