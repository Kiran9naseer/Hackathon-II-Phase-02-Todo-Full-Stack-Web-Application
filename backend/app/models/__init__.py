"""Models module initialization."""

from sqlmodel import SQLModel

from app.models.user import User
from app.models.task import Task
from app.models.category import Category

# Export Base for use in database initialization
Base = SQLModel

__all__ = ["User", "Task", "Category", "Base"]
