import React, { Dispatch, SetStateAction } from 'react'
import ColorTheme from './ColorTheme'
import FormBorder from './FormBorder'
import FormBackground from './FormBackground'

interface IProps {
    setSelectedTheme: Dispatch<SetStateAction<string>>;
    setBgGradient: Dispatch<SetStateAction<string>>;
}

const FormController = ({setSelectedTheme, setBgGradient}: IProps) => {
    return (
        <div className='border rounded-lg shadow-md p-5 space-y-5'>
            <ColorTheme setSelectedTheme={(value) => setSelectedTheme(value)} />
            <FormBackground setBgGradient={(value) => setBgGradient(value)} />
            <FormBorder />
        </div>
    )
}

export default FormController