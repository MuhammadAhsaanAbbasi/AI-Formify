import { Button } from '@/components/ui/button';
import { bgGradients } from '@/constants/constants';
import React, { Dispatch, SetStateAction, useState } from 'react'

interface IProps {
    setBgGradient: Dispatch<SetStateAction<string>>
}

const FormBackground = ({ setBgGradient }: IProps) => {
    const [showMore, setShowMore] = useState(6);
    return (
        <div className='my-2 space-y-5'>
            <h2 className='text-lg font-medium'>
                Background
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {
                    bgGradients.map((bg, index) =>(index<showMore)&& (index<showMore)&&(
                            <div className={`w-full h-[70px] rounded-lg text-white flex items-center justify-center cursor-pointer hover:border-black hover:border-2 font-medium transition duration-300
                            ${index==0 && `text-orange-500`}
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
    )
}

export default FormBackground;