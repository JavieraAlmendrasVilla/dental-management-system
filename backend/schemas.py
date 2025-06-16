from __future__ import annotations
from pydantic import BaseModel
from typing import List, Optional
from datetime import date


class AppointmentBase(BaseModel):
    patientName: str
    date: date
    time: str
    type: str
    dentist: str
    notes: Optional[str] = None
    completed: bool = False


class AppointmentCreate(AppointmentBase):
    patientId: int  # ✅ snake_case to match your backend


class Appointment(AppointmentBase):
    id: int
    patientName: str

    class Config:
        from_attributes = True


class PatientBase(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    date_of_birth: date
    gender: str
    insurance_provider: Optional[str] = None
    insurance_number: Optional[str] = None
    allergies: List[str]
    medical_conditions: List[str]
    medications: List[str]
    notes: Optional[str] = None
    registered_date: date


class PatientCreate(PatientBase):
    pass


class Patient(PatientBase):
    id: int
    appointments: List['Appointment'] = []

    class Config:
        from_attributes = True
