import Form from '@/components/form/Form'
import React from 'react'

interface Iprops {
    params : {
        form_id : string
    }
}


const FormPage = ({params : {form_id}}: Iprops) => {
    return (
        <Form form_id={form_id} />
    )
}

export default FormPage