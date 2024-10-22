import { ReactNode } from 'react';
import { Metadata } from 'next';
import SideNav from '@/components/navigation/SideNav';

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
            <div className='md:w-64 fixed'>
                <SideNav />
            </div>
            <div className='md:ml-64 bg-white'>
                {children}

            </div>
        </main>
    );
};

export default DashboardLayout;