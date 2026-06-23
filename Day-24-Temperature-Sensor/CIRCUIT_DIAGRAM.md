# Circuit Diagram & Wiring Guide

## LM35 Temperature Sensor - Pin Configuration

```
     ___
    |   |
    | 1 | --- Vcc (5V)
    |___|
      2 --- Vout (to A0)
      3 --- GND
```

## Complete Circuit Wiring

```
Arduino Uno                  LM35 Sensor
=========                    ===========
5V ─────────────────────────→ Pin 1 (Vcc)
A0 ─────────────────────────→ Pin 2 (Vout)
GND ────────────────────────→ Pin 3 (GND)
```

## Block Diagram

```
┌─────────────────┐
│   LM35 Sensor   │
│   (Analog)      │
└────────┬────────┘
         │ Vout (0-5V)
         │
         ├─ ADC Pin A0
         │
┌────────▼────────────────┐
│   Arduino ADC           │
│ (Converts to 0-1023)    │
└────────┬────────────────┘
         │
         ├─ Processing
         │
┌────────▼──────────────────────────────┐
│  Temperature Calculation               │
│  Temp = (ADC Value / 1023) × 5 × 100  │
└────────┬───────────────────────────────┘
         │
         ├─ Serial Communication
         │
┌────────▼──────────────────┐
│   Serial Monitor Display  │
│   (9600 baud rate)        │
└───────────────────────────┘
```

## Additional Notes

### Optional Filtering (For noise reduction)
If you experience fluctuating readings, add a 0.1µF capacitor across the sensor power pins:

```
5V ──┬──→ LM35 Pin 1
     │
    0.1µF Capacitor
     │
    GND ──→ LM35 Pin 3
```

### Arduino Code Calibration
To improve accuracy, modify the sketch to take multiple readings:

```cpp
const int numReadings = 10;
float totalTemp = 0;

for(int i = 0; i < numReadings; i++) {
  int sensorValue = analogRead(tempPin);
  voltage = (sensorValue / 1023.0) * 5.0;
  temperature = voltage * 100;
  totalTemp += temperature;
  delay(100);
}

temperature = totalTemp / numReadings; // Average temperature
```

---
**Reference:** LM35 Datasheet specifications  
**Last Updated:** 2026-06-23
