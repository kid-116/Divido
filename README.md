# Divido

## Getting Started

### Part 1: Setting up the Flask app
1. Go to the api directory of the project
```cmd
cd api
```
2. Create a `.env` file for admin tokens as follows
```.env
ADMIN_TOKEN=<admin-token>
```
3. Install dependencies
```cmd
pip install -r ./requirements.txt
```
4. Run the app
```cmd
python app.py
```
#### Using PostMan to send an API request for adding a new car
### Part 2: Setting up the IoT devices
1. We need to have at least two devices, one for a car and one that acts like a server.
2. Wire up the devices as follows
<br>
<img src="pics/mega_schema.png" alt="drawing" width="400"/>
<br>
This is for the car, the GPS Module is optional.
<br>
<img src="pics/esp_schema.png" alt="drawing" width="400"/>
<br>
This is for the server.
3. Install the Arduino IDE and the ESP8266 board manager
4. Install the following libraries
    - RF24.h
    - TinyGPS++.h
5. Upload the code in the `esp_main` directory to the server
6. Upload the code in the `gps_transmitter` directory to the car. This code is for the car with the GPS module.
7. Upload the code in the `static_transmitter` directory to the car. This code is for the car without the GPS module.