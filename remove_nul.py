import os

# Use the Windows UNC prefix to handle reserved names and long paths
path = r"\\?\C:\Users\User\Documents\GitHub\Hackathon-II-Phase-02-Todo-Full-Stack-Web-Application\frontend\nul"

try:
    if os.path.exists(path):
        os.remove(path)
        print(f"Successfully removed {path}")
    else:
        print(f"File {path} does not exist")
except Exception as e:
    print(f"Error removing {path}: {e}")
