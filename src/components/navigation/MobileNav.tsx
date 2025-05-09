"use client";
import React, { useEffect, useState } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
    SheetTitle, // Importing SheetTitle
} from "@/components/ui/sheet";

import { Menu, PanelLeftOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { menuList } from '@/constants/constants';
import CreateForm from '../form/CreateForm';
import { Progress } from '../ui/progress';
import { useUser } from '@clerk/nextjs';
import { getFormsData } from '@/lib/actions/form.actions';

const MobileNav = () => {
    const [formPercentage, setFormPercentange] = useState(0);
    const [formlistLength, setFormlistLength] = useState<number>();
    const [disabled, setDisabled] = useState(false);
    const pathname = usePathname();
    const { user } = useUser();
    const UserId = user?.id as string;

    useEffect(() => {
        const formData = async () => {
            const response = await getFormsData(UserId);
            if (response.success) {
                setFormlistLength(response?.success.length);
                const percentage = (response.success.length / 3) * 100;
                setFormPercentange(percentage);
                if (formPercentage >= 100) {
                    setDisabled(true);
                }
            }
        };
        formData();
    }, [formPercentage, UserId]);

    return (
        <section className='md:hidden px-5 pt-10'>
            <Sheet>
                <SheetTrigger asChild>
                    <PanelLeftOpen height={36} width={36} className='cursor-pointer text-primary' />
                </SheetTrigger>
                <SheetContent side={'left'} className='bg-secondary text-primary'>
                    {/* Adding SheetTitle for accessibility */}
                    <SheetTitle className="my-4 mx-8">
                        <div className='flex items-center text-primary'>

                        </div>
                    </SheetTitle>
                    <div className='flex h-[calc(100vh-72px)] flex-col items-center gap-6 overflow-y-auto'>
                        <SheetClose asChild>
                            <ul className="flex flex-col gap-6 my-10 w-full">
                                {menuList.map((link, index) => {
                                    const isActive = pathname === link.path;
                                    return (
                                        <SheetClose asChild={true} key={index} className='mx-8'>
                                            <Link href={link.path}
                                                className={cn(
                                                    'font-medium px-3 py-2 border-2 border-primary hover:bg-primary hover:text-secondary rounded-xl cursor-pointer',
                                                    {
                                                        'bg-secondary': isActive,
                                                    }
                                                )}
                                            >
                                                <li
                                                    className='font-semibold uppercase text-center'>
                                                    {link.name}
                                                </li>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </ul>
                        </SheetClose>
                        {/* <SheetClose asChild className='flex justify-items-center max-w-full bg-primary'>
                            <RSVPButton />
                        </SheetClose> */}
                        <div className='p-6'>
                            <CreateForm disable={disabled} />
                            <div className='my-8'>
                                <Progress value={formPercentage} />
                                <h2 className='text-sm my-2 text-gray-600'><span>{formlistLength} out of 3</span> Form Created</h2>
                                {/* Conditionally Rendered */}
                                <h2 className='text-sm my-2 text-gray-600'>Upgrade your plan for unlimited AI form build</h2>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
