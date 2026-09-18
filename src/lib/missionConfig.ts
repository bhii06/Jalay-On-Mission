export interface MissionConfig {
  phoneNumber: string;
  agentName: string;
  commanderName: string;
  missionCode: string;
  whatsappMessage: string;
}

export const DEFAULT_CONFIG: MissionConfig = {
  phoneNumber: "6281293469964",
  agentName: "Manusia Terfavorit",
  commanderName: "Panglima Pusat",
  missionCode: "SURVIVE-AND-SLAY",
  whatsappMessage:
    "Lapor Komandan Abie! indiee kangenn banyakk bnyaaaak mauu callll. Harap segera respons laporan ini, ganti!",
};

const STORAGE_KEY = "jalay_mission_config";

export function loadMissionConfig(): MissionConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    if (parsed.phoneNumber === "628129469964" || parsed.phoneNumber === "08129469964") {
      parsed.phoneNumber = DEFAULT_CONFIG.phoneNumber;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULT_CONFIG, ...parsed }));
    }
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveMissionConfig(config: Partial<MissionConfig>): MissionConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const current = loadMissionConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_CONFIG;
  }
}

/**
 * Format any Indonesian phone number into standard international format (e.g., 0812... -> 62812...)
 */
export function formatPhoneNumberForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("08")) {
    cleaned = "62" + cleaned.slice(1);
  } else if (cleaned.startsWith("8")) {
    cleaned = "62" + cleaned;
  }
  return cleaned;
}
