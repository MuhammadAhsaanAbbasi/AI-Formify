import React from 'react'
import ColorTheme from './ColorTheme'
import FormBorder from './FormBorder'
import FormBackground from './FormBackground'

const FormController = ({ form_id }: { form_id: string }) => {
    return (
        <div className='border rounded-lg shadow-md p-5 space-y-3'>
            <ColorTheme />
            <FormBackground />
            <FormBorder />
        </div>
    )
}

export default FormController