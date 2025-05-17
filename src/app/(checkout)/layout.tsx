import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "AI-Formify",
    description: "AI Form Generator",
    icons: {
      icon: "https://myapplication-logos.s3.ap-south-1.amazonaws.com/ai-formify.png",
    },
  };

const CheckOutLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main>
            {children}
        </main>
    );
};

export default CheckOutLayout;