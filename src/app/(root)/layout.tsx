import { ReactNode } from 'react';
import { Metadata } from 'next';
import Header from '@/components/navigation/header/header'

export const metadata: Metadata = {
    title: "AIFormify",
    description: "AI Form Builder",
    icons: {
        icon: "https://hrk-boutique.s3.ap-south-1.amazonaws.com/Interro.AI.png",
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