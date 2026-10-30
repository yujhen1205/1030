from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey, text
from database import Base

class Registration(Base):
    __tablename__ = "registrations"

    registration_id = Column(Integer, primary_key=True, index=True)
    activity_id = Column(Integer, ForeignKey("activities.activity_id"), nullable=False)
    name = Column(String(50), nullable=False)
    phone = Column(String(20), nullable=False)
    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))