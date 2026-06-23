# Day 24 - Temperature Sensor with Arduino

## Project Overview
This project demonstrates how to read temperature data from an **LM35 temperature sensor** using Arduino. The LM35 is a precision analog temperature sensor that provides linear output voltage proportional to Celsius temperature.

## Components Required
- **Arduino Board** (Uno, Nano, or compatible)
- **LM35 Temperature Sensor** (3-pin component)
- **Jumper Wires**
- **USB Cable** (for programming and power)
- **Serial Monitor** (for viewing output)

## Circuit Connections
```
LM35 Pinout:
Pin 1 (Vcc)  → Arduino 5V
Pin 2 (Vout) → Arduino A0
Pin 3 (GND)  → Arduino GND
```

## Sensor Specifications
| Parameter | Value |
|-----------|-------|
| Output Type | Analog Voltage |
| Temperature Range | -55°C to +150°C |
| Accuracy | ±0.5°C |
| Output Voltage | 10mV per °C |
| Supply Voltage | 4V to 30V (typically 5V) |

## How It Works
1. The LM35 sensor outputs a voltage proportional to temperature
2. Arduino reads this voltage using the ADC (Analog-to-Digital Converter) on pin A0
3. The raw ADC value (0-1023) is converted to voltage (0-5V)
4. The voltage is converted to temperature using: **Temperature = Voltage × 100**
5. Results are displayed on the Serial Monitor

## Code Explanation
- **analogRead(A0)**: Reads the analog value from pin A0 (10-bit resolution: 0-1023)
- **Conversion Formula**: 
  - Voltage = (ADC Value / 1023) × 5
  - Temperature = Voltage × 100

## Instructions to Run
1. Connect the LM35 sensor to Arduino according to the circuit diagram
2. Upload the `temperature_sensor.ino` sketch to your Arduino
3. Open the Serial Monitor (Tools → Serial Monitor)
4. Set Baud Rate to **9600**
5. Observe the temperature readings update every 1 second

## Expected Output
```
====================================
Temperature Sensor Initialization
====================================
Sensor: LM35
Pin: A0
Ready to read temperature...
====================================

Raw ADC Value: 512    Voltage: 2.50V    Temperature: 25.0°C
Raw ADC Value: 514    Voltage: 2.51V    Temperature: 25.1°C
Raw ADC Value: 513    Voltage: 2.51V    Temperature: 25.1°C
```

## Troubleshooting
| Issue | Solution |
|-------|----------|
| No readings | Check USB connection and baud rate (9600) |
| Fluctuating values | Add capacitor (0.1µF) across sensor power pins |
| Invalid temperature | Verify sensor connections and pin A0 configuration |
| Out of range | Check sensor is within -55°C to +150°C operating range |

## Real-World Applications
- Climate control systems
- Weather monitoring stations
- Incubators and thermal management
- Industrial temperature monitoring
- Smart home thermostat systems

## Notes
- The LM35 provides linear output, making it easy to use
- For better accuracy, take multiple readings and average them
- Consider adding noise filtering with a capacitor
- Can be easily interfaced with IoT platforms for remote monitoring

---
**Created by:** Sinitha Mol K S  
**Date:** 2026-06-23  
**Platform:** Arduino IDE  
**Difficulty Level:** Beginner
