/*
 * Laser Integrated Digital Turnstile system
 *
 * October 27, 2017
 *
 * Cameron Napoli
 * Raymond Wang
 * Jeremy Quintana
  */

#include <SoftwareSerial.h> 
#include <SparkFunESP8266WiFi.h>

ESP8266Client client;
const char mySSID[] = "JeremyFoundation 2.4";
const char myPSK[] = "DoctorJoseph123";
const char server[] = "http://backend-env.xzz7reypjg.us-west-1.elasticbeanstalk.com";
int sensorA = 2;
int sensorB = 3;
int oldvalA;
int oldvalB;
int newvalA;
int newvalB;
                           
void errorLoop(int error)
{
  Serial.print(F("Error: "));
  Serial.println(error);
  Serial.println(F("Looping forever."));
  for (;;);
}

void postexitRequest()
{
  client.println("Post /register_event HTTP\1.1");
  client.println("Host: http://backend-env.xzz7reypjg.us-west-1.elasticbeanstalk.com");
  client.println("Connection: close\n");
  client.println("Content-Type: text/html\r");
  client.println("Connection: close\r\n\r");
  client.println("<!DOCTYPE HTML>\r");
  client.println("<html>\r");
  client.println("\"eventType\" : \"exit\",");
  client.println("\"deviceID\" : 4");
  client.println("</html>");
  Serial.println("Request Sent");
}


void postenterRequest()
{
  client.println("Post /register_event HTTP\1.1");
  client.println("Host: http://backend-env.xzz7reypjg.us-west-1.elasticbeanstalk.com");
  client.println("Connection: close\n");
  client.println("Content-Type: text/html\r");
  client.println("Connection: close\r\n\r");
  client.println("<!DOCTYPE HTML>\r");
  client.println("<html>\r");
  client.println("\"eventType\" : \"enter\",");
  client.println("\"deviceID\" : 4");
  client.println("</html>");
  Serial.println("Request Sent");
}

void setup() 
{
  pinMode(sensorA, INPUT);
  pinMode(sensorB, INPUT);
  oldvalA = digitalRead(sensorA);
  oldvalB = digitalRead(sensorB);
  
  Serial.begin(9600);
  while (!Serial);
  
  int test = esp8266.begin();
  if (test!= true)
  {
    Serial.println(F("Error talking to ESP8266."));
   errorLoop(test); 
  }
  Serial.println(F("ESP8266 Shield Present"));
  delay(50);

  int retVal = esp8266.getMode();
  if (retVal != ESP8266_MODE_STA)
  {
    retVal = esp8266.setMode(ESP8266_MODE_STA);
    if (retVal < 0)
    {
      Serial.println(F("Error setting mode."));
      errorLoop(retVal);
    }
  }
  Serial.println(F("Mode set to station."));
  delay(50);
  
  Serial.print(F("Connecting to "));
  Serial.println(mySSID);
  retVal =esp8266.connect(mySSID, myPSK);
  if (retVal < 0)
  {
    Serial.println(F("Error connecting."));
    errorLoop(retVal);
  }

  char connectedSSID[24];
  memset(connectedSSID, 0, 24);
  retVal = esp8266.getAP(connectedSSID);
  if (retVal > 0)
  {
    Serial.print(F("Connected to: "));
    Serial.println(connectedSSID);
  }
  IPAddress myIP = esp8266.localIP();
  Serial.print(F("My IP: "));
  Serial.println(myIP);
  delay(50);
  
  retVal = client.connect(server, 80);
  if (retVal <= 0)
  {
    Serial.println(F("Failed to connect to server."));
    errorLoop(retVal);
  }
  Serial.println(F("Connected to Server."));
  delay(50);
  Serial.println(F("Ready to Count!"));
}

void loop() 
{
  newvalA = digitalRead(sensorA);
  newvalB = digitalRead(sensorB);

  if (oldvalA && !newvalA)
  {
    Serial.println("enter");
    postenterRequest();
    
    while (!digitalRead(sensorA) || !digitalRead(sensorB));
  }
  else if (oldvalB && !newvalB)
  {
    Serial.println("exit");
    postexitRequest();
    
    while (!digitalRead(sensorA) || !digitalRead(sensorB));
  }
  oldvalA = newvalA;
  oldvalB = newvalB;
}
