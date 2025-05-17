import FormResponses from '@/components/form/FormResponses'
import React from 'react'

const ResponsesPage = () => {
    return (
        <main className='w-[90%] mx-auto my-10 space-y-6'>
            <div>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-medium font-fontSans'>
                    Form Responses
                </h1>
            </div>
            <FormResponses />
        </main>
    )
}

export default ResponsesPage