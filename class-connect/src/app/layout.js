import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ClassConnect",
  description: "Streamline your tutoring experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary overflow-y-hidden`}
      >
        <Header />

        <main className="min-h-screen container mx-auto p-4">
          {children}
        </main>

        <Footer />

        {/* jQuery import for Assignment 4 */}
        <Script
          src="https://code.jquery.com/jquery-3.7.1.js" 
          integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        ></Script>
        <Script
          id="jQuery-fallback"
          strategy="afterInteractive"
        >
          {`if (!window.jQuery) { document.write('<script src="/js/jquery-3.7.1.min.js"><\\/script>'); }`}
        </Script>
      </body>
    </html>
  );
}
