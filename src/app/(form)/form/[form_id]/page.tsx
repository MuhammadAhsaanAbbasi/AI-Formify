import FormWrapper from '@/components/form/form'
import React from 'react'

interface Iprops {
    params : {
        form_id : string
    }
}


const FormPage = ({params : {form_id}}: Iprops) => {
    return (
        <FormWrapper form_id={form_id} />
    )
}

export default FormPage