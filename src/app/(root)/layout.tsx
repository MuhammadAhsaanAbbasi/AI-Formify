import { ReactNode } from 'react';
import { Metadata } from 'next';
import Header from '@/components/navigation/header/header'

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

const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main>
            <Header />
            {children}
        </main>
    );
};

export default DashboardLayout;