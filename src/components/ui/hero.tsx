"use client"
import { SignInButton, useUser } from '@clerk/nextjs'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './button'

const Hero = () => {
    const { isSignedIn } = useUser();
    return (
        <section className="min-h-screen">
            <div className="mx-auto max-w-screen-2xl z-30 px-4 py-28 lg:flex h-[500px] bg-[url('/grid.svg')]">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Create your Form
                        <strong className="font-extrabold text-primary sm:block"> In Seconds Not  in Hours </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed text-gray-500">
                        Generate, publish and share your form right away with AI. Dive into insightful results, charts and analytics.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
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
                <div className="mx-auto max-w-screen-xl px-4 py-16">
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">How it Works</h2>

                        <p className="mt-4 text-gray-300">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur aliquam doloribus
                            nesciunt eos fugiat. Vitae aperiam fugit consequuntur saepe laborum.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <Link
                            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10"
                            href="#"
                        >
                            <AtomIcon className='h-8 w-8' />

                            <h2 className="mt-4 text-xl font-bold text-black">Write promot for your form</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
                                distinctio alias voluptatum blanditiis laudantium.
                            </p>
                        </Link>

                        <Link
                            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10"
                            href="#"
                        >
                            <Edit className='h-8 w-8' />

                            <h2 className="mt-4 text-xl font-bold text-black">Edit Your form </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
                                distinctio alias voluptatum blanditiis laudantium.
                            </p>
                        </Link>

                        <Link
                            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10"
                            href="#"
                        >
                            <Share2 className='h-8 w-8' />

                            <h2 className="mt-4 text-xl font-bold text-black">Share & Start Accepting Responses</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
                                distinctio alias voluptatum blanditiis laudantium.
                            </p>
                        </Link>


                    </div>

                    <div className="mt-12 text-center">
                        {
                            isSignedIn ?
                                <div className='mt-12 text-center'>
                                    <Link href={"/dashboard"}>
                                        <Button variant={"outline"} className="rounded-md bg-orange-700 px-10 py-4 text-sm font-medium text-white transition hover:bg-primary focus:outline-none focus:ring focus:ring-orange-400 text-center">
                                            Dashboard
                                        </Button>
                                    </Link>
                                </div>
                                :
                                <SignInButton>
                                    <Button className="rounded-md bg-primary px-10 py-4 text-sm font-medium text-white transition hover:bg-orange-700 focus:outline-none focus:ring focus:ring-yellow-400">
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