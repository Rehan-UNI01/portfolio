/**
 * ============================================================================
 * SONNY BOY // 漂流 PORTFOLIO ENGINE (script.js)
 * Zero-Gravity Physics (Matter.js), Hand-Drawn Wires, Lo-Fi Web Audio,
 * Interactive Code Inspector & Live Execution Runners.
 * ============================================================================
 */

(function () {
  'use strict';

  // --- MODULE ALIASES (Matter.js) ---
  const {
    Engine,
    Runner,
    Bodies,
    Composite,
    Mouse,
    MouseConstraint,
    Body,
    Events
  } = Matter;

  // --- GLOBAL STATE ---
  const state = {
    engine: null,
    runner: null,
    mouseConstraint: null,
    physicsElements: [], // mapping { domEl, body, width, height, sectionOffsetX, sectionOffsetY, initialPos, initialAngle }
    isZeroG: true,
    currentRule: 'zero-g',
    audioPlaying: false,
    audioContext: null,
    synthTimeout: null,
    wires: [],
    mousePos: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  };

  // ==========================================================================
  // 1. HUD TIMECODE & BROADCAST CLOCK
  // ==========================================================================
  function initTimecode() {
    const timeCodeEl = document.getElementById('time-code');
    if (!timeCodeEl) return;

    const startTime = performance.now();
    function updateClock() {
      const elapsed = performance.now() - startTime;
      const totalSeconds = Math.floor(elapsed / 1000);
      const ms = Math.floor((elapsed % 1000) / 10);
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      const frames = String(ms).padStart(2, '0');

      timeCodeEl.textContent = `${hours}:${minutes}:${seconds}:${frames}`;
      requestAnimationFrame(updateClock);
    }
    requestAnimationFrame(updateClock);
  }

  // ==========================================================================
  // 2. CUSTOM CURSOR TRACKING
  // ==========================================================================
  function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const container = document.getElementById('physics-container');
      const containerRect = container ? container.getBoundingClientRect() : { left: 0, top: 0 };
      state.mousePos.x = e.clientX - containerRect.left;
      state.mousePos.y = e.clientY - containerRect.top;
    });

    window.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
    });

    window.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });
  }

  // ==========================================================================
  // 3. MATTER.JS ZERO-GRAVITY PHYSICS ENGINE
  // ==========================================================================
  function initPhysics() {
    const container = document.getElementById('physics-container');
    if (!container || window.innerWidth < 900) {
      // Allow regular vertical scrolling on narrow mobile viewports
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const worldWidth = window.innerWidth;
    const worldHeight = Math.max(container.scrollHeight, window.innerHeight * 4);

    // Create Matter Engine
    state.engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0.001 }
    });

    // Boundary walls (top, bottom, left, right)
    const wallThickness = 160;
    const wallOptions = { isStatic: true, restitution: 0.85, friction: 0.05 };

    const topWall = Bodies.rectangle(worldWidth / 2, -wallThickness / 2, worldWidth * 2, wallThickness, wallOptions);
    const bottomWall = Bodies.rectangle(worldWidth / 2, worldHeight + wallThickness / 2, worldWidth * 2, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, worldHeight / 2, wallThickness, worldHeight * 2, wallOptions);
    const rightWall = Bodies.rectangle(worldWidth + wallThickness / 2, worldHeight / 2, wallThickness, worldHeight * 2, wallOptions);

    Composite.add(state.engine.world, [topWall, bottomWall, leftWall, rightWall]);

    // Query all physics active DOM items
    const domItems = document.querySelectorAll('.physics-item');

    domItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const parentSection = el.closest('.dimension-section');
      const sectionRect = parentSection ? parentSection.getBoundingClientRect() : containerRect;

      const sectionOffsetX = sectionRect.left - containerRect.left;
      const sectionOffsetY = sectionRect.top - containerRect.top;

      // Absolute coordinates inside container
      const posX = rect.left - containerRect.left + rect.width / 2;
      const posY = rect.top - containerRect.top + rect.height / 2;

      const mass = parseFloat(el.getAttribute('data-mass')) || 8;
      const restitution = parseFloat(el.getAttribute('data-restitution')) || 0.75;

      // Create Matter Body
      const body = Bodies.rectangle(posX, posY, rect.width, rect.height, {
        mass: mass,
        restitution: restitution,
        frictionAir: 0.025, // Dreamy zero-g float dampening
        friction: 0.02,
        chamfer: { radius: 6 }
      });

      Composite.add(state.engine.world, body);

      const initialAngle = (Math.random() - 0.5) * 0.08;
      Body.setAngle(body, initialAngle);
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 0.4,
        y: (Math.random() - 0.5) * 0.4
      });

      state.physicsElements.push({
        domEl: el,
        body: body,
        width: rect.width,
        height: rect.height,
        sectionOffsetX: sectionOffsetX,
        sectionOffsetY: sectionOffsetY,
        initialPos: { x: posX, y: posY },
        initialAngle: initialAngle
      });
    });

    // Setup Mouse & MouseConstraint
    const mouse = Mouse.create(document.body);
    state.mouseConstraint = MouseConstraint.create(state.engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.18,
        damping: 0.08,
        render: { visible: false }
      }
    });

    // Sync scroll offset with Matter.js mouse
    function syncMouseScroll() {
      if (state.mouseConstraint && state.mouseConstraint.mouse) {
        const cRect = container.getBoundingClientRect();
        Mouse.setOffset(state.mouseConstraint.mouse, {
          x: -cRect.left,
          y: -cRect.top
        });
      }
    }
    window.addEventListener('scroll', syncMouseScroll, { passive: true });
    syncMouseScroll();

    // Prevent default scroll blocking by matter mouse
    state.mouseConstraint.mouse.element.removeEventListener(
      'mousewheel',
      state.mouseConstraint.mouse.mousewheel
    );
    state.mouseConstraint.mouse.element.removeEventListener(
      'DOMMouseScroll',
      state.mouseConstraint.mouse.mousewheel
    );

    Composite.add(state.engine.world, state.mouseConstraint);

    // Don't grab cards if user clicked on an input, textarea, button, or link
    Events.on(state.mouseConstraint, 'startdrag', function (e) {
      const activeObj = state.physicsElements.find((item) => item.body === e.body);
      if (activeObj) {
        // Check if user clicked an interactive child
        const target = document.elementFromPoint(
          state.mouseConstraint.mouse.absolute.x,
          state.mouseConstraint.mouse.absolute.y
        );
        if (target && target.closest('input, textarea, button, a, code, pre')) {
          state.mouseConstraint.constraint.bodyB = null;
          return;
        }
        activeObj.domEl.classList.add('is-grabbed');
      }
    });

    Events.on(state.mouseConstraint, 'enddrag', function (e) {
      const activeObj = state.physicsElements.find((item) => item.body === e.body);
      if (activeObj) {
        activeObj.domEl.classList.remove('is-grabbed');
      }
    });

    // Runner
    state.runner = Runner.create();
    Runner.run(state.runner, state.engine);

    // Continuous Frame Sync Loop
    function renderLoop() {
      const now = performance.now() * 0.001;

      state.physicsElements.forEach((item, index) => {
        const { domEl, body, width, height, sectionOffsetX, sectionOffsetY } = item;

        // Zero-G drift mode: subtle water-like waves & soft boundary anchoring
        if (state.isZeroG) {
          // Sinusoidal floating drift
          const driftForceX = Math.sin(now * 0.6 + index * 1.2) * 0.00003 * body.mass;
          const driftForceY = Math.cos(now * 0.8 + index * 1.5) * 0.00003 * body.mass;
          Body.applyForce(body, body.position, { x: driftForceX, y: driftForceY });

          // Soft elastic anchor to retain readability in its dimension zone
          const dx = item.initialPos.x - body.position.x;
          const dy = item.initialPos.y - body.position.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 190) {
            const pull = (dist - 190) * 0.0000025 * body.mass;
            Body.applyForce(body, body.position, {
              x: (dx / dist) * pull,
              y: (dy / dist) * pull
            });
          }

          // Gentle angular stabilization (keeps text readable while stylishly tilted)
          const angleDiff = item.initialAngle - body.angle;
          if (Math.abs(angleDiff) > 0.05) {
            Body.setAngularVelocity(body, body.angularVelocity * 0.95 + angleDiff * 0.008);
          }
        }

        // Pointer disturbance: cursor wake pushing nearby debris aside like water
        const mouseDistX = body.position.x - state.mousePos.x;
        const mouseDistY = body.position.y - state.mousePos.y;
        const mouseDist = Math.hypot(mouseDistX, mouseDistY);

        // Debris badges and small assets react strongly to cursor wake
        const isDebris = domEl.classList.contains('skill-badge') || domEl.classList.contains('code-shard') || domEl.id === 'paper-plane';
        const wakeRadius = isDebris ? 130 : 90;

        if (mouseDist < wakeRadius && mouseDist > 5) {
          const wakeStrength = (wakeRadius - mouseDist) * (isDebris ? 0.000015 : 0.000006) * body.mass;
          Body.applyForce(body, body.position, {
            x: (mouseDistX / mouseDist) * wakeStrength,
            y: (mouseDistY / mouseDist) * wakeStrength
          });
        }

        // Apply synchronized transform to DOM element
        const x = body.position.x - width / 2 - sectionOffsetX;
        const y = body.position.y - height / 2 - sectionOffsetY;
        const deg = body.angle * (180 / Math.PI);

        domEl.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${deg}deg)`;
        domEl.style.left = '0px';
        domEl.style.top = '0px';
      });

      // Update tethered power wires
      updateWires();

      // Paper airplane flight tracking
      updatePaperPlaneInteraction();

      requestAnimationFrame(renderLoop);
    }

    requestAnimationFrame(renderLoop);

    // Resize handler
    window.addEventListener('resize', debounce(() => {
      if (state.engine) {
        topWall.position.x = window.innerWidth / 2;
        bottomWall.position.x = window.innerWidth / 2;
        rightWall.position.x = window.innerWidth + wallThickness / 2;
      }
      syncMouseScroll();
    }, 200));
  }

  // ==========================================================================
  // 4. INTERACTIVE PAPER AIRPLANE FLEEING / FLIGHT
  // ==========================================================================
  function updatePaperPlaneInteraction() {
    const planeItem = state.physicsElements.find(
      (item) => item.domEl.id === 'paper-plane'
    );
    if (!planeItem) return;

    const body = planeItem.body;
    const dx = body.position.x - state.mousePos.x;
    const dy = body.position.y - state.mousePos.y;
    const dist = Math.hypot(dx, dy);

    // When cursor approaches within 120px, airplane darts away with speed
    if (dist < 120 && dist > 5) {
      const forceMag = (120 - dist) * 0.000045;
      Body.applyForce(body, body.position, {
        x: (dx / dist) * forceMag,
        y: (dy / dist) * forceMag
      });
      // Point plane towards its heading
      const angle = Math.atan2(body.velocity.y, body.velocity.x);
      Body.setAngle(body, angle);
    }
  }

  // ==========================================================================
  // 5. DYNAMIC POWER WIRES (SVG BEZIER CURVES)
  // ==========================================================================
  function initWires() {
    const svg = document.getElementById('wire-canvas');
    const container = document.getElementById('physics-container');
    if (!svg || !container) return;

    // Ensure SVG canvas covers container height
    svg.style.height = `${container.scrollHeight || 3800}px`;

    state.wires = [
      { fromId: 'pole-hero', toId: 'hero-title-card', sag: 45, color: '#0D0F12', width: 2.5 },
      { fromId: 'pole-hero', toId: 'chair-hero', sag: 60, color: '#1A66FF', width: 2 },
      { fromId: 'contact-terminal', toId: 'pin-github', sag: 35, color: '#0D0F12', width: 2.5 },
      { fromId: 'pin-github', toId: 'pin-linkedin', sag: 28, color: '#00CC99', width: 2 },
      { fromId: 'pin-linkedin', toId: 'pin-email', sag: 32, color: '#FF3B30', width: 2.5 }
    ];

    svg.innerHTML = '';
    state.wires.forEach((wire, i) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('id', `wire-path-${i}`);
      path.setAttribute('stroke', wire.color);
      path.setAttribute('stroke-width', wire.width);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('filter', 'url(#hand-drawn)');
      svg.appendChild(path);
      wire.pathEl = path;
    });
  }

  function updateWires() {
    const container = document.getElementById('physics-container');
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    state.wires.forEach((wire) => {
      const el1 = document.getElementById(wire.fromId);
      const el2 = document.getElementById(wire.toId);
      if (!el1 || !el2 || !wire.pathEl) return;

      const r1 = el1.getBoundingClientRect();
      const r2 = el2.getBoundingClientRect();

      const x1 = r1.left - containerRect.left + r1.width / 2;
      const y1 = r1.top - containerRect.top + r1.height / 2;
      const x2 = r2.left - containerRect.left + r2.width / 2;
      const y2 = r2.top - containerRect.top + r2.height / 2;

      // Catenary quadratic curve with gravity sag
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 + wire.sag;

      const d = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
      wire.pathEl.setAttribute('d', d);
    });
  }

  // ==========================================================================
  // 6. STUDENT COUNCIL WORLD RULES (PHYSICS MODES)
  // ==========================================================================
  function initRuleControls() {
    const ruleBtn = document.getElementById('rule-btn');
    const rulesMenu = document.getElementById('rules-menu');
    const ruleOpts = document.querySelectorAll('.rule-opt');
    const resetBtn = document.getElementById('reset-physics-btn');

    if (!ruleBtn || !rulesMenu) return;

    ruleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      rulesMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      rulesMenu.classList.remove('show');
    });

    ruleOpts.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        ruleOpts.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const rule = btn.getAttribute('data-rule');
        applyRule(rule);
        rulesMenu.classList.remove('show');
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        reAnchorAllObjects();
        rulesMenu.classList.remove('show');
      });
    }
  }

  function applyRule(rule) {
    if (!state.engine) return;
    state.currentRule = rule;

    document.body.classList.remove('mode-blackout');

    switch (rule) {
      case 'zero-g':
        state.isZeroG = true;
        state.engine.world.gravity.y = 0;
        state.engine.world.gravity.x = 0;
        state.physicsElements.forEach((item) => {
          item.body.frictionAir = 0.025;
        });
        break;

      case 'earth-g':
        state.isZeroG = false;
        state.engine.world.gravity.y = 0.9;
        state.engine.world.gravity.x = 0;
        state.physicsElements.forEach((item) => {
          item.body.frictionAir = 0.005;
        });
        break;

      case 'super-drift':
        state.isZeroG = true;
        state.engine.world.gravity.y = 0;
        state.engine.world.gravity.x = 0;
        state.physicsElements.forEach((item) => {
          item.body.frictionAir = 0.008;
          Body.setVelocity(item.body, {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
          });
          Body.setAngularVelocity(item.body, (Math.random() - 0.5) * 0.15);
        });
        break;

      case 'blackout':
        state.isZeroG = true;
        document.body.classList.add('mode-blackout');
        state.engine.world.gravity.y = 0;
        break;
    }
  }

  function reAnchorAllObjects() {
    state.physicsElements.forEach((item) => {
      const body = item.body;
      Body.setPosition(body, {
        x: item.initialPos.x,
        y: item.initialPos.y
      });
      Body.setVelocity(body, { x: 0, y: 0 });
      Body.setAngle(body, item.initialAngle);
      Body.setAngularVelocity(body, 0);
    });
  }

  // ==========================================================================
  // 7. LO-FI WEBAUDIO AMBIENT GENERATOR (OST: "SUMMER DRIFT")
  // Inspired by Toe, Sunset Rollercoaster, and Sonny Boy OST
  // ==========================================================================
  function initAmbientAudio() {
    const audioBtn = document.getElementById('audio-toggle-btn');
    if (!audioBtn) return;

    // Pentatonic dream-pop scale frequencies (D major / F# minor)
    const pentatonicNotes = [
      146.83, // D3
      164.81, // E3
      185.00, // F#3
      220.00, // A3
      246.94, // B3
      293.66, // D4
      329.63, // E4
      369.99, // F#4
      440.00, // A4
      493.88, // B4
      587.33  // D5
    ];

    audioBtn.addEventListener('click', () => {
      if (!state.audioPlaying) {
        startAudio();
      } else {
        stopAudio();
      }
    });

    function startAudio() {
      if (!state.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        state.audioContext = new AudioCtx();
      }

      if (state.audioContext.state === 'suspended') {
        state.audioContext.resume();
      }

      state.audioPlaying = true;
      audioBtn.classList.add('playing');

      const masterGain = state.audioContext.createGain();
      masterGain.gain.setValueAtTime(0.2, state.audioContext.currentTime);

      // Lowpass warmth to emulate anime tape cassette
      const filter = state.audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, state.audioContext.currentTime);

      filter.connect(masterGain);
      masterGain.connect(state.audioContext.destination);

      function playChime() {
        if (!state.audioPlaying) return;

        const ctx = state.audioContext;
        const now = ctx.currentTime;
        const noteFreq = pentatonicNotes[Math.floor(Math.random() * pentatonicNotes.length)];

        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = Math.random() > 0.4 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(noteFreq, now);

        const duration = 2.4 + Math.random() * 1.2;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.18, now + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(noteGain);
        noteGain.connect(filter);

        osc.start(now);
        osc.stop(now + duration);

        const nextTime = 450 + Math.random() * 850;
        state.synthTimeout = setTimeout(playChime, nextTime);
      }

      playChime();
    }

    function stopAudio() {
      state.audioPlaying = false;
      audioBtn.classList.remove('playing');
      if (state.synthTimeout) clearTimeout(state.synthTimeout);
    }
  }

  // ==========================================================================
  // 8. MINI OSCILLOSCOPE CANVAS (PROJECT CARD 4)
  // ==========================================================================
  function initMiniOscilloscope() {
    const canvas = document.getElementById('mini-oscilloscope');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let phase = 0;
    function drawWave() {
      ctx.fillStyle = '#0B0E14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#00E5A3';
      ctx.beginPath();

      const centerY = canvas.height / 2;
      for (let x = 0; x < canvas.width; x++) {
        const y =
          centerY +
          Math.sin(x * 0.05 + phase) * 14 +
          Math.sin(x * 0.12 - phase * 1.5) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.06;
      requestAnimationFrame(drawWave);
    }
    requestAnimationFrame(drawWave);
  }

  // ==========================================================================
  // 9. COMPASS AZIMUTH DIAL (PROJECT CARD 2)
  // ==========================================================================
  function initCompassTracking() {
    const needle = document.getElementById('compass-needle');
    const readout = document.getElementById('compass-heading-text');
    if (!needle) return;

    window.addEventListener('mousemove', (e) => {
      const rect = needle.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angleRad = Math.atan2(e.clientY - cy, e.clientX - cx);
      let angleDeg = Math.round(angleRad * (180 / Math.PI) + 90);
      if (angleDeg < 0) angleDeg += 360;

      needle.style.transform = `rotate(${angleDeg}deg)`;
      if (readout) {
        readout.textContent = `HEADING: ${angleDeg}° [DRIFT VECTOR]`;
      }
    });
  }

  // ==========================================================================
  // 10. PROJECT DATA ARCHIVE (INSPECT & RUN DEMOS)
  // ==========================================================================
  const PROJECT_ARCHIVE = {
    router: {
      badge: 'PRJ // 01 • NETWORKING',
      title: 'DIMENSIONAL ROUTER (C++20 ENGINE)',
      fileName: 'src/router/engine.cpp',
      tag: 'C++20 ASYNC',
      status: 'HIGH-THROUGHPUT RING BUFFER // 0 PACKET LOSS',
      code: `// Dimensional Router: Zero-Copy Asynchronous Multiplexer
#include <iostream>
#include <sys/epoll.h>
#include <atomic>
#include <memory>
#include <vector>

template <typename PacketType, size_t RingSize = 65536>
class DimensionalRingBuffer {
private:
    std::vector<PacketType> ring_{RingSize};
    alignas(64) std::atomic<size_t> head_{0};
    alignas(64) std::atomic<size_t> tail_{0};

public:
    bool enqueue(const PacketType& packet) noexcept {
        const size_t current_tail = tail_.load(std::memory_order_relaxed);
        const size_t next_tail = (current_tail + 1) & (RingSize - 1);
        if (next_tail == head_.load(std::memory_order_acquire)) {
            return false; // Queue full: zero-drop backpressure
        }
        ring_[current_tail] = packet;
        tail_.store(next_tail, std::memory_order_release);
        return true;
    }

    bool dequeue(PacketType& out_packet) noexcept {
        const size_t current_head = head_.load(std::memory_order_relaxed);
        if (current_head == tail_.load(std::memory_order_acquire)) {
            return false; // Queue empty
        }
        out_packet = std::move(ring_[current_head]);
        head_.store((current_head + 1) & (RingSize - 1), std::memory_order_release);
        return true;
    }
};

int main() {
    std::cout << "[Sonny] Starting Dimensional Event Loop (epoll_create1)...\\n";
    return 0;
}`,
      renderDemo: (container) => {
        container.innerHTML = `
          <div style="background:#0D0F12; color:#FFF; padding:20px; border-radius:6px; font-family:var(--font-mono);">
            <div style="display:flex; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
              <span style="color:var(--ocean-mint); font-weight:bold;">▶ LIVE LATENCY BENCHMARK</span>
              <button id="btn-fire-packets" style="background:var(--sky-deep); color:#FFF; border:2px solid #000; padding:6px 14px; font-weight:bold; cursor:pointer; border-radius:4px;">BURST 10,000 PACKETS</button>
            </div>
            <div id="router-telemetry-box" style="background:#171C24; padding:12px; border-radius:4px; height:180px; overflow-y:auto; font-size:0.75rem; line-height:1.6;">
              <div style="color:#718096;">[SYS] Standby: Ready for packet dispatch...</div>
            </div>
          </div>
        `;
        const fireBtn = container.querySelector('#btn-fire-packets');
        const box = container.querySelector('#router-telemetry-box');
        fireBtn.addEventListener('click', () => {
          let count = 0;
          box.innerHTML = '';
          const intId = setInterval(() => {
            count += 1000;
            const latency = (0.08 + Math.random() * 0.05).toFixed(3);
            const line = document.createElement('div');
            line.innerHTML = `<span style="color:var(--ocean-mint); font-weight:bold;">[BURST ${count}/10000]</span> Processed via RingBuffer • Latency: ${latency}ms • Status: 200 OK`;
            box.appendChild(line);
            box.scrollTop = box.scrollHeight;
            if (count >= 10000) clearInterval(intId);
          }, 60);
        });
      }
    },

    compass: {
      badge: 'PRJ // 02 • TOOLING',
      title: 'COMPASS CLI (AST NAVIGATOR)',
      fileName: 'compass/navigator.py',
      tag: 'PYTHON 3.11 AST',
      status: 'AST TREE TRAVERSED // 42 MODULES INDEXED',
      code: `"""
Compass CLI: Spatial AST Navigator for Distributed Codebases
Finds execution trajectories through complex code monoliths.
"""
import ast
import os
from pathlib import Path
from rich.console import Console
from rich.tree import Tree

console = Console()

class CodeVectorAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.routes = []
        self.current_scope = []

    def visit_FunctionDef(self, node):
        scope_path = "::".join(self.current_scope + [node.name])
        self.routes.append((scope_path, node.lineno))
        self.current_scope.append(node.name)
        self.generic_visit(node)
        self.current_scope.pop()

def scan_dimension(root_path: str):
    tree = Tree(f"[bold cyan]DRIFT VECTOR // {root_path}[/bold cyan]")
    for path in Path(root_path).rglob("*.py"):
        branch = tree.add(f"[green]{path.name}[/green]")
        with open(path, "r", encoding="utf-8") as f:
            analyzer = CodeVectorAnalyzer()
            analyzer.visit(ast.parse(f.read()))
            for route, line in analyzer.routes:
                branch.add(f"[dim]{route}[/dim] (L{line})")
    console.print(tree)
`,
      renderDemo: (container) => {
        container.innerHTML = `
          <div style="background:#0D0F12; color:#FFF; padding:20px; border-radius:6px; font-family:var(--font-mono);">
            <div style="display:flex; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
              <span style="color:var(--sky-light); font-weight:bold;">▶ SPATIAL DIRECTORY TREE MAPPER</span>
              <button id="btn-run-ast" style="background:var(--ocean-teal); color:#000; border:2px solid #000; padding:6px 14px; font-weight:bold; cursor:pointer; border-radius:4px;">RUN SCAN</button>
            </div>
            <pre id="ast-out-box" style="background:#171C24; padding:14px; border-radius:4px; height:180px; overflow-y:auto; font-size:0.75rem; color:#A0AEC0; margin:0;">
Click 'RUN SCAN' to parse filesystem AST...
            </pre>
          </div>
        `;
        const runBtn = container.querySelector('#btn-run-ast');
        const out = container.querySelector('#ast-out-box');
        runBtn.addEventListener('click', () => {
          out.innerHTML = `
<span style="color:#66C2FF; font-weight:bold;">📁 ROOT: /src/monolith/</span>
  ├── 📄 engine.py
  │    ├── <span style="color:#00CC99;">class VoidRouter</span> (L14)
  │    │    └── <span style="color:#FFF;">def dispatch_packet()</span> (L28) -> Vector: [324° NW]
  │    └── <span style="color:#FFF;">def listen_epoll()</span> (L89)
  ├── 📄 memory.py
  │    └── <span style="color:#00CC99;">class SlabAllocator</span> (L5)
  │         └── <span style="color:#FFF;">def reclaim_chunk()</span> (L42)
  └── 📄 telemetry.py
       └── <span style="color:#FFF;">def ping_earth()</span> (L12) [UNREACHABLE]
<span style="color:#00E5A3; font-weight:bold;">✓ Scan completed in 4.8ms. Total symbols: 128</span>
          `;
        });
      }
    },

    allocator: {
      badge: 'PRJ // 03 • SYSTEMS',
      title: 'VOID SLAB ALLOCATOR (C99)',
      fileName: 'kernel/slab_alloc.c',
      tag: 'C99 BARE METAL',
      status: 'SLAB POOL: 64MB ACTIVE // CACHE ALIGNED',
      code: `// Deterministic O(1) Slab Allocator
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#define CACHE_LINE_SIZE 64
#define SLAB_OBJECT_SIZE 128
#define OBJECTS_PER_SLAB 512

typedef struct SlabObject {
    struct SlabObject* next_free;
} SlabObject;

typedef struct Slab {
    uint8_t memory_pool[OBJECTS_PER_SLAB * SLAB_OBJECT_SIZE];
    SlabObject* free_list;
    size_t allocated_count;
} Slab;

void slab_init(Slab* slab) {
    slab->allocated_count = 0;
    slab->free_list = (SlabObject*)slab->memory_pool;
    
    // Construct singly linked freelist in cache-aligned sequence
    for (size_t i = 0; i < OBJECTS_PER_SLAB - 1; ++i) {
        SlabObject* cur = (SlabObject*)&slab->memory_pool[i * SLAB_OBJECT_SIZE];
        cur->next_free = (SlabObject*)&slab->memory_pool[(i + 1) * SLAB_OBJECT_SIZE];
    }
    ((SlabObject*)&slab->memory_pool[(OBJECTS_PER_SLAB - 1) * SLAB_OBJECT_SIZE])->next_free = NULL;
}

void* slab_alloc(Slab* slab) {
    if (!slab->free_list) return NULL; // Out of slab memory
    SlabObject* obj = slab->free_list;
    slab->free_list = obj->next_free;
    slab->allocated_count++;
    return (void*)obj;
}
`,
      renderDemo: (container) => {
        container.innerHTML = `
          <div style="background:#0D0F12; color:#FFF; padding:20px; border-radius:6px; font-family:var(--font-mono);">
            <div style="display:flex; justify-content:space-between; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
              <span style="color:var(--warning-red); font-weight:bold;">▶ SLAB ALLOCATOR LIVE BLOCKS (16 CHUNKS)</span>
              <div>
                <button id="btn-slab-alloc" style="background:var(--ocean-teal); color:#000; border:2px solid #000; padding:4px 10px; font-weight:bold; cursor:pointer; border-radius:4px; margin-right:6px;">ALLOC(128B)</button>
                <button id="btn-slab-free" style="background:var(--paper-cream); color:#000; border:2px solid #000; padding:4px 10px; font-weight:bold; cursor:pointer; border-radius:4px;">FREE()</button>
              </div>
            </div>
            <div id="slab-visual-blocks" style="display:grid; grid-template-columns:repeat(8, 1fr); gap:6px; margin:16px 0;">
              ${Array.from({ length: 16 })
                .map(
                  (_, i) =>
                    `<div class="demo-slab-box" id="sbox-${i}" style="height:32px; background:#222933; border:2px solid #000; border-radius:3px; display:flex; align-items:center; justify-content:center; font-size:0.65rem;">#${i}</div>`
                )
                .join('')}
            </div>
            <div id="slab-status-line" style="font-size:0.75rem; color:#A0AEC0;">
              Total: 16 Chunks | Allocated: 0 | Freelist: 16
            </div>
          </div>
        `;

        let allocatedCount = 0;
        const allocBtn = container.querySelector('#btn-slab-alloc');
        const freeBtn = container.querySelector('#btn-slab-free');
        const statusLine = container.querySelector('#slab-status-line');

        allocBtn.addEventListener('click', () => {
          if (allocatedCount < 16) {
            const el = container.querySelector(`#sbox-${allocatedCount}`);
            if (el) {
              el.style.background = '#00A3FF';
              el.style.color = '#FFF';
            }
            allocatedCount++;
            statusLine.textContent = `Total: 16 Chunks | Allocated: ${allocatedCount} | Freelist: ${16 - allocatedCount}`;
          }
        });

        freeBtn.addEventListener('click', () => {
          if (allocatedCount > 0) {
            allocatedCount--;
            const el = container.querySelector(`#sbox-${allocatedCount}`);
            if (el) {
              el.style.background = '#222933';
              el.style.color = '#A0AEC0';
            }
            statusLine.textContent = `Total: 16 Chunks | Allocated: ${allocatedCount} | Freelist: ${16 - allocatedCount}`;
          }
        });
      }
    },

    synth: {
      badge: 'PRJ // 04 • AUDIO DSP',
      title: 'ECHO RADIO 104.5 (WEBAUDIO SYNTH)',
      fileName: 'audio/synth_node.js',
      tag: 'WEBAUDIO DSP',
      status: 'FM CARRIER READY // STEREO BIQUAD ACTIVE',
      code: `// Echo Radio 104.5: Procedural FM Tape Flutter Node
class EchoRadioSynth {
  constructor(audioCtx) {
    this.ctx = audioCtx;
    this.carrier = this.ctx.createOscillator();
    this.modulator = this.ctx.createOscillator();
    this.modGain = this.ctx.createGain();
    this.filter = this.ctx.createBiquadFilter();

    // FM Modulation routing
    this.modulator.frequency.value = 4.5; // Tape flutter frequency (Hz)
    this.modGain.gain.value = 12.0;       // Flutter depth

    this.modulator.connect(this.modGain);
    this.modGain.connect(this.carrier.frequency);

    this.filter.type = 'bandpass';
    this.filter.frequency.value = 1045.0; // 104.5 MHz carrier resonance
    this.filter.Q.value = 3.2;

    this.carrier.connect(this.filter);
  }

  triggerTone(freq = 440, duration = 1.5) {
    this.carrier.frequency.setValueAtTime(freq, this.ctx.currentTime);
    // Envelope triggered via WebAudio AudioParam scheduling
  }
}
`,
      renderDemo: (container) => {
        container.innerHTML = `
          <div style="background:#0D0F12; color:#FFF; padding:20px; border-radius:6px; font-family:var(--font-mono);">
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
              <span style="color:var(--warning-pink); font-weight:bold;">▶ INTERACTIVE PENTATONIC TONE PAD</span>
            </div>
            <p style="font-size:0.75rem; color:#A0AEC0; margin-bottom:14px;">Click any pad to trigger an authentic tape flutter chord:</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              ${[
                { label: 'PAD A (D4)', f: 293.66 },
                { label: 'PAD B (F#4)', f: 369.99 },
                { label: 'PAD C (A4)', f: 440.0 },
                { label: 'PAD D (B4)', f: 493.88 },
                { label: 'PAD E (D5)', f: 587.33 }
              ]
                .map(
                  (p) =>
                    `<button class="synth-demo-pad" data-freq="${p.f}" style="background:var(--paper-cream); color:#000; border:2.5px solid #000; padding:10px 14px; font-weight:bold; cursor:pointer; border-radius:4px; box-shadow:3px 3px 0px #000;">${p.label}</button>`
                )
                .join('')}
            </div>
          </div>
        `;

        const pads = container.querySelectorAll('.synth-demo-pad');
        pads.forEach((pad) => {
          pad.addEventListener('click', () => {
            const freq = parseFloat(pad.getAttribute('data-freq'));
            playSimpleTone(freq);
          });
        });

        function playSimpleTone(freq) {
          try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            g.gain.setValueAtTime(0.2, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
            osc.connect(g);
            g.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1.2);
          } catch (e) {
            console.warn(e);
          }
        }
      }
    }
  };

  // ==========================================================================
  // 11. PROJECT MODAL CONTROLLER
  // ==========================================================================
  function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const tabCodeBtn = document.getElementById('modal-tab-code');
    const tabRunBtn = document.getElementById('modal-tab-run');
    const tabCodeContent = document.getElementById('tab-content-code');
    const tabRunContent = document.getElementById('tab-content-run');

    const badgeEl = document.getElementById('modal-project-badge');
    const titleEl = document.getElementById('modal-project-title');
    const fileNameEl = document.getElementById('code-file-name');
    const codeSnippetEl = document.getElementById('code-snippet-box');
    const demoRunnerArea = document.getElementById('demo-runner-area');
    const statusEl = document.getElementById('modal-footer-status');
    const copyBtn = document.getElementById('modal-action-copy');

    if (!modal) return;

    let currentProjectKey = 'router';

    // Click on Inspect or Run in any Project Card
    document.querySelectorAll('.proj-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectKey = btn.getAttribute('data-project');
        const isRun = btn.classList.contains('btn-run');
        openModal(projectKey, isRun ? 'run' : 'code');
      });
    });

    function openModal(key, initialTab = 'code') {
      currentProjectKey = key;
      const data = PROJECT_ARCHIVE[key];
      if (!data) return;

      badgeEl.textContent = data.badge;
      titleEl.textContent = data.title;
      fileNameEl.textContent = data.fileName;
      codeSnippetEl.textContent = data.code;
      statusEl.textContent = data.status;

      // Render Demo Tab
      data.renderDemo(demoRunnerArea);

      // Select Tab
      selectTab(initialTab);

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function selectTab(tab) {
      if (tab === 'code') {
        tabCodeBtn.classList.add('active');
        tabRunBtn.classList.remove('active');
        tabCodeContent.classList.add('active');
        tabRunContent.classList.remove('active');
      } else {
        tabCodeBtn.classList.remove('active');
        tabRunBtn.classList.add('active');
        tabCodeContent.classList.remove('active');
        tabRunContent.classList.add('active');
      }
    }

    tabCodeBtn.addEventListener('click', () => selectTab('code'));
    tabRunBtn.addEventListener('click', () => selectTab('run'));

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    copyBtn.addEventListener('click', () => {
      const data = PROJECT_ARCHIVE[currentProjectKey];
      if (data && navigator.clipboard) {
        navigator.clipboard.writeText(data.code).then(() => {
          copyBtn.textContent = 'COPIED!';
          setTimeout(() => {
            copyBtn.textContent = 'COPY SNIPPET';
          }, 1800);
        });
      }
    });
  }

  // ==========================================================================
  // 12. STUDENT DOSSIER RESUME MODAL & PRINT
  // ==========================================================================
  function initResumeModal() {
    const resumeModal = document.getElementById('resume-modal');
    const openBtn = document.getElementById('btn-resume-modal');
    const closeBtn = document.getElementById('resume-close-btn');
    const printBtn = document.getElementById('btn-print-resume');

    if (!resumeModal || !openBtn) return;

    openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // ==========================================================================
  // 13. TRANSMISSION FORM (SIGNALING HOME)
  // ==========================================================================
  function initTransmitterForm() {
    const form = document.getElementById('transmitter-form');
    const logBox = document.getElementById('transmission-log');
    const callsignInput = document.getElementById('sender-callsign');
    const channelInput = document.getElementById('sender-channel');
    const messageInput = document.getElementById('sender-message');

    if (!form || !logBox) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const callsign = callsignInput.value.trim();
      const channel = channelInput.value.trim();
      const msg = messageInput.value.trim();

      if (!callsign || !channel || !msg) return;

      logBox.innerHTML = `
        <div style="color:var(--warning-red); font-weight:bold;">[TX INITIATED] Modulating radio wave for '${callsign}'...</div>
      `;

      setTimeout(() => {
        logBox.innerHTML += `
          <div>> Channel: ${channel} :: Encrypting zero-gravity packet...</div>
        `;
      }, 500);

      setTimeout(() => {
        logBox.innerHTML += `
          <div style="color:var(--ocean-mint); font-weight:bold;">> [CONFIRMED] Signal received in Mohammad Rehan's drifting terminal!</div>
          <div style="color:#FFF;">> Thank you, ${callsign}. Response wire established.</div>
        `;
        form.reset();
      }, 1200);
    });
  }

  // ==========================================================================
  // 14. HUD NAVIGATION SMOOTH SCROLLING
  // ==========================================================================
  function initHudNav() {
    const navChips = document.querySelectorAll('.nav-chip');
    navChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const targetId = `section-${chip.getAttribute('data-target')}`;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          navChips.forEach((c) => c.classList.remove('active'));
          chip.classList.add('active');
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Enter Void Button in Hero
    const enterVoidBtn = document.getElementById('btn-enter-void');
    if (enterVoidBtn) {
      enterVoidBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('section-projects');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // --- UTILS ---
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // ==========================================================================
  // BOOTSTRAP APPLICATION
  // ==========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    initTimecode();
    initCustomCursor();
    initPhysics();
    initWires();
    initRuleControls();
    initAmbientAudio();
    initMiniOscilloscope();
    initCompassTracking();
    initProjectModals();
    initResumeModal();
    initTransmitterForm();
    initHudNav();
  });
})();
