import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/themeProvider"
import { ModeToggle } from "@/components/modeToggle";
import Navbar from "@/components/app/navbar";
import Footer from "@/components/app/footer";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pharmacy 24",
  description: "Your one-stop online pharmacy, open 24/7 for medicines, healthcare products, and reliable service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubik.className} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar/>
            <div className="min-h-screen">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
      </body>
    </html>
  );
}
