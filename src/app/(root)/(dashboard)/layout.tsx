import { ReactNode } from 'react';
import { Metadata } from 'next';
import SideNav from '@/components/navigation/SideNav';

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