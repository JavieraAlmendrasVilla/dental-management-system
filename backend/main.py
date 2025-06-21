from typing import List
import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, crud, schemas
from fastapi.middleware.cors import CORSMiddleware
from models import Appointment as AppointmentModel
from schemas import Appointment  # Pydantic response model
from models import Doctors as DoctorModel
from schemas import Doctor, DoctorCreate, DentalChartCreate, DentalChartOut

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# For frontend communication (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "Backend is running"}


@app.get("/patients/{patient_id}", response_model=schemas.Patient)
def read_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = crud.get_patient(db, patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


@app.get("/patients", response_model=List[schemas.Patient])
def read_patients(db: Session = Depends(get_db)):
    return crud.get_all_patients(db)


@app.post("/patients", response_model=schemas.Patient)
def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    return crud.create_patient(db, patient)


@app.get("/appointments", response_model=List[schemas.Appointment])
def get_appointments(db: Session = Depends(get_db)):
    appointments = db.query(AppointmentModel).all()
    result = []
    for appt in appointments:
        result.append(Appointment(
            id=appt.id,
            date=appt.date,
            time=appt.time,
            type=appt.type,
            dentist=appt.dentist,
            notes=appt.notes,
            completed=appt.completed,
            patientId=appt.patientId,
            patientName=appt.patientName if appt.patientName else "Unknown"
        ))
    return result


@app.get("/appointments/{patient_id}", response_model=List[schemas.Appointment])
def get_patient_appointments(patient_id: int, db: Session = Depends(get_db)):
    return crud.get_appointments_for_patient(db, patient_id)


@app.post("/appointments", response_model=schemas.Appointment)
def create_appointment(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    return crud.create_appointment(db, appointment)


@app.get("/doctors", response_model=List[Doctor])
def read_doctors(db: Session = Depends(get_db)):
    return db.query(DoctorModel).all()


@app.post("/doctors", response_model=Doctor)
def create_doctor(doctor: DoctorCreate, db: Session = Depends(get_db)):
    db_doctor = DoctorModel(**doctor.dict())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


@app.put("/doctors/{doctor_id}", response_model=Doctor)
def update_doctor(doctor_id: int, doctor: DoctorCreate, db: Session = Depends(get_db)):
    db_doctor = db.query(DoctorModel).filter(DoctorModel.id == doctor_id).first()
    if not db_doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    for key, value in doctor.dict().items():
        setattr(db_doctor, key, value)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


@app.delete("/doctors/{doctor_id}")
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    db_doctor = db.query(DoctorModel).filter(DoctorModel.id == doctor_id).first()
    if not db_doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    db.delete(db_doctor)
    db.commit()
    return {"ok": True}


@app.get("/treatments", response_model=List[schemas.Treatment])
def read_treatments(db: Session = Depends(get_db)):
    return db.query(models.TreatmentModel).all()


@app.post("/treatments", response_model=schemas.Treatment)
def create_treatment(treatment: schemas.TreatmentCreate, db: Session = Depends(get_db)):
    db_treatment = models.TreatmentModel(**treatment.dict())
    db.add(db_treatment)
    db.commit()
    db.refresh(db_treatment)
    return db_treatment


@app.put("/treatments/{treatment_id}", response_model=schemas.Treatment)
def update_treatment(treatment_id: int, treatment: schemas.TreatmentCreate, db: Session = Depends(get_db)):
    db_treatment = db.query(models.TreatmentModel).filter(models.TreatmentModel.id == treatment_id).first()
    if not db_treatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    for key, value in treatment.dict().items():
        setattr(db_treatment, key, value)
    db.commit()
    db.refresh(db_treatment)
    return db_treatment


@app.delete("/treatments/{treatment_id}")
def delete_treatment(treatment_id: int, db: Session = Depends(get_db)):
    db_treatment = db.query(models.TreatmentModel).filter(models.TreatmentModel.id == treatment_id).first()
    if not db_treatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    db.delete(db_treatment)
    db.commit()
    return {"ok": True}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/dental-chart/{patient_id}", response_model=schemas.Tooth)
def create_tooth(tooth: schemas.ToothCreate, db: Session = Depends(get_db)):
    return crud.create_tooth(db, tooth)


@app.get("/dental-chart/{patient_id}", response_model=List[schemas.Tooth])
def read_teeth(db: Session = Depends(get_db)):
    return crud.get_teeth(db)

@app.post("/dental-chart/{patient_id}", response_model=DentalChartOut)
def save_dental_chart(chart: DentalChartCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_dental_chart(db, chart)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving chart: {e}")


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
