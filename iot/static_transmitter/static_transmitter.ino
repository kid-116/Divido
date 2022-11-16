#include <SoftwareSerial.h>
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>


//create an RF24 object
RF24 radio(9, 8);  // CE, CSN

//address through which two modules communicate.
const byte address[6] = "00001";

void setup()
{
  radio.begin();
  
  //set the address
  radio.openWritingPipe(address);
  
  //Set module as transmitter
  radio.stopListening();
  
  // Start the Arduino hardware serial port at 9600 baud
  Serial.begin(9600);
}

void loop()
{
    char Buf[50];
    String cords = "1 13.0126 74.7912";

    cords.toCharArray(Buf, 50);
    Serial.println(cords);
    radio.write(&Buf,50);
  Serial.println();
  Serial.println();
  delay(1000);
}
