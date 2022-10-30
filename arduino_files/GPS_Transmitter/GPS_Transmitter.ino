#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
// Choose two Arduino pins to use for software serial
int RXPin = 19;
int TXPin = 18;

int GPSBaud = 9600;

//create an RF24 object
RF24 radio(7, 8);  // CE, CSN

//address through which two modules communicate.
const byte address[6] = "00001";

// Create a TinyGPS++ object
TinyGPSPlus gps;

// Create a software serial port called "gpsSerial"
SoftwareSerial gpsSerial(RXPin, TXPin);

void setup()
{
  radio.begin();
  
  //set the address
  radio.openWritingPipe(address);
  
  //Set module as transmitter
  radio.stopListening();
  
  // Start the Arduino hardware serial port at 9600 baud
  Serial.begin(9600);

  // Start the software serial port at the GPS's default baud
  gpsSerial.begin(GPSBaud);
}

void loop()
{
  // This sketch displays information every time a new sentence is correctly encoded.
  while (gpsSerial.available() > 0)
    if (gps.encode(gpsSerial.read()))
      displayInfo();

  // If 5000 milliseconds pass and there are no characters coming in
  // over the software serial port, show a "No GPS detected" error
  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println("No GPS detected");
    while(true);
  }
}

void displayInfo()
{
  if (gps.location.isValid())
  {
    
    Serial.print("Cords: ");
    String cords = String(gps.location.lat(),6) + " " + String(gps.location.lng(),6);
    char Buf[50];
    cords.toCharArray(Buf, 50);
    Serial.println(cords);
//    radio.write(&Buf,50);
  }
  else
  {
    String cords = "NA NA";
    char Buf[50];
    cords.toCharArray(Buf, 50);
    Serial.println(cords);
//    radio.write(&Buf,50);
  }
  Serial.println();
  Serial.println();
  delay(1000);
}
