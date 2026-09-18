"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, CheckCircle2, AlertCircle } from "lucide-react";
import { playScanTick, playAccessGranted, playBoingCancel } from "@/lib/soundFx";

interface BiometricScannerProps {
  agentName: string;
  onSuccess: () => void;
}

export default function BiometricScanner({ agentName, onSuccess }: BiometricScannerProps) {
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const DURATION_MS = 3000; // 3 seconds per PRD

  const stopScanning = useCallback((cancelledEarly = true) => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScanning(false);
    startTimeRef.current = null;

    if (cancelledEarly && !isVerified) {
      setProgress(0);
      playBoingCancel();
      setErrorNotice("Jangan dilepas dulu ya! Tahan jarimu selama 3 detik penuh 😜🤏");
      const timer = setTimeout(() => {
        setErrorNotice(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVerified]);

  const handleComplete = useCallback(() => {
    setIsVerified(true);
    setProgress(100);
    playAccessGranted();

    setTimeout(() => {
      onSuccess();
    }, 650);
  }, [onSuccess]);

  const startScanning = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isVerified) return;

    setErrorNotice(null);
    setIsScanning(true);
    setProgress(0);
    startTimeRef.current = Date.now();

    playScanTick(0);

    scanIntervalRef.current = setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const currentPct = Math.min(100, Math.floor((elapsed / DURATION_MS) * 100));
      setProgress(currentPct);
      playScanTick(currentPct);

      if (currentPct >= 100) {
        if (scanIntervalRef.current) {
          clearInterval(scanIntervalRef.current);
          scanIntervalRef.current = null;
        }
        setIsScanning(false);
        handleComplete();
      }
    }, 50);
  }, [isVerified, handleComplete]);

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 select-none">
      {/* Left Column: Cozy Title, Cute Slogan, Tape note */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left"
      >
        {/* Big Stylized Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-3">
          <span className="font-handwritten text-4xl sm:text-6xl text-rose-300 font-bold block mb-1">
            Jalay on Mission:
          </span>
          <span className="bg-gradient-to-r from-white via-slate-100 to-rose-100 bg-clip-text text-transparent">
            Daily Mood Booster
          </span>
          <span className="text-rose-400 ml-2">♡</span>
        </h1>

        {/* Speech Bubble / Tape Note */}
        <motion.div
          initial={{ rotate: -2 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          className="washi-tape text-amber-950 font-handwritten text-lg sm:text-xl font-bold px-6 py-2.5 rounded-md shadow-lg my-4 max-w-md inline-block"
        >
          “Because your smile is the fuel that keeps my fire burning through the toughest days. ♡”
        </motion.div>

        <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-md mt-2 leading-relaxed">
          Markas komando telah menyiapkan dokumen rahasia harian khusus untuk <span className="text-rose-300 font-semibold">Agen {agentName || "Terfavorit"}</span>. Verifikasi sidik jarimu di samping untuk membuka akses berkas! 📁✨
        </p>
      </motion.div>

      {/* Right Column: Neon Blue Biometric Scanner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md flex flex-col items-center justify-center p-5 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        {/* Top Security Clearance Badge */}
        <div className="mb-4">
          <span className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-red-500/60 bg-red-950/30 text-red-400 font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase shadow-sm">
            [ RESTRICTED ACCESS LEVEL 5 ]
          </span>
        </div>

        {/* Heading & Subtext */}
        <h2 className="text-lg sm:text-2xl font-sans font-bold text-white tracking-tight mb-1 text-center">
          Scan Fingerprint to Continue
        </h2>
        <p className="text-slate-400 text-xs font-sans text-center mb-5 sm:mb-6 max-w-xs">
          Tekan dan tahan selama 3 detik untuk membuka misi hari ini.
        </p>

        {/* Concentric Neon Cyan Circular Scanner */}
        <div className="relative flex items-center justify-center my-2 sm:my-3">
          {/* Outer Ripple Ring */}
          <div
            className={`absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-cyan-500/20 transition-all duration-500 ${isScanning ? "scale-110 border-cyan-400/40 animate-ping" : ""
              }`}
          />

          {/* Middle Dashed Ring */}
          <div
            className={`absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-dashed transition-all duration-300 ${isVerified
                ? "border-emerald-400/80 rotate-45"
                : isScanning
                  ? "border-cyan-400/80 animate-spin"
                  : "border-cyan-500/30"
              }`}
            style={{ animationDuration: "8s" }}
          />

          {/* Interactive Button */}
          <button
            type="button"
            aria-label="Tekan dan tahan sidik jari"
            onMouseDown={startScanning}
            onMouseUp={() => stopScanning(true)}
            onMouseLeave={() => isScanning && stopScanning(true)}
            onTouchStart={startScanning}
            onTouchEnd={() => stopScanning(true)}
            onTouchCancel={() => stopScanning(true)}
            disabled={isVerified}
            className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-200 touch-none focus:outline-none relative overflow-hidden ${isVerified
                ? "bg-emerald-950/80 border-2 border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.5)] scale-105"
                : isScanning
                  ? "bg-cyan-950/80 border-2 border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.5)] scale-105"
                  : "bg-slate-900/90 border-2 border-cyan-500/40 hover:border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.15)] active:scale-95"
              }`}
          >
            {/* Laser Line when Scanning */}
            <AnimatePresence>
              {isScanning && !isVerified && (
                <motion.div
                  initial={{ y: -50 }}
                  animate={{ y: [-45, 45, -45] }}
                  transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
                  className="absolute w-24 sm:w-28 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#22d3ee] z-20 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Icon */}
            {isVerified ? (
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center text-emerald-400 p-1"
              >
                <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16" />
                <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider mt-1 text-emerald-300 text-center">
                  AGEN {agentName.toUpperCase()} VERIFIED!
                </span>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center text-cyan-400">
                <Fingerprint
                  className={`w-12 h-12 sm:w-16 sm:h-16 transition-all duration-200 ${isScanning
                      ? "text-cyan-300 drop-shadow-[0_0_12px_#22d3ee]"
                      : "text-cyan-400/80"
                    }`}
                />
              </div>
            )}
          </button>
        </div>

        {/* Progress Bar & Ready Pill */}
        <div className="w-full mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
          <div className="w-full flex-1 flex items-center gap-2.5">
            {/* Pill Progress Bar */}
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-full h-3.5 sm:h-4 overflow-hidden p-0.5 relative shadow-inner">
              <motion.div
                className={`h-full rounded-full transition-all duration-75 ${isVerified ? "bg-emerald-400" : "bg-gradient-to-r from-cyan-500 to-blue-500"
                  }`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-xs font-mono font-bold text-cyan-300 min-w-[34px] text-right">
              {progress}%
            </span>
          </div>

          {/* "Ready? Agen [Name] ♡" handwritten text */}
          <span className="font-handwritten text-base sm:text-lg font-bold text-rose-300 whitespace-nowrap text-center">
            Ready? Agen {agentName || "Terfavorit"} ♡
          </span>
        </div>

        {/* Error Notice */}
        <AnimatePresence>
          {errorNotice && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex items-center gap-1.5 text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-lg text-xs font-sans"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{errorNotice}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
