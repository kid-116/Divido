from app import db
from dataclasses import dataclass

@dataclass
class Car(db.Model):
    id: int
    model: str
    color: str
    latitude: float
    longitude: float

    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(255), unique=False, nullable=False)
    color = db.Column(db.String(255), unique=False, nullable=False)
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)

    def __init__(self, model, color, latitude, longitude):
        self.model = model
        self.color = color
        self.latitude = latitude
        self.longitude = longitude

    def __repr__(self):
        return str(self.id)

def create(model, color):
    car = Car(
        model=model,
        color=color,
        latitude=None,
        longitude=None
    )
    db.session.add(car)
    db.session.commit()

def update_location_by_id(car_id, latitude, longitude):
    car = Car.query.filter_by(id=car_id).first()
    if car:
        Car.query.filter_by(id=car_id).update({
            'latitude': latitude,
            'longitude': longitude
        })
        db.session.commit()

def delete(car_id):
    car = Car.query.filter_by(id=car_id).first()
    if car:
        db.session.delete(car)
        db.session.commit()

def delete_all():
    if Car.query.first():
        Car.query.delete()
        db.session.commit()

def get(car_id):
    return Car.query.filter_by(id=car_id).first()

def get_all(size=-1):
    return Car.query.all()
