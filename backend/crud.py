from sqlalchemy.orm import Session
import models


def get_appointments(db: Session):
    return db.query(models.Appointment).all()


def create_appointment(db: Session, appointment_data):
    db_appointment = models.Appointment(**appointment_data)
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment
