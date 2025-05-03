import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
};

export const AuthHeader = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <Image
                src="https://myapplication-logos.s3.ap-south-1.amazonaws.com/ai-formify.png"
                alt="logo"
                width={80}
                height={80}
                className="w-14 h-14 object-contain"
            />
            <p className="text-base">
                {label}
            </p>
        </div>
    );
};