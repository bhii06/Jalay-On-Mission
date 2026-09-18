"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { playStampThud } from "@/lib/soundFx";

interface DossierSealProps {
  agentName: string;
  missionCode: string;
  onOpenDossier: () => void;
  onBack: () => void;
}

export default function DossierSeal({
  agentName,
  missionCode,
  onOpenDossier,
  onBack,
}: DossierSealProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    playStampThud();
    setTimeout(() => {
      onOpenDossier();
    }, 450);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-col items-center select-none relative">
      {/* Top Left: "← Kembali" Button */}
      <div className="w-full flex items-center justify-start mb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white font-sans text-xs sm:text-sm font-semibold transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali</span>
        </button>
      </div>

      {/* Main Dossier Folder Card Area */}
      <div className="relative flex flex-col items-center justify-center my-2 max-w-md w-full">
        {/* Handwritten Annotation + Doodle Arrow on Top Right */}
        <div className="absolute -top-6 right-0 sm:-right-10 z-20 hidden sm:flex flex-col items-end pointer-events-none">
          <span className="font-handwritten text-lg sm:text-2xl text-slate-200 font-bold rotate-6">
            Berkas Terenkripsi Ditemukan ✨
          </span>
          <span className="text-xl text-slate-400 rotate-12 -mt-1 mr-4">⤵</span>
        </div>

        {/* 3D Manila Folder Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{
            opacity: isOpening ? 0.3 : 1,
            scale: isOpening ? 1.05 : 1,
            y: 0,
          }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-[280px] sm:max-w-sm h-52 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60"
        >
          <Image
            src="/top_secret_folder.jpg"
            alt="Top Secret Dossier Folder"
            fill
            className="object-cover"
            priority
          />

          {/* Sticky Note on Folder: "You got this ♡" */}
          <div className="absolute bottom-4 left-4 z-10 washi-tape px-3 py-1.5 rounded shadow-md -rotate-6">
            <span className="font-handwritten text-base font-bold text-amber-950 block">
              You got this ♡
            </span>
          </div>
        </motion.div>
      </div>

      {/* Title & Subtext */}
      <div className="text-center mt-6 mb-8 max-w-md">
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight mb-2">
          Berkas Terenkripsi Ditemukan
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-sans">
          Berisi pesan penting untuk <span className="text-rose-300 font-semibold font-handwritten text-base">Agen {agentName || "Terfavorit"}</span> dari markas pusat.
        </p>
      </div>

      {/* CTA Button: "Buka Segel Berkas →" */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleOpen}
        disabled={isOpening}
        className="min-h-[50px] px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-950/60 cursor-pointer border border-indigo-300/30 transition-all"
      >
        <span>{isOpening ? "Membuka Berkas..." : "Buka Segel Berkas"}</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
