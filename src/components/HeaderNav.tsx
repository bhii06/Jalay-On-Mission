"use client";

import React, { useState } from "react";
import { Heart, Volume2, VolumeX, Settings } from "lucide-react";
import { setSoundEnabled, getSoundEnabled } from "@/lib/soundFx";

interface HeaderNavProps {
  onOpenSettings?: () => void;
  onNavigateHome?: () => void;
}

export default function HeaderNav({ onOpenSettings, onNavigateHome }: HeaderNavProps) {
  const [soundOn, setSoundOn] = useState(true);
  const [heartLiked, setHeartLiked] = useState(false);

  React.useEffect(() => {
    setSoundOn(getSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-8 md:px-12 py-3.5 sm:py-5 z-40">
      {/* Brand Logo Left */}
      <div
        onClick={onNavigateHome}
        className="flex items-center gap-2.5 cursor-pointer group select-none"
      >
        <div className="w-9 h-9 rounded-xl bg-pink-100 border border-pink-200/90 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0">
          🐱
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-bold text-sm tracking-tight text-pink-950 leading-none">
            Jalay on
          </span>
          <span className="font-sans font-bold text-sm tracking-tight text-pink-600 leading-none mt-0.5">
            Mission
          </span>
        </div>
      </div>

      {/* Nav Actions Right (Interactive Tools) */}
      <nav className="flex items-center gap-2 sm:gap-3">
        {/* Heart Interactive Like button */}
        <button
          type="button"
          onClick={() => setHeartLiked(!heartLiked)}
          title="Kirim Cinta ke Panglima"
          className="w-9 h-9 rounded-xl bg-white/90 hover:bg-pink-50 border border-pink-200/80 flex items-center justify-center text-pink-500 hover:text-pink-600 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          <Heart className={`w-4 h-4 ${heartLiked ? "fill-pink-500 text-pink-500" : ""}`} />
        </button>

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={handleToggleSound}
          title={soundOn ? "Audio Taktis: Aktif" : "Audio Taktis: Mute"}
          className="w-9 h-9 rounded-xl bg-white/90 hover:bg-pink-50 border border-pink-200/80 flex items-center justify-center text-pink-600 hover:text-pink-700 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          {soundOn ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-pink-300" />}
        </button>

        {/* Settings Button */}
        {onOpenSettings && (
          <button
            type="button"
            onClick={onOpenSettings}
            title="Pengaturan Markas Pusat"
            className="w-9 h-9 rounded-xl bg-white/90 hover:bg-pink-50 border border-pink-200/80 flex items-center justify-center text-pink-600 hover:text-pink-800 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </nav>
    </header>
  );
}
