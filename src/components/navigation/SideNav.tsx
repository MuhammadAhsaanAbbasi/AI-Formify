/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { LibraryBig, MessageSquare, Shield } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'

const menuList = [
    {
        id: 0,
        name: 'My Forms',
        icon: LibraryBig,
        path: '/dashboard'
    },
    {
        id: 1,
        name: 'Responses',
        icon: MessageSquare,
        path: '/form/responses'
    },
    {
        id: 2,
        name: 'Upgrade',
        icon: Shield,
        path: '/dashboard/upgrade'
    }
]

const SideNav = () => {
    const [formsCreated, setFormsCreated] = useState(0)
    const path = usePathname();

    return (
        <div className='h-screen w-auto shadow-md border-2 bg-secondary rounded-md'>
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
                <Button className='w-full'>+ Create Form</Button>
                <div className='my-8'>
                    <Progress value={50} />
                    <h2 className='text-sm my-2 text-gray-600'><span>{formsCreated} out of 3</span> Form Created</h2>
                    {/* Conditionally Rendered */}
                    <h2 className='text-sm my-2 text-gray-600'>Upgrade your plan for unlimited AI form build</h2>
                </div>
            </div>
        </div>
    )
}

export default SideNav