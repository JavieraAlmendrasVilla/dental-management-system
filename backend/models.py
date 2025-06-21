from sqlalchemy import Column, Integer, String, Date, Boolean, Text, ForeignKey, JSON, Float
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


class Doctors(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    specialization = Column(String, nullable=False)
    phone = Column(String, nullable=True)

    # For schedule, use a JSON column to store dicts/lists like start, end, daysOff
    schedule = Column(JSON, nullable=True, default={
        "start": "09:00",
        "end": "17:00",
        "daysOff": [0, 6]  # 0=Sunday, 6=Saturday typically
    })


class TreatmentModel(Base):
    __tablename__ = "treatments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    category = Column(String, index=True, nullable=False)
    duration = Column(Integer, nullable=False)  # duration in minutes
    cost = Column(Float, nullable=False)
    description = Column(String, nullable=True)


class DentalChart(Base):
    __tablename__ = "dental_charts"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=True)  # Optional
    patient_name = Column(String, ForeignKey("patients.name"), nullable=True)  # Optional
    teeth = Column(JSON, nullable=False)  # Full list of teeth from React


class Tooth(Base):
    __tablename__ = "teeth"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    adult = Column(Boolean, default=True)
    position = Column(String)  # e.g., 'upper', 'lower', 'upper-left', etc.
    type = Column(String)  # e.g., 'molar', 'premolar', 'incisor', etc.

    treatments = Column(JSON, default=list)  # Store treatments as JSON array

    areas = relationship(
        "ToothArea",
        back_populates="tooth",
        cascade="all, delete-orphan",
        passive_deletes=True
    )


class ToothArea(Base):
    __tablename__ = "tooth_areas"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)  # e.g., 'lingual', 'mesial', etc.
    treatment = Column(String, nullable=True)
    condition = Column(String, nullable=True)

    tooth_id = Column(Integer, ForeignKey("teeth.id", ondelete="CASCADE"))
    tooth = relationship("Tooth", back_populates="areas")
