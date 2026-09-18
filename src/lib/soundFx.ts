// Playful Retro Spy & Cartoon Web Audio Synthesizer
// Generates quirky, upbeat sound effects purely in code without external assets

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("mission_sound_enabled", enabled ? "true" : "false");
  }
}

export function getSoundEnabled(): boolean {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("mission_sound_enabled");
    if (saved !== null) {
      soundEnabled = saved === "true";
    }
  }
  return soundEnabled;
}

/**
 * Playful bleep-bloop pitch while holding biometric scanner
 */
export function playScanTick(progressPercent: number) {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Bubbly pitch that ascends playfully
    const freq = 320 + (progressPercent / 100) * 580;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch {
    // Ignore
  }
}

/**
 * Fun cartoon "boing / womp-womp" sound when scanner is released early
 */
export function playBoingCancel() {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Frequency wobbles down like a cartoon spring
    osc.type = "triangle";
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.12);
    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.28);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.28);
  } catch {
    // Ignore
  }
}

/**
 * Victory fanfare when fingerprint hits 100%
 */
export function playAccessGranted() {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // Upbeat celebratory arpeggio: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + idx * 0.09;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.15, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.3);
    });
  } catch {
    // Ignore
  }
}

/**
 * Heavy satisfying rubber stamp slam
 */
export function playStampThud() {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch {
    // Ignore
  }
}

/**
 * Click sound when unmasking redacted secret text
 */
export function playRedactUnveil() {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Ignore
  }
}

/**
 * Playful heartbeat pulse sound for virtual hug
 */
export function playHeartPulse() {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    [0, 0.2].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + offset;

      osc.type = "sine";
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.exponentialRampToValueAtTime(50, t + 0.14);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.14);
    });
  } catch {
    // Ignore
  }
}

/**
 * Funny dramatic siren tick for self-destruct countdown
 */
export function playCountdownBeep(isFinal: boolean = false) {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freq = isFinal ? 980 : 640;
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isFinal ? 0.3 : 0.12));

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + (isFinal ? 0.3 : 0.12));
  } catch {
    // Ignore
  }
}

/**
 * Cheerful party pop with chords for confetti
 */
export function playCelebrationPop() {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const chord = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C major 9th
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + i * 0.04;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  } catch {
    // Ignore
  }
}

/**
 * Lucky dice roll sound for Gachapon mood booster
 */
export function playGachaRoll() {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    [0, 0.06, 0.12, 0.18, 0.26].forEach((offset, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + offset;

      osc.type = "sine";
      osc.frequency.setValueAtTime(400 + idx * 120, t);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    });
  } catch {
    // Ignore
  }
}

/**
 * Cute, realistic cartoon kiss sound (lip smack / "Mwah! 💋" + sweet chime)
 */
export function playKissSound() {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. Suction & Lip Smack (Pop / Mwah sound)
    const smackOsc = ctx.createOscillator();
    const smackGain = ctx.createGain();

    smackOsc.type = "sine";
    // Quick suction sweep: 450Hz -> 1650Hz -> 600Hz
    smackOsc.frequency.setValueAtTime(450, now);
    smackOsc.frequency.exponentialRampToValueAtTime(1650, now + 0.04);
    smackOsc.frequency.exponentialRampToValueAtTime(600, now + 0.1);

    smackGain.gain.setValueAtTime(0.01, now);
    smackGain.gain.linearRampToValueAtTime(0.35, now + 0.04);
    smackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    smackOsc.connect(smackGain);
    smackGain.connect(ctx.destination);

    smackOsc.start(now);
    smackOsc.stop(now + 0.12);

    // 2. High sweet sparkle / love chime right after kiss (E6 -> A6)
    const chimeNotes = [1318.51, 1760.0];
    chimeNotes.forEach((freq, i) => {
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      const startTime = now + 0.08 + i * 0.07;

      chimeOsc.type = "triangle";
      chimeOsc.frequency.setValueAtTime(freq, startTime);

      chimeGain.gain.setValueAtTime(0.12, startTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);

      chimeOsc.start(startTime);
      chimeOsc.stop(startTime + 0.35);
    });
  } catch {
    // Ignore
  }
}

/**
 * Fireworks whistle and burst pop sound effect
 */
export function playFireworksSound() {
  if (!getSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. Ascending whistle rocket
    const whistleOsc = ctx.createOscillator();
    const whistleGain = ctx.createGain();

    whistleOsc.type = "sine";
    whistleOsc.frequency.setValueAtTime(350, now);
    whistleOsc.frequency.exponentialRampToValueAtTime(1400, now + 0.22);

    whistleGain.gain.setValueAtTime(0.08, now);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    whistleOsc.connect(whistleGain);
    whistleGain.connect(ctx.destination);

    whistleOsc.start(now);
    whistleOsc.stop(now + 0.22);

    // 2. Crackle and Boom at burst time
    [0.22, 0.28, 0.35].forEach((offset, idx) => {
      const burstOsc = ctx.createOscillator();
      const burstGain = ctx.createGain();
      const burstTime = now + offset;

      burstOsc.type = "triangle";
      burstOsc.frequency.setValueAtTime(180 - idx * 30, burstTime);
      burstOsc.frequency.exponentialRampToValueAtTime(40, burstTime + 0.25);

      burstGain.gain.setValueAtTime(0.22 - idx * 0.05, burstTime);
      burstGain.gain.exponentialRampToValueAtTime(0.001, burstTime + 0.25);

      burstOsc.connect(burstGain);
      burstGain.connect(ctx.destination);

      burstOsc.start(burstTime);
      burstOsc.stop(burstTime + 0.25);
    });
  } catch {
    // Ignore
  }
}
