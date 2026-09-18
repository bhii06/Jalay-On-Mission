"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Phone,
  Bomb,
  ChevronRight,
  X,
  Sparkles,
  AlertTriangle,
  Heart,
} from "lucide-react";
import {
  playCountdownBeep,
  playCelebrationPop,
  playKissSound,
  playFireworksSound,
} from "@/lib/soundFx";
import { formatPhoneNumberForWhatsApp } from "@/lib/missionConfig";

interface EmergencyControlsProps {
  phoneNumber: string;
  commanderName: string;
  whatsappMessage: string;
}

export default function EmergencyControls({
  phoneNumber,
  commanderName,
  whatsappMessage,
}: EmergencyControlsProps) {
  const [kissModalOpen, setKissModalOpen] = useState(false);
  const [destructModalOpen, setDestructModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [destructAborted, setDestructAborted] = useState(false);

  // Action A: WhatsApp Red Phone
  const handleRedPhoneClick = () => {
    const cleanPhone = formatPhoneNumberForWhatsApp(phoneNumber);
    const encodedText = encodeURIComponent(whatsappMessage);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Action B: Ciuman Hangat
  const handleOpenKissModal = () => {
    setKissModalOpen(true);
    playKissSound();

    try {
      const heart = confetti.shapeFromText({ text: "❤️", scalar: 2 });
      const kiss = confetti.shapeFromText({ text: "💋", scalar: 2 });
      confetti({
        shapes: [heart, kiss],
        scalar: 2,
        particleCount: 30,
        spread: 70,
        origin: { y: 0.65 },
      });
    } catch {
      // Fallback
    }
  };

  // Action C: Self-Destruct
  const handleStartSelfDestruct = () => {
    setDestructModalOpen(true);
    setCountdown(3);
    setDestructAborted(false);
    playCountdownBeep(false);
  };

  // Countdown timer for Self-Destruct with Love & Fireworks
  useEffect(() => {
    if (!destructModalOpen || destructAborted) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        const next = countdown - 1;
        setCountdown(next);
        playCountdownBeep(next === 0);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setDestructAborted(true);
      playCelebrationPop();
      playFireworksSound();

      try {
        // 1. Initial burst with hearts & kisses
        const heart1 = confetti.shapeFromText({ text: "❤️", scalar: 2.2 });
        const heart2 = confetti.shapeFromText({ text: "💖", scalar: 2.2 });
        const heart3 = confetti.shapeFromText({ text: "💕", scalar: 2.2 });
        const kiss = confetti.shapeFromText({ text: "💋", scalar: 2.2 });
        const spark = confetti.shapeFromText({ text: "✨", scalar: 2 });

        confetti({
          shapes: [heart1, heart2, heart3, kiss, spark],
          particleCount: 70,
          spread: 120,
          origin: { y: 0.6 },
        });

        // 2. Continuous Fireworks & Love Sparks Show (2.8 seconds)
        const duration = 2800;
        const animationEnd = Date.now() + duration;

        const fireworksTimer = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            clearInterval(fireworksTimer);
            return;
          }

          // Fireworks left launcher
          confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0.05, y: 0.7 },
            colors: ["#f43f5e", "#ec4899", "#facc15", "#38bdf8", "#a855f7", "#ffffff"],
          });

          // Fireworks right launcher
          confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 0.95, y: 0.7 },
            colors: ["#f43f5e", "#ec4899", "#facc15", "#38bdf8", "#a855f7", "#ffffff"],
          });

          // Floating hearts & sparkles from center-sky
          confetti({
            shapes: [heart1, heart2, spark],
            particleCount: 15,
            spread: 360,
            startVelocity: 22,
            origin: { x: 0.3 + Math.random() * 0.4, y: 0.2 + Math.random() * 0.3 },
          });
        }, 380);
      } catch {
        // Fallback
      }
    }
  }, [destructModalOpen, countdown, destructAborted]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3.5 select-none">
      {/* 1. Card A: Red Phone (WhatsApp) */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleRedPhoneClick}
        className="w-full text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#e11d48]/20 via-[#be123c]/25 to-slate-900/60 border border-rose-500/40 hover:border-rose-400/80 flex items-center justify-between gap-3.5 shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <Phone className="w-6 h-6 fill-white" />
          </div>
          <div className="min-w-0">
            <div className="font-sans font-bold text-sm sm:text-base text-rose-200 group-hover:text-white transition-colors">
              A. Hubungi Komandan
            </div>
            <div className="font-sans text-xs sm:text-[13px] text-slate-300 leading-snug">
              Langsung terhubung ke aku. Ceritain apa aja, kapan aja.
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform shrink-0" />
      </motion.button>

      {/* 2. Card B: Ciuman Hangat */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleOpenKissModal}
        className="w-full text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-600/20 via-rose-700/25 to-slate-900/60 border border-pink-500/40 hover:border-pink-400/80 flex items-center justify-between gap-3.5 shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center text-white shrink-0 shadow-md text-2xl">
            💋
          </div>
          <div className="min-w-0">
            <div className="font-sans font-bold text-sm sm:text-base text-pink-200 group-hover:text-white transition-colors">
              B. Ciuman Hangat
            </div>
            <div className="font-sans text-xs sm:text-[13px] text-slate-300 leading-snug">
              Kecupan hangat jarak jauh khusus buat kamu. Muach! 💋
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-pink-400 group-hover:translate-x-1 transition-transform shrink-0" />
      </motion.button>

      {/* 3. Card C: Self-Destruct */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleStartSelfDestruct}
        className="w-full text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-600/20 via-yellow-700/25 to-slate-900/60 border border-amber-500/40 hover:border-amber-400/80 flex items-center justify-between gap-3.5 shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shrink-0 shadow-md">
            <Bomb className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="font-sans font-bold text-sm sm:text-base text-amber-200 group-hover:text-white transition-colors">
              C. Self-Destruct
            </div>
            <div className="font-sans text-xs sm:text-[13px] text-slate-300 leading-snug">
              Hitung mundur destruct. &gt;.&lt;
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
      </motion.button>

      {/* MODAL ACTION B: Ciuman Hangat */}
      <AnimatePresence>
        {kissModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-pink-950/40 border-2 border-pink-500/60 p-5 sm:p-8 shadow-2xl text-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setKissModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Animated Kiss & Floating Hearts Visual */}
              <div className="relative my-4 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.25, 1, 1.2, 1], rotate: [0, -4, 4, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-full bg-pink-500/20 border-2 border-pink-400/60 flex items-center justify-center shadow-xl shadow-pink-500/40 text-5xl"
                >
                  💋
                </motion.div>
                <motion.span
                  animate={{ y: [-5, -28], opacity: [0, 1, 0], scale: [0.8, 1.2] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut" }}
                  className="absolute text-2xl -top-2 right-12 pointer-events-none"
                >
                  💖
                </motion.span>
                <motion.span
                  animate={{ y: [-5, -28], opacity: [0, 1, 0], scale: [0.8, 1.2] }}
                  transition={{ repeat: Infinity, duration: 1.6, delay: 0.35, ease: "easeOut" }}
                  className="absolute text-2xl -top-2 left-12 pointer-events-none"
                >
                  💕
                </motion.span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-300 text-xs font-mono font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>TRANSMISI KASIH SAYANG // CIUMAN HANGAT DITERIMA</span>
              </div>

              <h3 className="text-xl font-sans font-bold text-white mb-2">
                Muach! Ciuman Hangat Terkirim! 💋✨
              </h3>

              <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed bg-slate-900/90 p-4 rounded-2xl border border-slate-800 mb-6 shadow-inner">
                “Satu ciuman hangat dan pelukan erat telah ditransmisikan langsung dari {commanderName} khusus buat kamu. Capek dan pusingnya ditiup pergi yaa sayang. Love you so much! Muachhh! ♡”
              </p>

              <button
                type="button"
                onClick={() => {
                  playKissSound();
                  setKissModalOpen(false);
                }}
                className="w-full min-h-[48px] py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-400 hover:to-rose-400 text-white font-sans font-bold text-xs tracking-wider uppercase shadow-lg shadow-pink-950/60 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>Terima Ciuman Hangat</span>
                <span>💋❤️</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL ACTION C: Self-Destruct Countdown & Fireworks + Love Abort */}
      <AnimatePresence>
        {destructModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950/40 border-2 border-rose-500/60 p-5 sm:p-8 shadow-2xl text-center"
            >
              {!destructAborted ? (
                <div className="py-4 flex flex-col items-center">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-black tracking-widest uppercase mb-4 animate-pulse">
                    <AlertTriangle className="w-4 h-4" />
                    <span>PERINGATAN: PROTOKOL PENGHANCURAN DIRI</span>
                  </div>

                  <motion.div
                    key={countdown}
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-28 h-28 rounded-full border-4 border-amber-500 bg-amber-950/50 flex items-center justify-center my-4 shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                  >
                    <span className="font-mono text-6xl font-black text-amber-400">
                      {countdown}
                    </span>
                  </motion.div>

                  <p className="text-slate-300 font-sans text-xs max-w-xs mt-2">
                    Bersiap... kembang api & kejutan cinta akan meledak! &gt;.&lt;
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-2 flex flex-col items-center"
                >
                  <div className="relative mb-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-600 via-pink-600 to-amber-500 border-2 border-rose-300 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(244,63,94,0.6)]">
                      🎆
                    </div>
                    <motion.span
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="absolute -top-2 -right-2 text-xl"
                    >
                      💖
                    </motion.span>
                  </div>

                  <span className="text-[11px] font-mono font-bold tracking-widest text-rose-300 uppercase px-3 py-1 border border-rose-500/40 rounded-full bg-rose-950/50 mb-3">
                    PENYELAMATAN BERHASIL // MELEDAK JADI CINTA 🎆💖
                  </span>

                  <h3 className="text-xl font-sans font-black text-white mb-2">
                    Penghancuran Meledak Jadi Cinta! 🎆💖
                  </h3>

                  <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed bg-slate-900/90 p-4 rounded-2xl border border-slate-800 my-4 shadow-inner">
                    “Penghancuran Dibatalkan! Dokumen ini meledak menjadi jutaan cinta  dan kembang api karena dunia masih butuh senyuman manis kamu hari ini hohohoho. Lagipula kalau meledak beneran, nanti abie kangen sama siapa? 😜💐🎆”
                  </p>

                  <button
                    type="button"
                    onClick={() => setDestructModalOpen(false)}
                    className="w-full min-h-[48px] py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-sans font-bold text-xs tracking-wider uppercase shadow-xl shadow-rose-950/60 cursor-pointer transition-all"
                  >
                    Misi Dilanjutkan dengan Penuh Cinta 🫡❤️🎆
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
