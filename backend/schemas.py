from __future__ import annotations
from pydantic import BaseModel, EmailStr
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


class Schedule(BaseModel):
    start: str  # e.g. "09:00"
    end: str  # e.g. "17:00"
    daysOff: List[int]  # e.g. [0, 6] for Sunday and Saturday


class DoctorBase(BaseModel):
    name: str
    email: EmailStr
    specialization: str
    phone: Optional[str] = None
    schedule: Optional[Schedule] = Schedule(start="09:00", end="17:00", daysOff=[0, 6])


class DoctorCreate(DoctorBase):
    pass


class Doctor(DoctorBase):
    id: int

    class Config:
        from_attributes = True


class TreatmentBase(BaseModel):
    name: str
    category: str
    duration: int
    cost: float
    description: str | None = None


class TreatmentCreate(TreatmentBase):
    pass


class Treatment(TreatmentBase):
    id: int

    class Config:
        orm_mode = True
