import { ReactNode } from 'react';
import { Metadata } from 'next';
import Header from '@/components/navigation/header/header'

export const metadata: Metadata = {
    title: "AI-Formify",
    description: "AI Form Generator",
    icons: {
      icon: "https://myapplication-logos.s3.ap-south-1.amazonaws.com/ai-formify.png",
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