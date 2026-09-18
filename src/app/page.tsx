"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeaderNav from "@/components/HeaderNav";
import BiometricScanner from "@/components/BiometricScanner";
import DossierSeal from "@/components/DossierSeal";
import MissionBriefing from "@/components/MissionBriefing";
import MissionSettingsModal from "@/components/MissionSettingsModal";
import {
  MissionConfig,
  DEFAULT_CONFIG,
  loadMissionConfig,
} from "@/lib/missionConfig";

export default function Home() {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [config, setConfig] = useState<MissionConfig>(DEFAULT_CONFIG);
  const [isMounted, setIsMounted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setConfig(loadMissionConfig());
  }, []);

  const handleConfigChange = (newConfig: MissionConfig) => {
    setConfig(newConfig);
  };

  if (!isMounted) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#0b0f19] text-rose-300 font-mono text-xs">
        MEMUAT DOKUMEN RAHASIA... 🕶️
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh w-full flex flex-col justify-between cozy-detective-bg overflow-x-hidden">
      {/* Universal Header Nav */}
      <HeaderNav
        onOpenSettings={() => setSettingsOpen(true)}
        onNavigateHome={() => setStage(0)}
      />

      {/* Main Staged Flow */}
      <main className="w-full flex-1 flex flex-col items-center justify-center py-2 sm:py-6 px-1 sm:px-4 z-10">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: Security Clearance */}
          {stage === 0 && (
            <motion.div
              key="stage-0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(3px)" }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <BiometricScanner
                agentName={config.agentName}
                onSuccess={() => setStage(1)}
              />
            </motion.div>
          )}

          {/* SCREEN 2: Dossier Seal */}
          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(3px)" }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <DossierSeal
                agentName={config.agentName}
                missionCode={config.missionCode}
                onOpenDossier={() => setStage(2)}
                onBack={() => setStage(0)}
              />
            </motion.div>
          )}

          {/* SCREEN 3: Mission Briefing Dashboard */}
          {stage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <MissionBriefing
                agentName={config.agentName}
                commanderName={config.commanderName}
                missionCode={config.missionCode}
                phoneNumber={config.phoneNumber}
                whatsappMessage={config.whatsappMessage}
                onOpenSettings={() => setSettingsOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Settings Modal (Controlled by Header or Sidebar) */}
      <MissionSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onConfigChange={handleConfigChange}
      />

      {/* Subtle Footer */}
      <footer className="w-full py-4 text-center text-[11px] font-sans text-slate-500 z-20">
        Markas Komando Rahasia &bull; Special Mission for My Favorite Partner ♡
      </footer>
    </div>
  );
}
