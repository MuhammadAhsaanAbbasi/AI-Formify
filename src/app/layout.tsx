import "./globals.css";
import type { Metadata } from "next";
import { Assistant as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata: Metadata = {
  title: "AI-Formify",
  description: "AI Form Generator",
  icons: {
    icon: "https://myapplication-logos.s3.ap-south-1.amazonaws.com/ai-formify.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="light">
        <body
          className={cn(
            "font-sans antialiased bg-white text-black",
            fontSans.variable
          )}
        >
          {children}
          <Toaster />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
