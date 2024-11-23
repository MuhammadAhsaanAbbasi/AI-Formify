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
        <header className='px-6 sm:px-12 md:px-18 flex justify-between items-center gap-3 shadow-md border-b-2 border-solid'>
            <Link href={"/"}
                className='flex items-center'
            >
                <Image
                    src={"https://hrk-boutique.s3.ap-south-1.amazonaws.com/Interro.AI.png"}
                    alt='AIFormify'
                    width={100}
                    height={50}
                    className='w-auto h-auto'
                    priority={true}
                />
                <span className='text-2xl font-bold text-primary'>AIFormify</span>
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