/*
 * Day 24 - Temperature Sensor with Arduino
 * Project: Reading Temperature from LM35 Sensor
 * Author: Sinitha Mol K S
 * Date: 2026-06-23
 * 
 * Description: This project reads temperature data from an LM35 temperature sensor
 * and displays it on the Serial Monitor. The LM35 is an analog temperature sensor
 * that provides output voltage proportional to Celsius temperature.
 */

// Define the analog pin for the temperature sensor
const int tempPin = A0;

// Variables
float temperature = 0.0;
float voltage = 0.0;

void setup() {
  // Initialize serial communication at 9600 baud rate
  Serial.begin(9600);
  
  // Wait for serial connection to establish
  delay(1000);
  
  Serial.println("====================================");
  Serial.println("Temperature Sensor Initialization");
  Serial.println("====================================");
  Serial.println("Sensor: LM35");
  Serial.println("Pin: A0");
  Serial.println("Ready to read temperature...");
  Serial.println("====================================\n");
}

void loop() {
  // Read the analog value from the temperature sensor
  int sensorValue = analogRead(tempPin);
  
  // Convert analog value to voltage (0-5V range)
  // Arduino ADC: 10-bit (0-1023) = 0-5V
  voltage = (sensorValue / 1023.0) * 5.0;
  
  // Convert voltage to temperature in Celsius
  // LM35: 10mV per degree Celsius
  temperature = voltage * 100;
  
  // Display results on Serial Monitor
  Serial.print("Raw ADC Value: ");
  Serial.print(sensorValue);
  Serial.print("\t Voltage: ");
  Serial.print(voltage);
  Serial.print("V\t Temperature: ");
  Serial.print(temperature);
  Serial.println("°C");
  
  // Wait 1 second before next reading
  delay(1000);
}
