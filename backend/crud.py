from sqlalchemy.orm import Session
from models import Patient, Appointment
from schemas import PatientCreate, AppointmentCreate
from typing import List


def get_patient(db: Session, patient_id: int):
    return db.query(Patient).filter(Patient.id == patient_id).first()


def get_all_patients(db: Session):
    return db.query(Patient).all()


def create_patient(db: Session, patient: PatientCreate):
    db_patient = Patient(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient


def get_all_appointments(db: Session):
    return db.query(Appointment).all()


def get_appointments_for_patient(db: Session, patient_id: int):
    return db.query(Appointment).filter(Appointment.patient_id == patient_id).order_by(Appointment.date.desc()).all()


def create_appointment(db: Session, appointment: AppointmentCreate):
    db_appointment = Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment
