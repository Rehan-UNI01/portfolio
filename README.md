# 漂流 // MOHAMMAD REHAN'S DEV LOG
### *Sonny Boy* Inspired Anti-Gravity Software Engineering Portfolio

A single-page, physics-enabled software engineering portfolio created in the signature indie anime aesthetic of **Sonny Boy** (directed by Shingo Natsume, original character design by Hisashi Eguchi, art direction by Studio Madhouse).

---

## 🎨 Visual & Art Direction

- **Sonny Boy Color Palette**: Saturated sky blues (`#1A66FF`, `#00A3FF`), ocean greens/turquoise (`#00CC99`), warning reds (`#FF3B30`), pale paper cream (`#FAF8F2`), and ink-black voids (`#0D0F12`).
- **Rough Hand-Inked Aesthetic**: 2.5px–3.5px imperfect ink borders with dynamic SVG fractal turbulence filters (`feTurbulence`, `feDisplacementMap`), hard-offset cel shadows (`6px 6px 0px #000`), halftone dots, TV scanlines, and retro film grain.
- **Anime Title Card Typography**: Display headings using *Dela Gothic One*, modern tech metadata in *Space Grotesk*, monospace telemetry in *JetBrains Mono*, and Japanese subheadings in *Zen Maru Gothic*.
- **Iconic Anime Assets**: Drifting high school utility poles with blinking red beacons, floating classroom chairs, responsive paper airplanes, cassette tapes, and tethers/power lines.

---

## 🌌 Zero-Gravity Physics & Interactivity (Matter.js)

1. **Zero-Gravity Float**:
   - Cards, skill debris, and illustration elements drift, sway, and rotate naturally in zero-g without staying rigidly static.
   - Micro sinusoidal drift waves simulate floating in the endless anime ocean void.
2. **Interactive Tossing & Flinging**:
   - Click and drag any card, skill badge, paper plane, or chair. Toss them across the screen; they rebound off boundaries with realistic restitution and momentum.
   - Moving the cursor near debris causes a **water-like repulsive wake**, pushing small particles aside.
3. **Paper Airplane Flight**:
   - The paper plane responds dynamically to cursor proximity, darting away and aligning its heading to flight velocity.
4. **Dynamic SVG Power Wires**:
   - Bezier catenary curves span between utility poles, cards, and contact social pins, stretching and sagging in real-time as objects drift or get moved.
5. **Student Council Dimension Rules**:
   - **Rule 1: Zero-G Drift** (default floating void)
   - **Rule 2: Restore Earth Gravity** (objects fall with realistic weight and floor bounce)
   - **Rule 3: Solar Storm** (turbulent velocity bursts and swirling debris)
   - **Rule 4: Midnight Void** (shifts into ink-black darkness with glowing beacons)
   - **Re-Anchor**: Instantly resets all bodies to their clean original positions.
6. **Lo-Fi Ambient WebAudio Generator**:
   - Tape-flutter pentatonic dream-pop chimes inspired by Sonny Boy's soundtrack (*Toe*, *Sunset Rollercoaster*, *Ogawa*).
   - Audio visualizer equalizer in the header bar.
7. **Interactive Project Modals**:
   - **Dimensional Router (C++20)**: Epoll ring buffer code viewer + live packet burst latency benchmark runner.
   - **Compass CLI (Python 3.11)**: AST navigator code viewer + live spatial directory tree scanner.
   - **Void Slab Allocator (C99)**: Deterministic slab allocator code viewer + interactive 16-chunk allocator memory pool visualizer.
   - **Echo Radio 104.5 (WebAudio)**: DSP code viewer + live interactive pentatonic chord pads with real-time canvas oscilloscope!
8. **Encrypted Signal Transmitter (Contact)**:
   - Interactive terminal form with live progressive carrier telemetry logs.

---

## 🚀 How to Run Locally

You can open `index.html` directly in any modern browser:
```bash
# Simply open in your default browser:
start index.html
```

Or run with a local HTTP server:
```bash
# Using Python:
python -m http.server 8000

# Using Node:
npx serve .
```
Then navigate to `http://localhost:8000` in your web browser.
