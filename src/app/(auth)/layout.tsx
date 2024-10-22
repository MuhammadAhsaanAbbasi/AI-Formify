import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "InterroAI",
    description: "AI Mock Interviewer",
    // icons: {
    //     icon: "/icons/logo.svg",
    // },
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main className=''>
            {children}
        </main>
    );
};

export default RootLayout;