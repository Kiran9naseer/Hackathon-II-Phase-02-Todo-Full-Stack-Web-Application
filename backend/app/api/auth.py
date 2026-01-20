"""
Authentication API endpoints (FIXED).
"""

import logging
from datetime import datetime, timedelta, timezone
from typing import Optional
import uuid
import hashlib
from app.core.security import hash_password, verify_password

from fastapi import APIRouter, HTTPException, status, Request, Response
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from pydantic import BaseModel, EmailStr

from app.config import settings
from app.dependencies.auth import create_access_token, decode_token
from app.core.exceptions import UnauthorizedException

logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(tags=["Authentication"])

# ===================== MODELS =====================

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None

class AuthResponse(BaseModel):
    user: dict
    token: str
    expires_at: int

# ===================== AUTH ROUTES =====================

@router.post("/register", response_model=AuthResponse)
@limiter.limit("5/minute")
async def register(request: Request, data: RegisterRequest, response: Response):
    # Use SQL database for persistent storage
    from app.dependencies.database import Session
    from app.services.user_service import UserService
    
    db = Session()
    try:
        user_service = UserService(db)
        existing_user = user_service.get_by_email(data.email)
        
        if existing_user:
            raise HTTPException(status_code=409, detail="Email already exists")

        # Create new user in SQL DB
        user_id = uuid.uuid4()
        hashed_password = hash_password(data.password)
        user = user_service.create(user_id, data.email, hashed_password)
        
        logger.info(f"Created new persistent user for {data.email}")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Database error during registration: {e}")
        raise HTTPException(status_code=500, detail="Database error during registration")
    finally:
        db.close()

    expires_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES
    token = create_access_token(
        user_id=user.id,
        email=user.email,
        expires_delta=expires_minutes,
    )

    expires_at = int(
        (datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)).timestamp()
    )

    response.set_cookie(
        key="jwt_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False,  # IMPORTANT for localhost
        path="/",
        max_age=expires_minutes * 60,
    )

    return {
        "user": {
            "id": str(user.id),
            "email": user.email,
            "name": user.email.split("@")[0],
        },
        "token": token,
        "expires_at": expires_at,
    }


@router.post("/login", response_model=AuthResponse)
@limiter.limit("10/minute")
async def login(request: Request, data: LoginRequest, response: Response):
    from app.dependencies.database import Session
    from app.services.user_service import UserService
    
    db = Session()
    try:
        user_service = UserService(db)
        user = user_service.get_by_email(data.email)

        if not user or not verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        expires_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES
        token = create_access_token(
            user_id=user.id,
            email=user.email,
            expires_delta=expires_minutes,
        )

        expires_at = int(
            (datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)).timestamp()
        )

        response.set_cookie(
            key="jwt_token",
            value=token,
            httponly=True,
            samesite="lax",
            secure=False,
            path="/",
            max_age=expires_minutes * 60,
        )

        return {
            "user": {
                "id": str(user.id),
                "email": user.email,
                "name": user.email.split("@")[0],
            },
            "token": token,
            "expires_at": expires_at,
        }
    finally:
        db.close()


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("jwt_token", path="/")
    return {"message": "Logged out"}


@router.get("/session")
async def get_session(request: Request):
    # Try Cookie first
    token = request.cookies.get("jwt_token")

    # If no cookie, try Bearer Token in Authorization header
    if not token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]

    if not token:
        return JSONResponse(status_code=401, content={"session": None})

    try:
        from app.dependencies.auth import decode_token
        token_data = decode_token(token)

        return {
            "session": {
                "user": {
                    "id": str(token_data.user_id),
                    "email": token_data.email,
                },
                "token": token,  # Include token for frontend
                "expires_at": token_data.exp,
            }
        }

    except Exception as e:
        logger.error(f"Session error: {e}")
        return JSONResponse(status_code=401, content={"session": None})
