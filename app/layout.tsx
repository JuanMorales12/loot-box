import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loot Box System - Mystery Boxes",
  description: "Open mystery boxes and collect rare items!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950">
        {children}
      </body>
    </html>
  );
}
