import { ReactNode } from 'react';
import { Metadata } from 'next';
import { SideNav } from '@/components/navigation/SideNav';
import MobileNav from '@/components/navigation/MobileNav';
import { menuList } from '@/constants/constants';

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
            <div className='md:w-56 fixed'>
                <SideNav />
            </div>
            <div className='md:ml-56 bg-white'>
                <MobileNav />
                {children}

            </div>
        </main>
    );
};

export default DashboardLayout;