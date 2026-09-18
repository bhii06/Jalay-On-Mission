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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-700 p-5 sm:p-6 shadow-2xl text-left font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Settings className="w-4 h-4" />
                <span>PENGATURAN MARKAS PUSAT</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* WhatsApp Phone Number */}
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">
                  NOMOR WHATSAPP (RED PHONE):
                </label>
                <input
                  type="text"
                  value={config.phoneNumber}
                  onChange={(e) => setConfig({ ...config, phoneNumber: e.target.value })}
                  placeholder="081293469964"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Otomatis terhubung ke format WhatsApp (wa.me)
                </span>
              </div>

              {/* Agent Name */}
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">
                  PANGGILAN AGEN (PASANGAN):
                </label>
                <input
                  type="text"
                  value={config.agentName}
                  onChange={(e) => setConfig({ ...config, agentName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500 font-sans"
                />
              </div>

              {/* Commander Name */}
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">
                  PANGGILAN PANGLIMA PUSAT (PENGIRIM):
                </label>
                <input
                  type="text"
                  value={config.commanderName}
                  onChange={(e) => setConfig({ ...config, commanderName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500 font-sans"
                />
              </div>

              {/* WhatsApp Message Template */}
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">
                  PESAN RED PHONE DEFAULT:
                </label>
                <textarea
                  rows={3}
                  value={config.whatsappMessage}
                  onChange={(e) => setConfig({ ...config, whatsappMessage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500 font-sans text-xs resize-none"
                />
              </div>

              {/* Bottom Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors cursor-pointer shadow-md"
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
