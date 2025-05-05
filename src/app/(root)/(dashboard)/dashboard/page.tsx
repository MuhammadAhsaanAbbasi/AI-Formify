import CreateForm from '@/components/form/CreateForm'
import FormLists from '@/components/form/FormLists'
import React from 'react'

function DashboardPage() {
    return (
        <div className='py-10 px-10 md:px-16 flex flex-col gap-10'>
            <div className='flex justify-between items-center'>
                <h3 className='text-4xl font-bold'>Dashboard</h3>
                <CreateForm />
            </div>
            <FormLists />
        </div>
    )
}

export default DashboardPage