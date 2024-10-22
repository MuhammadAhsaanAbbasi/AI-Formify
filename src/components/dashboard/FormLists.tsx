"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import FormListItems from './FormListItems';
import { getFormsData } from '@/lib/actions/form.actions';
import { Loading } from '../shared/loading';

const FormLists = () => {
    const { user } = useUser();
    const UserId = user?.id as string;
    const [formList, setFormList] = useState<FormParams[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const formData = async () => {
            setLoading(true);
            const response = await getFormsData(UserId);
            if (response.success) {
                setFormList(response.success);
            }
            setLoading(false);
        };
        formData();
    }, [UserId]);

    const handleDelete = (id: number) => {
        // Remove the deleted form from the list
        setFormList(prevForms => prevForms.filter(form => form.id !== id));
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {loading ? (
                <>
                    {[...Array(4)].map((_, index) => (
                        <Loading key={index} />
                    ))}
                </>
            ) : (
                formList && formList.map((form) => (
                    <FormListItems
                        key={form.id}
                        formRecords={form}
                        jsonForm={JSON.parse(form.jsonFormResp)}
                        onDelete={handleDelete}  // Pass the delete handler
                    />
                ))
            )}
        </div>
    );
};

export default FormLists;
