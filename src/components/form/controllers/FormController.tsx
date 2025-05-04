import React, { Dispatch, SetStateAction } from 'react'
import ColorTheme from './ColorTheme'
import FormBorder from './FormBorder'
import FormBackground from './FormBackground'

interface IProps {
    setSelectedTheme: Dispatch<SetStateAction<string>>;
    setBgGradient: Dispatch<SetStateAction<string>>;
    setStyles: Dispatch<SetStateAction<BorderStyle>>;
}

const FormController = ({setSelectedTheme, setBgGradient, setStyles}: IProps) => {
    return (
        <div className='border rounded-lg shadow-md p-5 space-y-5'>
            <ColorTheme setSelectedTheme={(value) => setSelectedTheme(value)} />
            <FormBackground setBgGradient={(value) => setBgGradient(value)} />
            <FormBorder setStyles={(value) => setStyles(value)} />
        </div>
    )
}

export default FormController