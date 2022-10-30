#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <nRF24L01.h>
#include <RF24.h>

const char* ssid = "Asim";
const char* password = "ilikewater";

RF24 radio(4, 5); 

// Your Domain name with URL path or IP address with path
const char* serverName = "https://divido.mehultodi.repl.co/";
// const char* serverName = "https://divido.mehultodi.repl.co/car";

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
// unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;
const byte address[6] = "00001";


void setup() {
  Serial.begin(115200);
  delay(3000);
  radio.begin();
  WiFi.begin(ssid, password);
  
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  radio.begin();
  radio.openReadingPipe(1, address);
  radio.startListening(); 
  
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  // Check WiFi connection status
  if (WiFi.status()== WL_CONNECTED) {
    // Check if anything is received
    if(radio.available()){
      char text[32] = {0};

      radio.read(&text, sizeof(text));
      String msg = String(text);
      

      
      if(isdigit(msg[0]))
      {
      WiFiClientSecure client;
      client.setInsecure();
      // split msg into 3 parts based on spaces
      String car_id = msg.substring(0, msg.indexOf(" "));
      String lat = msg.substring(msg.indexOf(" ") + 1, msg.lastIndexOf(" "));
      String lng = msg.substring(msg.lastIndexOf(" ") + 1);
      String url = String(serverName) + "car/" + car_id + "/update-location";
      
      client.connect(url.c_str(), 443);

      HTTPClient http;


      Serial.println("Car ID: " + car_id);
      Serial.println("Lat: " + lat);
      Serial.println("Lng: " + lng);
      
      http.begin(client, url);

      http.addHeader("Content-Type", "application/json");








      // Assuming Max of 10 Cars
      int httpResponseCode = -1;
      if(!isdigit(msg[2]))
      {
        httpResponseCode = http.POST("{\"latitude\":-1,\"longitude\":-1}");
      }
      else
      {
        httpResponseCode = http.POST("{\"latitude\":"+lat+",\"longitude\":"+lng+"}");
      }
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);

      char text[32] = {0};
      radio.read(&text, sizeof(text));
      Serial.println(text); 
      // Free resources
      http.end();
     }
      else
      {
        Serial.println("Incorret Info Received");
        }
    }
  }
  else {
  Serial.println("WiFi Disconnected");
  }
}
