import { ReactNode } from 'react';
import { Metadata } from 'next';
import SideNav from '@/components/navigation/SideNav';
import Header from '@/components/navigation/header/header';

export const metadata: Metadata = {
    title: "AIFormify",
    description: "AI Form Builder",
    icons: {
        icon: "https://hrk-boutique.s3.ap-south-1.amazonaws.com/Interro.AI.png",
    },
};

const FormResponsesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main>
            <Header />
            <div className='md:w-64 fixed'>
                <SideNav />
            </div>
            <div className='md:ml-64 bg-white'>
                {children}

            </div>
        </main>
    );
};

export default FormResponsesLayout;