/*
 * Laser Integrated Digital Turnstile system
 *
 * Februar 7, 2018
 *
 * Cameron Napoli
 * Raymond Wang
 * Jeremy Quintana
  */

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>

WiFiClient client;
const char mySSID[] = "JeremyFoundation 2.4";
const char myPSK[] = "DoctorJoseph123";
const char server[] = "http://backend-env.xzz7reypjg.us-west-1.elasticbeanstalk.com";
unsigned int timeout = 40;
//D3 = sensorA (enter)
//D2 = sensorB (exit)
//D8 = WiFi LED

int oldvalA;
int oldvalB;
int newvalA;
int newvalB;


void errorLoop(int error)
{
  Serial.print(F("Error: "));
  Serial.println(error);
  Serial.println(F("Looping forever."));
  for (;;)
  {
    delay(5);
  }
}

void postexitRequest()
{
  if (!client.connect(server, 80))
  {
    Serial.println("Connection failed.");
  }
  else
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
  client.stop();
}

void postenterRequest()
{
    if (!client.connect(server, 80))
  {
    Serial.println("Connection failed.");
  }
  else
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
}

void setup() 
{
 pinMode(D3, INPUT);
 pinMode(D2, INPUT);
 pinMode(D8, OUTPUT);
 oldvalA = digitalRead(D3);
 oldvalB = digitalRead(D2);

 Serial.begin(115200);
 while (!Serial);
 Serial.print("Connecting to ");
 Serial.println(mySSID);
 WiFi.mode(WIFI_STA);
 WiFi.begin(mySSID, myPSK);
 while (WiFi.status() != WL_CONNECTED && (--timeout > 0))
 {
  digitalWrite(D8, HIGH);
  delay(250);
  digitalWrite(D8, LOW);
  Serial.print(".");
  delay(250);
 }
 if (WiFi.status() != WL_CONNECTED)
 {
  Serial.println(F("Error connecting."));
  digitalWrite(D8, LOW);
  errorLoop(WiFi.status());
 }
 else if (WiFi.status() == WL_CONNECTED)
 {
  Serial.println(" ");
  Serial.print(F("WiFi connected to: "));
  Serial.println(mySSID);
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  digitalWrite(D8, HIGH);
  
 } 
 delay(50);
  Serial.println("Ready to Count!");
 }

void loop() 
{
  newvalA = digitalRead(D3);
  newvalB = digitalRead(D2);

  if (oldvalA && !newvalA)
  {
    Serial.println("enter");
    postenterRequest();
    while (!digitalRead(D3) || !digitalRead(D2))
    {
      yield();
    }
  }
  
  else if (oldvalB && !newvalB)
  {
    Serial.println("exit");
    postexitRequest();
    while (!digitalRead(D3) || !digitalRead(D2))
    {
      yield();
    }
  }
  oldvalA = newvalA;
  oldvalB = newvalB;
}
