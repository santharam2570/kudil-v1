import type { Metadata, Viewport } from "next";
import { Baloo_Thambi_2, Cinzel, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const balooThambi = Baloo_Thambi_2({
  variable: "--font-baloo-thambi",
  subsets: ["tamil", "latin"],
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kudil Biriyani | குடில் பிரியாணி — Trichy",
  description:
    "Authentic Seeraga Samba dum biriyani from Trichy. Chicken & mutton biriyani packages, mini hall catering and more. Taste that stays with you…",
  icons: { icon: "/images/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#3d0a0e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${poppins.variable} ${balooThambi.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
