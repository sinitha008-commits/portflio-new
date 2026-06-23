# Day 23 - Arduino Workshop: LED Blinking on ESP32

## Project Overview
This is an introductory Arduino project that demonstrates how to control GPIO pins on an **ESP32 microcontroller** by blinking an LED on and off. This is the fundamental "Hello World" of microcontroller programming and is perfect for learning:
- GPIO pin control
- Digital output operations
- Timing and delays
- Serial communication
- Basic Arduino programming concepts

## Components Required
- **ESP32 Development Board** (any variant: ESP32 DEVKIT, WROOM, etc.)
- **LED** (any color, typically 3-5mm)
- **Resistor** (220Ω - 1kΩ for current limiting)
- **Jumper Wires**
- **USB Cable** (for programming and power)
- **Breadboard** (optional but recommended)

## Circuit Connections
```
ESP32 GPIO Pin 2 ──→ [220Ω Resistor] ──→ LED Anode (+)
ESP32 GND ─────────────────────────────→ LED Cathode (-)
```

### Alternative Pin Options
You can use any of these ESP32 GPIO pins for the LED:
- GPIO 2 (used in this project - recommended for development boards)
- GPIO 4
- GPIO 5
- GPIO 12
- GPIO 13
- GPIO 14
- GPIO 15
- GPIO 16
- GPIO 17
- GPIO 18
- GPIO 19
- GPIO 21
- GPIO 22
- GPIO 23
- GPIO 25
- GPIO 26
- GPIO 27

**Avoid:** GPIO 0, 1, 3, 6, 7, 8, 9, 10, 11 (reserved for flash)

## How It Works
1. **Setup Phase**: 
   - Initializes serial communication for debugging
   - Configures GPIO 2 as a digital output
   - Sets initial LED state to OFF

2. **Loop Phase** (repeats continuously):
   - Turns LED ON by setting GPIO 2 to HIGH
   - Waits 1000 milliseconds (1 second)
   - Turns LED OFF by setting GPIO 2 to LOW
   - Waits 1000 milliseconds (1 second)
   - Repeats indefinitely

## Code Explanation

### Key Functions Used:
| Function | Purpose |
|----------|---------|
| `pinMode(pin, mode)` | Configure pin as INPUT or OUTPUT |
| `digitalWrite(pin, state)` | Set pin to HIGH (5V) or LOW (0V) |
| `delay(ms)` | Pause execution for specified milliseconds |
| `Serial.begin(baud)` | Initialize serial communication |
| `Serial.println()` | Print text to Serial Monitor |

### Variable Definitions:
```cpp
#define LED_PIN 2       // GPIO pin connected to LED
#define ON_TIME 1000    // LED on for 1 second
#define OFF_TIME 1000   // LED off for 1 second
```

## Instructions to Run

### Method 1: Arduino IDE
1. Install [Arduino IDE](https://www.arduino.cc/en/software)
2. Install ESP32 board package:
   - Tools → Board Manager → Search "ESP32" → Install by Espressif Systems
3. Select Board: Tools → Board → ESP32 Dev Module
4. Connect ESP32 via USB cable
5. Copy the code from `esp32_led_blink.ino`
6. Click Upload (or Ctrl+U)
7. Open Serial Monitor (Tools → Serial Monitor) - set to 115200 baud

### Method 2: WOKWI Online Simulator
1. Visit [WOKWI](https://wokwi.com/)
2. Create new project → Select ESP32
3. Add LED component from parts library
4. Connect LED to GPIO 2 and GND
5. Paste the code into the editor
6. Click "Start Simulation"
7. Watch the LED blink!

## Expected Output
### Serial Monitor Display:
```
====================================
ESP32 LED Blink Workshop - Day 23
====================================
LED Pin: GPIO 2
Blink Interval: 1000ms ON, 1000ms OFF
====================================
LED blinking started...

LED ON
LED OFF
LED ON
LED OFF
LED ON
LED OFF
... (continues indefinitely)
```

## Modifications & Experiments

### Experiment 1: Change Blink Speed
```cpp
#define ON_TIME 500    // Half a second ON
#define OFF_TIME 500   // Half a second OFF
```

### Experiment 2: Asymmetric Blinking
```cpp
#define ON_TIME 200    // 200ms ON
#define OFF_TIME 800   // 800ms OFF (LED mostly off)
```

### Experiment 3: Morse Code SOS Pattern
```cpp
void loop() {
  // S (dot-dot-dot)
  blink(200, 200);
  blink(200, 200);
  blink(200, 500);
  
  // O (dash-dash-dash)
  blink(500, 200);
  blink(500, 200);
  blink(500, 500);
  
  // S (dot-dot-dot)
  blink(200, 200);
  blink(200, 200);
  blink(200, 1000);
}

void blink(int onTime, int offTime) {
  digitalWrite(LED_PIN, HIGH);
  delay(onTime);
  digitalWrite(LED_PIN, LOW);
  delay(offTime);
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| LED doesn't blink | Check USB connection and LED polarity (anode to GPIO, cathode to GND) |
| LED stays ON | Verify GPIO pin configuration - make sure it's set as OUTPUT |
| LED too dim | Reduce resistor value (try 220Ω instead of 1kΩ) |
| Upload fails | Select correct board (ESP32 Dev Module) and COM port |
| No serial output | Check baud rate is set to 115200 |
| Inconsistent blinking | Check USB cable quality and power supply |

## Real-World Applications
- Indicator lights in IoT devices
- Status LEDs in smart home systems
- Traffic control systems
- Alarm and warning systems
- Wearable technology
- Automotive dashboard indicators
- Industrial machine status displays

## Learning Outcomes
After completing this project, you'll understand:
✓ GPIO pin control basics
✓ Digital output operations
✓ Timing and delay functions
✓ Arduino programming structure (setup/loop)
✓ Serial communication for debugging
✓ Hardware-software interaction
✓ ESP32 development workflow

## Next Steps
- Add a button to control LED manually
- Implement PWM for LED brightness control
- Add multiple LEDs with different patterns
- Interface with sensors (temperature, motion, light)
- Connect to WiFi and IoT platforms

---
**Created by:** Sinitha Mol K S  
**Date:** 2026-06-23  
**Platform:** ESP32 / Arduino IDE / WOKWI  
**Difficulty Level:** Beginner  
**Time to Complete:** 10-15 minutes  
**WOKWI Project:** https://wokwi.com/projects/467504928341651457
