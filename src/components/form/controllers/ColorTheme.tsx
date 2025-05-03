import React, { Dispatch } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { themes } from '@/constants/constants'

interface IProps {
    setSelectedTheme: (val: string) => {}
}


const ColorTheme = ({ setSelectedTheme }:IProps) => {
    return (
        <div className='space-y-2'>
            <h2>
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
    )
}

export default ColorTheme