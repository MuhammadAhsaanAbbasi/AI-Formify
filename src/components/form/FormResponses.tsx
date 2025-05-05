"use client";
import { getFormsData } from '@/lib/actions/form.actions'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const FormResponses = () => {

    const [forms, setForms] = useState<FormParams[]>([]);
    const [formId, setFormId] = useState<number | undefined>()
    const [formResponse, setFormResponse] = useState<ResponseFormField[]>();

    const { user } = useUser();
    const UserID = user?.id as string;

    useEffect(() => {
        const formData = async () => {
            const response = await getFormsData(UserID);
            if (response.success) {
                setForms(response.success);
            }
            // const formResponse = await getFormsResponses(formId);
        };
        formData();
    }, [UserID]);

    const firstResponse = forms[0];
    console.log(firstResponse);

    return (
        <section className='my-5 md:my-8'>
            <div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Your Form"  />
                        {/* // defaultValue={firstJsonResponse.formTitle} /> */}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Forms</SelectLabel>
                            {forms.map((form: FormParams) => (
                                <div key={form.id}>
                                    <SelectItem value={form.mockID}>
                                        {JSON.parse(form.jsonFormResp).formTitle}
                                    </SelectItem>
                                </div>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </section>
    )
}

export default FormResponses