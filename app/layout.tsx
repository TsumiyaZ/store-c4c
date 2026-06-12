import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/auth/NextAuthProvider";

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "C4C 2026 Store",
  description: "ร้านขายเสื้อโปโล Computer Science C4C รุ่น Limited Edition ปี 2026",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable}`}>
      <body
        className={prompt.className}
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          background: "transparent",
          color: "#ffffff",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
