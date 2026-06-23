# Circuit Diagram & Wiring Guide - Day 23

## Simple LED Circuit Diagram

```
┌─────────────────────────────────────────────┐
│           ESP32 Development Board            │
│                                              │
│  ┌─────────────────────────────────────┐   │
│  │         GPIO Pins                   │   │
│  │                                      │   │
│  │  .... GPIO 2 ──────────┐           │   │
│  │  .... GPIO 4           │           │   │
│  │  .... GPIO 5           │           │   │
│  │  ....                  │           │   │
│  │  .... GND ────────┐    │           │   │
│  │                  │    │           │   │
│  └──────────────────┼────┼───────────┘   │
│                     │    │                 │
└─────────────────────┼────┼─────────────────┘
                      │    │
                      │    ├──────[220Ω Resistor]──┐
                      │                             │
                      │                             │ (+) LED Anode
                      │                             │  │ ▼
                      │                             ●─────●
                      │                               LED
                      │                             ●─────●
                      │                             │ ▲
                      │                             │ (-) LED Cathode
                      │                             │
                      └─────────────────────────────┘
                              GND
```

## Breadboard Layout

```
┌──────────────────────────────────────┐
│  ESP32 on Breadboard                 │
│                                       │
│  [USB]                                │
│   ║                                   │
│   ╚═ [ESP32 Board]                   │
│       ║                              │
│       ╠═ GPIO 2 ─ 220Ω Resistor ─┐  │
│       ║                           │  │
│       ║                           ●  │  LED (long leg up)
│       ║                           │  │
│       ╠═ GND ──────────────────────┘  │
│                                       │
└──────────────────────────────────────┘
```

## Pin Configuration Chart

### ESP32 GPIO 2 (Recommended for LED)
```
ESP32 Development Board Top View:

     ┌─────────────────────────┐
     │    ESP32 Dev Kit        │
     │                         │
  GND├─────────────────────────┤3V3
     │                         │
GPIO2├────────LED──────────────┤
     │                         │
GPIO4├─────────────────────────┤
     │ .................... USB │
     └─────────────────────────┘
```

## Component Details

### LED Specifications
```
Standard LED:
├─ Forward Voltage: 1.8V - 2.2V (Red), 2.0V - 2.5V (Green), 3.0V - 3.5V (Blue)
├─ Max Current: 20mA typical
├─ Anode (longer leg): connects to +5V through resistor
└─ Cathode (shorter leg): connects to GND

Color Coding:
Red LED    → Forward voltage ~2.0V
Green LED  → Forward voltage ~2.2V
Blue LED   → Forward voltage ~3.2V
```

### Resistor Selection

Using Ohm's Law: **R = (V_supply - V_led) / I_led**

For ESP32 (3.3V) with red LED (2.0V forward voltage):
```
R = (3.3V - 2.0V) / 20mA
R = 1.3V / 0.02A
R = 65Ω
```

Practical values to use:
- 220Ω (safe, LED will be dimmer)
- 330Ω (safer, LED even dimmer)
- 1kΩ (very safe, LED barely visible)

## GPIO Pin Layout for ESP32 Development Board

```
                    ┌─────────────────────┐
                    │    ESP32 Dev Kit    │
        ┌───────────┤                     ├───────────┐
        │ GND   D35 │                     │ D36   3V3 │
        │ 3V3   D34 │                     │ D39   D23 │
        │ D15   D33 │                     │ D18   D22 │
        │ D2    D32 │ ◄─── LED on GPIO 2  │ D19   D21 │
        │ D4    D35 │                     │ D5    D20 │
        │ D12   GND │                     │ GND   GND │
        │ D13   D27 │                     │ EN    RST │
        │ D9    D25 │                     │ D17   D16 │
        │ D10   D26 │                     │ GND   GND │
        │ D11   D3  │                     │ D8    D7  │
        │           │   USB               │ D6    GND │
        └───────────┴──────────────────────┴───────────┘
```

## Working Example - WOKWI Simulation

The circuit can be simulated on WOKWI platform:
1. Create new project with ESP32
2. Add components:
   - ESP32 Board
   - LED (any color)
   - Resistor (220Ω)
3. Connect as per diagram
4. Upload the sketch
5. Start simulation

## Timing Diagram

```
GPIO State Over Time (1 Second ON / 1 Second OFF cycle)

HIGH (3.3V)  ┌─────────┐         ┌─────────┐
             │         │         │         │
GPIO 2       │         │         │         │
             │         │         │         │
LOW (0V)     └─────────┴─────────┴─────────┴─────
             0    500    1000   1500    2000   2500  time(ms)
             
             ◄──ON ──► ◄── OFF ──► ◄──ON ──► ◄──OFF──►
             1000ms    1000ms    1000ms    1000ms

LED State:   ON        OFF       ON        OFF
```

## Current Flow Analysis

```
ESP32 GPIO 2 (3.3V output)
    │
    ▼
 [220Ω Resistor]
    │
    ▼ ~15mA
 [LED Anode]
    │
    ▼
 [LED Cathode] (drops ~2.0V for red LED)
    │
    ▼
 ESP32 GND (0V)

Total Voltage Drop:
3.3V (GPIO) = 0.066V (resistor) + 2.0V (LED) + 1.23V (margin/efficiency)
```

## Safety Considerations
- ✓ 220Ω resistor prevents excessive current
- ✓ ESP32 GPIO can safely source ~20mA
- ✓ LED polarity must be correct (longer leg = +)
- ✓ No risk of damage if connections are correct
- ✓ USB power is sufficient (max 500mA available)

## Testing the Circuit

### Visual Test
1. Upload code to ESP32
2. Observe LED blinking every 1 second
3. Open Serial Monitor to see status messages

### Multimeter Test
1. Set multimeter to DC voltage mode
2. With LED ON: Measure ~2.0V across LED
3. With LED OFF: Measure ~3.3V at GPIO 2

---
**Circuit Complexity:** Very Simple ⭐  
**Safety Level:** Very Safe ✓  
**Learning Value:** Excellent  
**Troubleshooting Time:** < 5 minutes
