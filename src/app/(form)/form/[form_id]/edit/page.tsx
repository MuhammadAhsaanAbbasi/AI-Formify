import FormEdit from '@/components/form/edit/FormEdit'
import React from 'react'

interface Iprops {
    params : {
        form_id : string
    }
}

const FormEditPage = ({params: {form_id}}: Iprops) => {
    return (
        <FormEdit form_id={form_id} />
    )
}

export default FormEditPage