// Sonny Boy Ethereal Web Audio Synthesizer & Sound Effects
class DriftAudioSystem {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.filterNode = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.noiseNode = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
  }

  toggleAmbient() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  startAmbient() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // Master gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.14, now + 3);
      this.gainNode.connect(this.ctx.destination);

      // Low pass filter for warm analog feel
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(420, now);
      this.filterNode.Q.setValueAtTime(3.5, now);
      this.filterNode.connect(this.gainNode);

      // Ethereal Drone Osc 1 (Sine in D)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(146.83, now); // D3

      // Ethereal Drone Osc 2 (Slight detune for tape chorus)
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(220.00, now); // A3

      // LFO for gentle wind breathing
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, now); // slow breathing
      lfoGain.gain.setValueAtTime(60, now);
      lfo.connect(lfoGain);
      lfoGain.connect(this.filterNode.frequency);
      lfo.start();

      this.droneOsc1.connect(this.filterNode);
      this.droneOsc2.connect(this.filterNode);

      this.droneOsc1.start();
      this.droneOsc2.start();

      this.isPlaying = true;
    } catch (e) {
      console.warn("Audio start error:", e);
    }
  }

  stopAmbient() {
    if (!this.gainNode || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.gainNode.gain.linearRampToValueAtTime(0.0001, now + 1.5);
    setTimeout(() => {
      try {
        if (this.droneOsc1) this.droneOsc1.stop();
        if (this.droneOsc2) this.droneOsc2.stop();
      } catch (e) {}
      this.isPlaying = false;
    }, 1500);
  }

  playBlip(freq = 580, type = 'sine', duration = 0.08) {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }

  playSpringBoing() {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(660, now + 0.12);
      osc.frequency.linearRampToValueAtTime(330, now + 0.25);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  playTransmission() {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      // Morse code sequence
      [0, 0.1, 0.2, 0.35, 0.45].forEach((delay, idx) => {
        setTimeout(() => {
          this.playBlip(idx % 2 === 0 ? 880 : 1100, 'square', 0.06);
        }, delay * 1000);
      });
    } catch (e) {}
  }
}

export const driftAudio = new DriftAudioSystem();
