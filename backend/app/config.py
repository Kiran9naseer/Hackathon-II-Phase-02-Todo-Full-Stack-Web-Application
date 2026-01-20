"""
Configuration module for the Todo Backend Application.

Loads settings from environment variables using Pydantic Settings.
"""
import os
from functools import lru_cache
from typing import Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Database configuration
    DATABASE_URL: str = (
        "postgresql://neondb_owner:npg_3bWDrjmIqat7@ep-lucky-bush-ah80vgjx-pooler.c-3.us-east-1.aws.neon.tech/neondb?"
        "sslmode=require&channel_binding=require"
    )

    # Authentication configuration
    SECRET_KEY: str = "your-jwt-secret-key-minimum-32-characters-long"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Server configuration
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    DEBUG: bool = False

    class Config:
        """Pydantic configuration."""
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.

    Using lru_cache ensures that settings are only loaded once
    and reused across all imports.

    Returns:
        Settings: Application settings singleton.
    """
    return Settings()


# Global settings instance
settings = get_settings()
