import React, { Dispatch, SetStateAction } from 'react'
import ColorTheme from './ColorTheme'
import FormBorder from './FormBorder'
import FormBackground from './FormBackground'

interface IProps {
    setSelectedTheme: (val: string) => {};
}

const FormController = ({setSelectedTheme}: IProps) => {
    return (
        <div className='border rounded-lg shadow-md p-5 space-y-3'>
            <ColorTheme setSelectedTheme={(value) => setSelectedTheme(value)} />
            <FormBackground />
            <FormBorder />
        </div>
    )
}

export default FormController