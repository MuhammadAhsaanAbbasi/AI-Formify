"use client"
import { SignInButton, useUser } from '@clerk/nextjs'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
    const { isSignedIn } = useUser();
    return (
        <section className="min-h-screen">
            <div className="mx-auto max-w-screen-2xl z-30 px-4 py-28 lg:flex h-[500px] bg-[url('/grid.svg')]">
                <div className="mx-auto max-w-xl text-center space-y-6">
                    <h1 className="text-3xl text-primary font-extrabold sm:text-4xl md:text-5xl space-x-2">
                        <span className=''>
                            AI Form Builder:
                        </span>
                        <span className='text-black'>
                            Create & Share
                        </span>
                        <span className="">
                            Custom Forms in
                        </span>
                        <span className='text-black'>
                            Seconds
                        </span>
                    </h1>

                    <p className="sm:text-xl/relaxed text-gray-500">
                        Effortlessly generate, publish, and analyze forms with our AI-powered builder, gain real-time insights, charts, and reports in minutes.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-orange-600 focus:outline-none focus:ring active:bg-orange-200 sm:w-auto"
                            href="/dashboard" >
                            + Create AI Form
                        </Link>

                        <Link className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-orange-600 focus:outline-none focus:ring active:text-orange-200 sm:w-auto"
                            href="#" >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
            <section className='bg-secondary'>
                <div className="mx-auto max-w-screen-xl px-4 py-16 space-y-12">
                    <div className="mx-auto max-w-lg text-center space-y-4">
                        <h2 className="text-3xl font-bold sm:text-4xl text-primary">
                            How AI Form Builder Works
                        </h2>

                        <p className="text-base font-medium text-gray-600">
                            Effortlessly generate an intelligent form, fine-tune its fields, and publish to collect insights powered by AI in under a minute.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <Link
                            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10 space-y-4"
                            href="#"
                        >
                            
                            <Edit className='h-8 w-8' />

                            <div className='space-y-2'>
                                <h4 className="text-xl font-semibold text-black">
                                    Generate AI-Powered Form Prompts
                                </h4>

                                <p className="text-sm text-gray-600">
                                    Let our AI analyze your title and description to auto-create relevant form fields—no design skills required. Simply enter what you need, and watch a complete questionnaire materialize in seconds.
                                </p>
                            </div>
                        </Link>

                        <Link
                            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10 space-y-4"
                            href="#"
                        >
                            <AtomIcon className='h-8 w-8' />

                            <div className='space-y-2'>
                                <h2 className="text-xl font-semibold text-black">
                                    Customize & Edit Your Form Layout
                                </h2>

                                <p className="text-sm text-gray-600">
                                    Tailor every question with our drag-and-drop editor. Add, remove or reorder fields, adjust labels, and apply your brand’s colors and fonts for a polished, user-friendly experience.
                                </p>
                            </div>
                        </Link>

                        <Link
                            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10 space-y-4"
                            href="#"
                        >
                            <Share2 className='h-8 w-8' />

                            <div className='space-y-2'>

                                <h2 className="text-xl font-semibold text-black">
                                    Publish & Collect Responses Instantly
                                </h2>

                                <p className="text-sm text-gray-600">
                                    One-click publish gives you a shareable link and embed code. Start gathering responses right away, then dive into real-time charts, analytics, and exportable reports to drive data-driven decisions.
                                </p>
                            </div>
                        </Link>


                    </div>

                    <div className="text-center">
                        {
                            isSignedIn ?
                                <div className='mt-12 text-center'>
                                    <Link href={"/dashboard"}>
                                        <Button variant={"outline"} className="rounded-md bg-orange-600 px-10 py-4 text-sm font-medium text-white transition hover:bg-primary focus:outline-none focus:ring focus:ring-orange-400 text-center hover:text-white">
                                            Dashboard
                                        </Button>
                                    </Link>
                                </div>
                                :
                                <SignInButton>
                                    <Button className="rounded-md bg-primary px-10 py-4 text-sm font-medium text-white transition hover:bg-primary/20 focus:outline-none focus:ring focus:ring-yellow-400">
                                        Get Started Today
                                    </Button>
                                </SignInButton>
                        }
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Hero