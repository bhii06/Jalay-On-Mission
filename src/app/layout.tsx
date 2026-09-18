import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jalay on Mission: Daily Mood Booster",
  description: "Special Daily Mood Booster Mission for My Favorite Partner",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0b0f19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${caveat.variable} h-full antialiased dark`}
    >
      <body className="min-h-dvh flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-rose-500/30 selection:text-rose-200 font-sans">
        {children}
      </body>
    </html>
  );
}
