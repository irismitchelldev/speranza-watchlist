import type { Metadata } from "next";
import { Inter, Geo } from "next/font/google";
import "./globals.css";
import DisclaimerModal from "@/components/DisclaimerModal";

const inter = Inter({ subsets: ["latin"] });
const geo = Geo({ 
  subsets: ["latin"],
  weight: "400",
  variable: "--font-geo",
});

export const metadata: Metadata = {
  title: "Speranza Watchlist",
  description: "Log surface incidents and check raider backgrounds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geo.variable}`}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0a0a0a",
          color: "#e0e0e0",
          minHeight: "100vh",
        }}
      >
        <DisclaimerModal />
        {children}
      </body>
    </html>
  );
}

