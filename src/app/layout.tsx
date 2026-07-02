import Loader from "@/components/Loader";
import type { Metadata } from "next";
import { Bodoni_Moda, Manrope, JetBrains_Mono, Cinzel } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  adjustFontFallback: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "The Foto Company",
  description: "We create memories Wedding films, pre-wedding shoots, fashion, and cinematography based in Bhopal, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bodoniModa.variable} ${manrope.variable} ${jetbrainsMono.variable} ${cinzel.variable} font-sans bg-ink text-ivory antialiased`}
      >
        <Loader />
        {children}
      </body>
    </html>
  );
}
