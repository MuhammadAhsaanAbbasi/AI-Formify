"use client"
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'


const Header = () => {
    const path = usePathname();
    const {isSignedIn} = useUser();
    return (
        <header className='px-6 sm:px-12 md:px-18 flex justify-between items-center gap-3 shadow-md border-b-2 border-solid sticky top-0 z-50 bg-white'>
            <Link href={"/"}
                className='flex items-center md:gap-2'
            >
                <Image
                    src={"https://myapplication-logos.s3.ap-south-1.amazonaws.com/ai-formify.png"}
                    alt='AIFormify'
                    width={80}
                    height={50}
                    className='w-20 h-20 md:w-auto md:h-auto'
                    priority={true}
                />
                <span className='text-xl md:text-2xl font-bold text-primary'>AIFormify</span>
            </Link>
            {
                isSignedIn ? 
                <div className='flex items-center gap-4'>
                    <Link href={"/dashboard"}>
                    <Button variant={"outline"} className={`${path==="/dashboard" && "bg-accent text-accent-foreground"}`}>
                        Dashboard
                    </Button>
                    </Link>
                    <UserButton />
                </div>
                : 
                <SignInButton>
                    <Button>
                        Get Started
                    </Button>
                </SignInButton>
            }
        </header>
    )
}

export default Header