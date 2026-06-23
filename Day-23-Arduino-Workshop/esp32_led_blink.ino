/*
 * Day 23 - Arduino Workshop: LED Blinking on ESP32
 * Project: Simple LED Blink Using GPIO
 * Author: Sinitha Mol K S
 * Date: 2026-06-23
 * Platform: WOKWI Simulation & Arduino IDE
 * 
 * Description: This project demonstrates basic GPIO control on ESP32 by blinking
 * an LED on and off at regular intervals. Perfect for learning Arduino fundamentals
 * and getting started with microcontroller programming.
 */

// Define the GPIO pin connected to the LED
#define LED_PIN 2

// Define timing variables (in milliseconds)
#define ON_TIME 1000    // LED ON duration
#define OFF_TIME 1000   // LED OFF duration

void setup() {
  // Initialize serial communication at 115200 baud rate (standard for ESP32)
  Serial.begin(115200);
  
  // Set LED_PIN as an output
  pinMode(LED_PIN, OUTPUT);
  
  // Initial LED state - OFF
  digitalWrite(LED_PIN, LOW);
  
  // Wait for serial connection to establish
  delay(1000);
  
  Serial.println("\n====================================");
  Serial.println("ESP32 LED Blink Workshop - Day 23");
  Serial.println("====================================");
  Serial.print("LED Pin: GPIO ");
  Serial.println(LED_PIN);
  Serial.print("Blink Interval: ");
  Serial.print(ON_TIME);
  Serial.print("ms ON, ");
  Serial.print(OFF_TIME);
  Serial.println("ms OFF");
  Serial.println("====================================");
  Serial.println("LED blinking started...\n");
}

void loop() {
  // Turn LED ON
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ON");
  
  // Wait for ON_TIME milliseconds
  delay(ON_TIME);
  
  // Turn LED OFF
  digitalWrite(LED_PIN, LOW);
  Serial.println("LED OFF");
  
  // Wait for OFF_TIME milliseconds
  delay(OFF_TIME);
}
