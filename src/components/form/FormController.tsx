"use client";
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { themes } from '@/constants/constants'
import { bgGradients, styles } from '@/constants/constants';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface IProps {
    setSelectedTheme: Dispatch<SetStateAction<string>>;
    setBgGradient: Dispatch<SetStateAction<string>>;
    setStyles: Dispatch<SetStateAction<BorderStyle>>;
}

const FormController = ({ setSelectedTheme, setBgGradient, setStyles }: IProps) => {
    const [showMore, setShowMore] = useState(6);
    return (
        <div className='border rounded-lg shadow-md p-5 space-y-5'>
            {/* Color Themes */}
            <div className='space-y-5'>
                <h2 className='text-lg font-medium'>
                    Color Theme
                </h2>
                <Select onValueChange={(value) => setSelectedTheme(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {themes.map((theme, index) => (
                            <SelectItem value={theme.theme} key={index}>
                                <div className='flex gap-3'>
                                    <div className='flex'>
                                        <div className='h-5 w-5 rounded-l-md'
                                            style={{ backgroundColor: theme.primary }}
                                        ></div>
                                        <div className='h-5 w-5'
                                            style={{ backgroundColor: theme.secondary }}
                                        ></div>
                                        <div className='h-5 w-5'
                                            style={{ backgroundColor: theme.accent }}
                                        ></div>
                                        <div className='h-5 w-5 rounded-r-md'
                                            style={{ backgroundColor: theme.neutral }}
                                        ></div>

                                    </div>
                                    {theme.theme}
                                </div>
                            </SelectItem>

                        ))}

                    </SelectContent>
                </Select>
            </div>

            {/* Form Background */}
            <div className='my-2 space-y-5'>
                <h2 className='text-lg font-medium'>
                    Background
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {
                        bgGradients.map((bg, index) => (index < showMore) && (index < showMore) && (
                            <div className={`w-full h-[70px] rounded-lg text-white flex items-center justify-center cursor-pointer hover:border-black hover:border-2 font-medium transition duration-300
                            ${index == 0 && `text-orange-500`}
                                `}
                                key={index}
                                style={{
                                    backgroundImage: bg.gradient
                                }}
                                onClick={() => setBgGradient(bg.gradient)}
                            >
                                {bg.name}
                            </div>
                        )
                        )
                    }
                </div>
                <Button variant="ghost" size="sm"
                    className="w-full"
                    onClick={() => setShowMore(showMore > 6 ? 6 : 20)}
                >{showMore > 6 ? 'Show Less' : 'Show More'}
                </Button>
            </div>

            {/* Form Controller */}
            <div className='my-2 space-y-5'>
                <h2 className='text-lg font-medium'>
                    Style
                </h2>
                <div className='flex items-center gap-5'>
                    {
                        styles.map((style, index) => (
                            <div key={index} className='space-y-2'>
                                <div className='hover:cursor-pointer hover:border-2 hover:border-black rounded-lg transition duration-300'
                                    onClick={() => setStyles(style)}
                                >
                                    <Image
                                        src={style.img}
                                        alt={style.name}
                                        width={600}
                                        height={600}
                                        className='rounded-lg'
                                    />
                                </div>
                                <h2 className='text-base font-medium'>
                                    {style.name.toUpperCase()}
                                </h2>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FormController