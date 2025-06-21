from __future__ import annotations

from sqlalchemy.orm import Session
from models import Patient as PatientModel, Appointment, Doctors as DoctorModel
from schemas import PatientCreate, AppointmentCreate, Patient as PatientSchema, DoctorCreate, Doctor
from models import Tooth, ToothArea
from schemas import ToothCreate
import json
import schemas
import models


def normalize_list_field(value):
    if not value:
        return []
    if isinstance(value, list):
        # Remove empty strings or whitespace-only strings
        cleaned = [item for item in value if item and item.strip()]
        return cleaned
    return []


def patient_to_dict(patient: PatientModel):
    data = patient.__dict__.copy()
    data.pop('_sa_instance_state', None)
    for field in ['allergies', 'medical_conditions', 'medications']:
        raw_value = data.get(field)
        if raw_value:
            try:
                loaded = json.loads(raw_value)
                data[field] = normalize_list_field(loaded)
            except (json.JSONDecodeError, TypeError):
                data[field] = []
        else:
            data[field] = []
    return data


def get_patient(db: Session, patient_id: int) -> PatientSchema | None:
    patient = db.query(PatientModel).filter(PatientModel.id == patient_id).first()
    if patient:
        data = patient_to_dict(patient)
        return PatientSchema(**data)
    return None


def create_patient(db: Session, patient: PatientCreate) -> PatientModel:
    existing_patient = db.query(PatientModel).filter(PatientModel.email == patient.email).first()
    if existing_patient:
        raise ValueError(f"Patient with email {patient.email} already exists.")

    patient_data = patient.dict()
    for field in ['allergies', 'medical_conditions', 'medications']:
        value = patient_data.get(field)
        cleaned = normalize_list_field(value)
        patient_data[field] = json.dumps(cleaned)

    db_patient = PatientModel(**patient_data)  # Use SQLAlchemy model here
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient


def get_all_patients(db: Session) -> list[PatientSchema]:
    patients = db.query(PatientModel).all()
    results = []
    for patient in patients:
        data = patient_to_dict(patient)  # Deserialize JSON strings to lists here
        results.append(PatientSchema(**data))
    return results


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


def doctor_to_dict(doctor: DoctorModel) -> dict:
    data = doctor.__dict__.copy()
    data.pop('_sa_instance_state', None)
    # schedule is stored as JSON string in DB - deserialize it
    raw_schedule = data.get('schedule')
    if raw_schedule:
        try:
            data['schedule'] = json.loads(raw_schedule)
        except (json.JSONDecodeError, TypeError):
            data['schedule'] = {"start": "09:00", "end": "17:00", "daysOff": [0, 6]}
    else:
        data['schedule'] = {"start": "09:00", "end": "17:00", "daysOff": [0, 6]}
    return data


def get_doctor(db: Session, doctor_id: int) -> Doctor | None:
    doctor = db.query(DoctorModel).filter(DoctorModel.id == doctor_id).first()
    if doctor:
        data = doctor_to_dict(doctor)
        return Doctor(**data)
    return None


def get_all_doctors(db: Session) -> list[Doctor]:
    doctors = db.query(DoctorModel).all()
    results = []
    for doctor in doctors:
        data = doctor_to_dict(doctor)
        results.append(Doctor(**data))
    return results


def create_doctor(db: Session, doctor: DoctorCreate) -> DoctorModel:
    existing_doctor = db.query(DoctorModel).filter(DoctorModel.email == doctor.email).first()
    if existing_doctor:
        raise ValueError(f"Doctor with email {doctor.email} already exists.")

    doctor_data = doctor.dict()
    # Convert schedule dict to JSON string for DB storage
    schedule_json = json.dumps(doctor_data.get("schedule", {"start": "09:00", "end": "17:00", "daysOff": [0, 6]}))
    doctor_data["schedule"] = schedule_json

    db_doctor = DoctorModel(**doctor_data)
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


def update_doctor(db: Session, doctor_id: int, updates: dict) -> DoctorModel:
    doctor = db.query(DoctorModel).filter(DoctorModel.id == doctor_id).first()
    if not doctor:
        raise ValueError(f"Doctor with id {doctor_id} not found.")

    if "schedule" in updates:
        updates["schedule"] = json.dumps(updates["schedule"])

    for key, value in updates.items():
        setattr(doctor, key, value)

    db.commit()
    db.refresh(doctor)
    return doctor


def delete_doctor(db: Session, doctor_id: int) -> bool:
    doctor = db.query(DoctorModel).filter(DoctorModel.id == doctor_id).first()
    if not doctor:
        raise ValueError(f"Doctor with id {doctor_id} not found.")
    db.delete(doctor)
    db.commit()
    return True


def create_tooth(db: Session, tooth_data: ToothCreate):
    tooth = Tooth(
        id=tooth_data.id,                # explicitly set the id from frontend if allowed
        name=tooth_data.name,
        adult=tooth_data.adult,
        position=tooth_data.position,
        type=tooth_data.type,
        treatments=tooth_data.treatments or [],  # store treatments list
        conditions=tooth_data.condition or [],  # optional field
        areas=ToothArea() # initialize areas as empty list
    )
    db.add(tooth)
    db.flush()  # flush to assign id if not set explicitly

    for area_data in tooth_data.areas:
        area = ToothArea(
            id=tooth_data.id,  # use the same id as tooth
            name=area_data.name,
            treatment=area_data.treatment,
            condition=area_data.condition,
            tooth_id=tooth.id
        )
        db.add(area)

    db.commit()
    db.refresh(tooth)
    return tooth



from sqlalchemy.orm import Session


def create_dental_chart(db: Session, chart: schemas.DentalChartCreate):
    db_chart = models.DentalChart(**chart.dict())
    db.add(db_chart)
    db.commit()
    db.refresh(db_chart)
    return db_chart


def get_dental_chart(db: Session, chart_id: int):
    return db.query(models.DentalChart).filter(models.DentalChart.id == chart_id).first()


def update_dental_chart(db: Session, chart_id: int, chart_update: schemas.DentalChartUpdate):
    chart = get_dental_chart(db, chart_id)
    if not chart:
        return None
    for field, value in chart_update.dict(exclude_unset=True).items():
        setattr(chart, field, value)
    db.commit()
    db.refresh(chart)
    return chart


def delete_dental_chart(db: Session, chart_id: int):
    chart = get_dental_chart(db, chart_id)
    if chart:
        db.delete(chart)
        db.commit()
    return chart


def get_teeth(db: Session):
    return db.query(Tooth).all()
