"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'
import { getFormsData } from '@/lib/actions/form.actions'
import { useUser } from '@clerk/nextjs'
import CreateForm from '../form/CreateForm'
import { menuList } from '@/constants/constants'



export const SideNav = () => {
    const [formPercentage, setFormPercentange] = useState(0);
    const [formlistLength, setFormlistLength] = useState<number>();
    const [limit, setLimit] = useState<number>(3);
    const [disabled, setDisabled] = useState(false);
    const path = usePathname();

    const { user } = useUser();
    const UserId = user?.id as string;

    useEffect(() => {
        const formData = async () => {
            const response = await getFormsData(UserId);
            console.log(`SideNav Response : ${(response.error)}`);
            if (response.success) {
                setFormlistLength(response?.success.length);
                // console.log(`limit : ${response?.limit}`);
                setLimit(response?.limit);
                const percentage = (response.success.length / limit) * 100;
                setFormPercentange(percentage);
                if (formPercentage >= 100) {
                    setDisabled(true);
                }
            }
        };
        formData();
    }, [formPercentage, UserId]);

    return (
        <div className='hidden md:block h-screen w-auto shadow-md border-2 bg-secondary rounded-md'>
            <div className='p-4 space-y-5'>
                {
                    menuList.map((menu) => (
                        <Link key={menu.id} href={menu.path}
                            className={`flex items-center gap-5 p-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-colors text-lg font-medium
                            ${path === menu.path && "bg-primary text-white font-semibold"}`}
                        >
                            <menu.icon />
                            {menu.name}
                        </Link>
                    ))
                }
            </div>
            <div className='fixed bottom-7 p-6 w-56'>
                <CreateForm disable={disabled} />
                <div className='my-8'>
                    <Progress value={formPercentage} />
                    <h2 className='text-sm my-2 text-gray-600'>
                        <span>
                            {formlistLength} out of
                            <span> {limit}</span>
                        </span> Form Created</h2>
                    {/* Conditionally Rendered */}
                    <h2 className='text-sm my-2 text-gray-600'>
                        {
                            limit < 5 && (
                                <span>
                                    Upgrade your plan for unlimited AI form build
                                </span>
                            )
                        }
                    </h2>
                </div>
            </div>
        </div>
    )
};