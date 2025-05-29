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
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiformify.xyz/"),
  title: "AI-Formify",
  description:
    "AI Form Generator: Instantly create and customize intelligent forms with AI-driven field suggestions, intuitive drag-and-drop editing, one-click publishing, and real-time analytics.",
  icons: {
    icon: "https://myapplication-logos.s3.ap-south-1.amazonaws.com/ai-formify.png",
  },
  generator:
    "AI Form Generator, AI Form Builder, Instant Form Creator, No-Code Form Designer, Smart Form Automation, Intelligent Form Builder, Drag-and-Drop Form Editor, Real-Time Form Analytics, Customizable Form Themes, Embedded Form Platform, Shareable Form Links, Form Data Exports, Responsive Form Creator, Secure Form Hosting, Form Publishing SaaS, Survey & Feedback Tool, Automated Field Suggestions, Form Workflow Automation, Form Builder API, Insightful Form Reports",

  // Canonical URLs are handled dynamically per page

  keywords: [
    "AI Form Generator",
    "AI Form Builder",
    "Instant Form Creator",
    "No-Code Form Designer",
    "Smart Form Automation",
    "Intelligent Form Builder",
    "Drag-and-Drop Form Editor",
    "Real-Time Form Analytics",
    "Customizable Form Themes",
    "Embedded Form Platform",
    "Shareable Form Links",
    "Form Data Exports",
    "Responsive Form Creator",
    "Secure Form Hosting",
    "Form Publishing SaaS",
    "Survey & Feedback Tool",
    "Automated Field Suggestions",
    "Form Workflow Automation",
    "Form Builder API",
    "Insightful Form Reports"
  ],
  
  openGraph: {
    title: "AI-Formify",
    description:
      "AI Form Generator: Instantly create and customize intelligent forms with AI-driven field suggestions, intuitive drag-and-drop editing, one-click publishing, and real-time analytics.",
    images: [
      {
        url: "/images/Metaimage.jpg",
        width: 1200,
        height: 630,
        alt: "AI-Formify",
      },
    ],
    type: "website",
    url: "https://aiformify.xyz/dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Formify",
    description:
      "AI Form Generator: Instantly create and customize intelligent forms with AI-driven field suggestions, intuitive drag-and-drop editing, one-click publishing, and real-time analytics.",
    images: ["/images/Metaimage.jpg"],
    creator: "@Muhamma99141099",
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
