/*
 * Laser Integrated Digital Turnstile system
 *
 * Februar 7, 2018
 *
 * Cameron Napoli
 * Raymond Wang
 * Jeremy Quintana
 *Board: WeMOS D1 Mini NodeMCU
  */

#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>

WiFiClient client;
const char server[] = "http://backend-env.xzz7reypjg.us-west-1.elasticbeanstalk.com";
unsigned int timeout = 40;
//D2 = sensorA (entry)
//D1 = sensorB (exit)
//D8 = WiFi LED

int oldvalA;
int oldvalB;
int newvalA;
int newvalB;
int entryCount;
int exitCount;
int requestCount;


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

void postentryHTTP()
{
  if (WiFi.status() == WL_CONNECTED)
  {
  HTTPClient http;
  http.begin("http://backend-env.xzz7reypjg.us-west-1.elasticbeanstalk.com/register_event");
  http.addHeader("Content-Type", "text/plain");
  int httpEntry = http.POST("{\"eventType\" : \"entry\", \"deviceID\" : 2}");
  Serial.println(httpEntry);
  Serial.println("{\"eventType\" : \"entry\", \"deviceID\" : 2}");
  http.end();
  entryCount--;
  } 
  else
  {
    Serial.println("Error with WiFi Connection");
  }
}

void postexitHTTP()
{
  if (WiFi.status() == WL_CONNECTED)
  {
  HTTPClient http;
  http.begin("http://backend-env.xzz7reypjg.us-west-1.elasticbeanstalk.com/register_event");
  http.addHeader("Content-Type", "text/plain");
  int httpExit = http.POST("{\"eventType\" : \"exit\", \"deviceID\" : 2}");
  Serial.println(httpExit);
  Serial.println("{\"eventType\" : \"exit\", \"deviceID\" : 2}");
  http.end();
  exitCount--;
  }
  else
  {
    Serial.println("Error with WiFi Connection");
  }
}

void setup() 
{
 delay(250);
 pinMode(D1, INPUT);
 pinMode(D2, INPUT);
 pinMode(D5, OUTPUT);
 entryCount = 0;
 exitCount = 0;
 requestCount = 0;
 oldvalA = digitalRead(D2);
 oldvalB = digitalRead(D1);

 Serial.begin(115200);
 while (!Serial);
 
 WiFiManager wifiManager;
 wifiManager.autoConnect("LIDTdevice1");

 digitalWrite(D5, HIGH);
  while (!digitalRead(D1) || !digitalRead(D2))
 {
  yield();
 } 
 delay(50);
  Serial.println("Ready to Count!");
 }

void loop() 
{
  newvalA = digitalRead(D2);
  newvalB = digitalRead(D1);

  if (oldvalA && !newvalA)
  {
    Serial.println("entry");
    entryCount++;
    digitalWrite(D5, LOW);
    delay(100);
    digitalWrite(D5, HIGH);
    while (!digitalRead(D1) || !digitalRead(D2))
    {
      yield();
    }
    delay(500);
  }
  
  else if (oldvalB && !newvalB)
  {
    Serial.println("exit");
    exitCount++;
    digitalWrite(D5, LOW);
    delay(100);
    digitalWrite(D5, HIGH);
    while (!digitalRead(D1) || !digitalRead(D2))
    {
      yield();
    }
    delay(500);
  }
  else
  {
    requestCount++;
  }
  if (requestCount >= 200 && entryCount > 0)
  {
    postentryHTTP();
    requestCount = 0;
  }
  else if (requestCount >= 200 && exitCount > 0)
  {
    postexitHTTP();
    requestCount = 0;
  }
  else if (requestCount >=500)
  {
    requestCount = 200;
  }
  oldvalA = newvalA;
  oldvalB = newvalB;
  Serial.println(requestCount);
  delay(10);
}
