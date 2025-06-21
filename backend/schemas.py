from __future__ import annotations
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Literal
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


class ToothAreaBase(BaseModel):
    name: str  # e.g., "buccal", "lingual"
    treatment: Optional[str] = None  # e.g., "filling", "caries"
    condition: Optional[str] = None  # e.g., "healthy", "decayed"


class ToothAreaCreate(ToothAreaBase):
    name: Optional[str] = None


class ToothArea(ToothAreaBase):
    name: str  # changed from str to int, if your DB uses int IDs

    class Config:
        orm_mode = True


# ----------------------------------------------------
# Tooth Models (each tooth has multiple areas)
# ----------------------------------------------------

class ToothBase(BaseModel):
    id: int  # add id here, since your frontend sends it
    name: str  # e.g., "11"
    adult: bool  # True for adult tooth, False for child
    position: str  # e.g., "upper", "lower"
    type: str  # e.g., "incisor", "molar"
    treatments: Optional[List[str]] = []  # added treatments list to match frontend data
    conditions: Optional[List[str]] = []
    areas: List[ToothAreaBase]

class ToothCreate(ToothBase):
    id: Optional[int] = None
    areas: List[ToothAreaCreate]
    #treatments: Optional[List[str]] = []


class Tooth(ToothBase):
    areas: List[ToothArea]

    class Config:
        orm_mode = True


class DentalChartBase(BaseModel):
    patient_id: Optional[int] = None
    teeth: List[Tooth]


class DentalChartCreate(DentalChartBase):
    pass


class DentalChartUpdate(DentalChartBase):
    pass


class DentalChartOut(DentalChartBase):
    id: int

    class Config:
        orm_mode = True
