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

void postenterHTTP()
{
  if (WiFi.status() == WL_CONNECTED)
  {
  HTTPClient http;
  http.begin("http://backend-env.xzz7reypjg.us-west-1.elasticbeanstalk.com/register_event");
  http.addHeader("Content-Type", "text/plain");
  int httpEnter = http.POST("{\"eventType\" : \"enter\", \"deviceID\" : 4}");
  Serial.println(httpEnter);
  Serial.println("{\"eventType\" : \"enter\", \"deviceID\" : 4}");
  http.end();
  }
}

void postexitHTTP()
{
  if (WiFi.status() == WL_CONNECTED)
  {
  HTTPClient http;
  http.begin("http://backend-env.xzz7reypjg.us-west-1.elasticbeanstalk.com/register_event");
  http.addHeader("Content-Type", "text/plain");
  int httpExit = http.POST("{\"eventType\" : \"exit\", \"deviceID\" : 4}");
  Serial.println(httpExit);
  Serial.println("{\"eventType\" : \"exit\", \"deviceID\" : 4}");
  http.end();
  }
}

void setup() 
{
 delay(500);
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
    postenterHTTP();
    while (!digitalRead(D3) || !digitalRead(D2))
    {
      yield();
    }
    delay(700);
  }
  
  else if (oldvalB && !newvalB)
  {
    Serial.println("exit");
    postexitHTTP();
    while (!digitalRead(D3) || !digitalRead(D2))
    {
      yield();
    }
    delay(700);
  }
  oldvalA = newvalA;
  oldvalB = newvalB;
}
