import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "AIFormify",
    description: "AI Form Builder",
    icons: {
        icon: "https://hrk-boutique.s3.ap-south-1.amazonaws.com/Interro.AI.png",
    },
};

const FormLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main>
            {children}
        </main>
    );
};

export default FormLayout;