import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  weight: ["600", "700"], 
  subsets: ["latin"], 
  variable: "--font-poppins" 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-[#020617] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}