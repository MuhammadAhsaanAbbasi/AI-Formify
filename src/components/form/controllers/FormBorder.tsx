import { styles } from '@/constants/constants';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react'

interface IProps {
    setStyles: Dispatch<SetStateAction<BorderStyle>>;
}

const FormBorder = ({ setStyles }: IProps) => {
    return (
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
    )
}

export default FormBorder;
