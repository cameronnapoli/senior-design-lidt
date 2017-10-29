/*
 * Laser Integrated Digital Turnstile system
 *
 * October 27, 2017
 *
 * Cameron Napoli
 * Raymond Wang
 * Jeremy Quintana
  */

short pin1 = 4;
short pin2 = 7;

int pin1Val = 0;
int pin2Val = 0;

int pin1Prev = 0;
int pin2Prev = 0;

int pin1Counter = 0;
int pin2Counter = 0;


void setup() {
    pinMode(pin1, INPUT);
    pinMode(pin2, INPUT);
    Serial.begin(9600);
}

void loop() {
    pin1Prev = pin1Val;
    pin2Prev = pin2Val;
  
    pin1Val = digitalRead(pin1);
    pin2Val = digitalRead(pin2);
    
    if(pin1Val == HIGH && pin1Prev == LOW) {
        pin1Counter++;
        Serial.print("pin1: LOW => HIGH, counter: ");
        Serial.println(pin1Counter);
    } else {
        Serial.write("pin1 =>  LOW");
    }

    if(pin2Val == HIGH && pin2Prev == LOW) {
        pin2Counter++;
        Serial.print("pin2: LOW => HIGH, counter: ");
        Serial.println(pin2Counter);
    } else {
        Serial.write("pin2 =>  LOW");
    }
}
