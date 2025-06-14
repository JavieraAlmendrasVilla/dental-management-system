from sqlalchemy import Column, Integer, String, Date, Time
from database import Base


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String, index=True)
    patient_name = Column(String)
    date = Column(String)
    time = Column(String)
    duration = Column(Integer)
    type = Column(String)
    dentist = Column(String)
    notes = Column(String)
    status = Column(String)
