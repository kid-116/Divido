from app import app
import models.car as car
from flask import request, jsonify
from middlewares.is_admin import is_admin
from dotenv import load_dotenv
from flask_api import status

load_dotenv()

@app.route('/car', methods=['POST'])
@is_admin()
def add_car():
    model = request.json.get('model')
    color = request.json.get('color')
    if not (model and color):
        return jsonify({
            'message': "Insufficient data"
        }), status.HTTP_400_BAD_REQUEST
    car.create(
        model=model,
        color=color,
    )
    return jsonify({}), status.HTTP_201_CREATED

@app.route('/car/<car_id>/update-location', methods=['PATCH'])
# TODO: @is_authorized()
def update_location(car_id):
    latitude = request.json.get('latitude')
    longitude = request.json.get('longitude')
    if not (latitude and longitude):
        return jsonify({}), status.HTTP_400_BAD_REQUEST
    car.update_location_by_id(
        car_id,
        latitude=latitude,
        longitude=longitude
    )
    return jsonify({}), status.HTTP_201_CREATED

@app.route('/car', methods=['GET'])
def get_cars():
    cars = car.get_all()
    return jsonify(cars), status.HTTP_200_OK
