from typing import List
import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, crud, schemas
from fastapi.middleware.cors import CORSMiddleware
from models import Appointment as AppointmentModel
from schemas import Appointment  # Pydantic response model

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
    db_patient = crud.get_patient(db, patient_id)
    if not db_patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient


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


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
