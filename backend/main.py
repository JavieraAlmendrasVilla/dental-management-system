from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, create_tables
import models
from pydantic import BaseModel
import uvicorn

app = FastAPI()

models.Base.metadata.create_all(bind=engine)


# Dependency to get DB session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class AppointmentCreate(BaseModel):
    patient_id: str
    patient_name: str
    date: str
    time: str
    type: str
    dentist: str
    notes: str = ""


@app.get("/")
def root():
    return {"message": "Dental API is running"}


@app.get("/appointments")
def get_appointments(db: Session = Depends(get_db)):
    return db.query(models.Appointment).all()


@app.post("/appointments")
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = models.Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
