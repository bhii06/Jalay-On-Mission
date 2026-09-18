"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Save, RotateCcw, ShieldCheck } from "lucide-react";
import {
  MissionConfig,
  DEFAULT_CONFIG,
  loadMissionConfig,
  saveMissionConfig,
} from "@/lib/missionConfig";

interface MissionSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigChange: (config: MissionConfig) => void;
}

export default function MissionSettingsModal({
  isOpen,
  onClose,
  onConfigChange,
}: MissionSettingsModalProps) {
  const [config, setConfig] = useState<MissionConfig>(DEFAULT_CONFIG);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(loadMissionConfig());
    }
  }, [isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveMissionConfig(config);
    onConfigChange(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    const resetCfg = saveMissionConfig(DEFAULT_CONFIG);
    setConfig(resetCfg);
    onConfigChange(resetCfg);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-pink-950/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white border-2 border-pink-200 p-5 sm:p-6 shadow-2xl shadow-pink-200/50 text-left font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-pink-600 text-xs font-bold uppercase tracking-wider">
                <Settings className="w-4 h-4" />
                <span>PENGATURAN MARKAS PUSAT</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-pink-400 hover:text-pink-700 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* WhatsApp Phone Number */}
              <div>
                <label className="block text-pink-950 mb-1 font-bold">
                  NOMOR WHATSAPP (RED PHONE):
                </label>
                <input
                  type="text"
                  value={config.phoneNumber}
                  onChange={(e) => setConfig({ ...config, phoneNumber: e.target.value })}
                  placeholder="081293469964"
                  className="w-full bg-pink-50/50 border border-pink-200 focus:border-pink-500 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-200 font-mono transition-all"
                />
                <span className="text-[10px] text-pink-700/70 mt-0.5 block">
                  Otomatis terhubung ke format WhatsApp (wa.me)
                </span>
              </div>

              {/* Agent Name */}
              <div>
                <label className="block text-pink-950 mb-1 font-bold">
                  PANGGILAN AGEN (PASANGAN):
                </label>
                <input
                  type="text"
                  value={config.agentName}
                  onChange={(e) => setConfig({ ...config, agentName: e.target.value })}
                  className="w-full bg-pink-50/50 border border-pink-200 focus:border-pink-500 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-200 font-sans transition-all"
                />
              </div>

              {/* Commander Name */}
              <div>
                <label className="block text-pink-950 mb-1 font-bold">
                  PANGGILAN PANGLIMA PUSAT (PENGIRIM):
                </label>
                <input
                  type="text"
                  value={config.commanderName}
                  onChange={(e) => setConfig({ ...config, commanderName: e.target.value })}
                  className="w-full bg-pink-50/50 border border-pink-200 focus:border-pink-500 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-200 font-sans transition-all"
                />
              </div>

              {/* WhatsApp Message Template */}
              <div>
                <label className="block text-pink-950 mb-1 font-bold">
                  PESAN RED PHONE DEFAULT:
                </label>
                <textarea
                  rows={3}
                  value={config.whatsappMessage}
                  onChange={(e) => setConfig({ ...config, whatsappMessage: e.target.value })}
                  className="w-full bg-pink-50/50 border border-pink-200 focus:border-pink-500 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-200 font-sans text-xs resize-none transition-all"
                />
              </div>

              {/* Bottom Buttons */}
              <div className="pt-3 border-t border-pink-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-100/70 hover:bg-pink-200 text-pink-700 font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold transition-all cursor-pointer shadow-md shadow-pink-300/50"
                >
                  {savedSuccess ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Tersimpan!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Pengaturan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
