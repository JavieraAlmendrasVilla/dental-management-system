from sqlalchemy import Column, Integer, String, Date, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    address = Column(String)
    date_of_birth = Column(Date)
    gender = Column(String)
    insurance_provider = Column(String)
    insurance_number = Column(String)
    allergies = Column(Text)
    medical_conditions = Column(Text)
    medications = Column(Text)
    notes = Column(Text)
    registered_date = Column(Date)

    appointments = relationship("Appointment", back_populates="patient")


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patientId = Column(Integer, ForeignKey("patients.id"))
    patientName = Column(String)
    date = Column(Date)
    time = Column(String)
    type = Column(String)
    dentist = Column(String)
    notes = Column(Text)
    completed = Column(Boolean, default=False)

    patient = relationship("Patient", back_populates="appointments")
