"use client";
import CreateForm from '@/components/form/CreateForm'
import FormLists from '@/components/form/FormLists'
import { getFormsData } from '@/lib/actions/form.actions';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

export const Dashboard = () => {
    const [formlistLength, setFormlistLength] = useState<number>();
    const [disabled, setDisabled] = useState(false);

    const { user } = useUser();
    const UserId = user?.id as string;

    useEffect(() => {
        const formData = async () => {
            const response = await getFormsData(UserId);
            if (response.success) {
                setFormlistLength(response?.success.length);
                const percentage = (response.success.length / 3) * 100;
                if (percentage >= 100) {
                    setDisabled(true);
                }
            }
        };
        formData();
    }, [formlistLength, UserId]);
    return (
        <div className='py-10 px-5 sm:px-10 md:px-16 flex flex-col gap-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-medium font-fontSans'>
                    Dashboard
                </h1>
                <CreateForm disable={disabled} />
            </div>
            <FormLists />
        </div>
    )
};