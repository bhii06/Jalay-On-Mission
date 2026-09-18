"use client";

import React from "react";
import Image from "next/image";
import {
  FileText,
  Utensils,
  Droplets,
  Ban,
  Shield,
  Crown,
} from "lucide-react";
import EmergencyControls from "./EmergencyControls";

interface MissionBriefingProps {
  agentName: string;
  commanderName: string;
  missionCode: string;
  phoneNumber: string;
  whatsappMessage: string;
  onOpenSettings: () => void;
}

export default function MissionBriefing({
  agentName,
  commanderName,
  missionCode,
  phoneNumber,
  whatsappMessage,
  onOpenSettings,
}: MissionBriefingProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col items-center select-none">
      {/* 1. CENTER: CREAM MANILA DOSSIER PAPER */}
      <main className="w-full manila-paper rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-10 relative shadow-2xl overflow-hidden border-2 border-amber-200/70">
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 border-b-2 border-slate-300/90 pb-3.5 sm:pb-4 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-slate-800 font-mono font-bold text-xs sm:text-sm md:text-base tracking-tight">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 shrink-0" />
            <span>HQ INTEL REPORT // KODE: {missionCode}</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="text-rose-700 font-black">PENERIMA: AGEN {agentName.toUpperCase()}</span>
          </div>

          <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-red-600 text-white font-mono text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-sm">
            STATUS: SIAGA 1
          </span>
        </div>

        {/* Content Split: Left Sub-column & Right Sub-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* LEFT SUB-COLUMN: Laporan Situasi & Pesan Panglima */}
          <div className="flex flex-col gap-6">
            {/* Laporan Situasi */}
            <div className="bg-white/90 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2.5 text-slate-800 font-sans font-bold text-base sm:text-lg mb-3">
                <FileText className="w-5 h-5 text-slate-600 shrink-0" />
                <span>Laporan Situasi</span>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3 font-sans">
                Halo <strong className="text-slate-900 font-bold">Agen {agentName}</strong>, B tau kamu pasti lagi capek. Capek karena banyak hal, dari kampus, kerjaan, dan banyak pikiran lainnya yang gak ada habisnya. Keep strong yaa sayang.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                Kamu mungkin ngerasa capek sekarang, tapi kamu nggak sendirian. B ada selalu di sini, siap menemani anda hohoho. ♡
              </p>
            </div>

            {/* Pesan Panglima Pusat (Pink card) */}
            <div className="bg-rose-50/95 border border-rose-200 rounded-2xl p-5 sm:p-6 shadow-sm relative">
              <div className="flex items-center gap-2.5 text-rose-700 font-sans font-bold text-base sm:text-lg mb-3">
                <Crown className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Pesan {commanderName || "Panglima Pusat"}</span>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3 font-sans">
                Kamu hebat banget ciii, <strong className="text-rose-800 font-bold">{agentName}</strong>. Makasih ya udah selalu kasih yang terbaik buat semuanya. Tetep jadi indie yang baik hati, semangaatt terus yaaa, tapi jangan lupa istirahat kalau lagi capek."
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 font-sans">
                Holding your hand through this journey makes me so proud. Never doubt that I’ll always be your safest place and biggest supporter, Always ♡
              </p>
              <div className="text-right">
                <span className="font-handwritten text-2xl sm:text-3xl font-bold text-rose-600">
                  Always, {commanderName || "Your Partner"} ♡
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SUB-COLUMN: Protokol Misi, Polaroid, Certified Badge */}
          <div className="flex flex-col gap-6">
            {/* Protokol Misi Card */}
            <div className="bg-white/90 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2.5 text-slate-800 font-sans font-bold text-base sm:text-lg mb-4">
                <span className="text-lg">📋</span>
                <span>Protokol Misi</span>
              </div>

              <div className="space-y-4">
                {/* Item 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5 shadow-sm">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-slate-800">Makan teratur</div>
                    <div className="text-xs sm:text-sm text-slate-500">Jangan makan mie ayam doang maunya!</div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 shrink-0 mt-0.5 shadow-sm">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-slate-800">Konsumsi air putih</div>
                    <div className="text-xs sm:text-sm text-slate-500">Wajib Min. 8 gelas sehari!</div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0 mt-0.5 shadow-sm">
                    <Ban className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-slate-800">Larangan keras overthinking</div>
                    <div className="text-xs sm:text-sm text-slate-500">Jangan terlalu banyak berpikir negatif.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pinned Polaroid Photo with Washi Tape */}
            <div className="self-center bg-white p-2.5 sm:p-3 pb-3.5 sm:pb-4 rounded-2xl shadow-lg border border-slate-200 rotate-2 w-full max-w-[240px] sm:max-w-[270px] relative my-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 washi-tape w-20 sm:w-24 h-5 sm:h-6 rounded -rotate-2 z-10" />
              <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-2 shadow-inner">
                <Image
                  src="/couple-potrait.jpg"
                  alt="Selalu bersama"
                  fill
                  className="object-cover object-[center_15%]"
                  priority
                />
              </div>
              <div className="text-center font-handwritten text-lg sm:text-xl font-bold text-slate-700">
                Always with youu ♡
              </div>
            </div>

            {/* Bottom Badge: Certified Strongest Agent + Cat doodle */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-slate-300/80">
              {/* Rubber Stamp Box */}
              <div className="w-full sm:w-auto border-2 border-slate-700 rounded-2xl p-3 sm:p-3.5 flex items-center justify-center sm:justify-start gap-3 rotate-[-1deg] sm:rotate-[-2deg] bg-slate-50 shadow-sm">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 flex items-center justify-center text-amber-300 shadow shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                    Certified: {agentName}
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-black text-slate-900 leading-tight">
                    STRONGEST AGENT
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-slate-700">OF THE DAY 👑</div>
                </div>
              </div>

              {/* Cat Doodle "Semangat Sayaaang!" */}
              <div className="flex flex-col items-center">
                <svg
                  className="w-12 h-12 sm:w-14 sm:h-14 text-slate-700"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M 25 35 L 20 15 L 40 25" />
                  <path d="M 75 35 L 80 15 L 60 25" />
                  <circle cx="50" cy="55" r="30" />
                  <circle cx="38" cy="50" r="3" fill="currentColor" />
                  <circle cx="62" cy="50" r="3" fill="currentColor" />
                  <path d="M 44 64 Q 50 70 56 64" />
                </svg>
                <span className="font-handwritten text-base sm:text-lg font-bold text-slate-800 -rotate-6 text-center">
                  Semangat Sayaaang!
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 2. PANEL TINDAKAN DARURAT (DIBAWAH LAPORAN TENGAH) */}
      <section className="w-full mt-6 sm:mt-8 bg-[#101625]/90 border border-slate-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-5 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-2.5 text-white font-sans font-bold text-base sm:text-lg">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
            <span>Panel Tindakan Darurat</span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-sans">
            Pilih salah satu, sesuai kebutuhanmu.
          </p>
        </div>

        {/* 3 Action Buttons */}
        <EmergencyControls
          phoneNumber={phoneNumber}
          commanderName={commanderName}
          whatsappMessage={whatsappMessage}
        />

        {/* Chalk Quote & Cute Cat Partner at the bottom */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="font-handwritten text-xl sm:text-2xl md:text-3xl font-bold text-slate-200 rotate-[-0.5deg]">
            “Karena kamu, semua misi jadi lebih mudah. ♡”
          </p>

          <span className="font-handwritten text-lg sm:text-xl text-rose-300 font-bold">
            Agen {agentName} — My Favorite Partner ♡ 🐱
          </span>
        </div>
      </section>
    </div>
  );
}
