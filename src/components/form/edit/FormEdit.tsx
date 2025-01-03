"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, Share, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormController from '@/components/form/controllers/FormController'
import FormUi from './FormUi'
import { useUser } from '@clerk/nextjs'
import { getFormById, updateFields } from '@/lib/actions/form.actions'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import * as z from "zod"
import { fieldSchema } from '@/schemas/form'


const FormEdit = ({ form_id }: { form_id: string }) => {

    const [jsonFormData, setJsonFormData] = useState<JsonFormParams>({
        formTitle: "",
        formHeading: "",
        fields: []
    });

    const [formParams, setFormParams] = useState<string>('')

    const [updateFieldTrigger, setUpdateFieldTrigger] = useState<number>();

    const router = useRouter();
    const { user } = useUser();
    const UserId = user?.id as string;

    useEffect(() => {
        const formData = async () => {
            const response = await getFormById(form_id, UserId)
            if (response.success) {
                setJsonFormData(JSON.parse(response.success.jsonFormResp));
                setFormParams(response.success.jsonFormResp);
            }
        };
        formData();
    }, [UserId, form_id]);

    const onFieldsAdd = (fields: z.infer<typeof fieldSchema>) => {
        jsonFormData.fields.push(fields);
        setJsonFormData(jsonFormData);
        setFormParams(JSON.stringify(jsonFormData));
        setUpdateFieldTrigger(Date.now());
    }

    const onFieldUpdate = (field: UpdateFields, index: number) => {
        jsonFormData.fields[index].label = field.label;
        jsonFormData.fields[index].placeholder = field.placeholder;
        if (jsonFormData.fields[index].options) {
            jsonFormData.fields[index].options = field.options;
        }
        setJsonFormData(jsonFormData);
        setFormParams(JSON.stringify(jsonFormData));
        setUpdateFieldTrigger(Date.now());
    }

    const onFieldDeleted = (isIndexNumber: number) => {
        const formDeleted = jsonFormData.fields.filter((_, index) => index !== isIndexNumber);
        jsonFormData.fields = formDeleted;
        setJsonFormData(jsonFormData);
        setFormParams(JSON.stringify(jsonFormData));
        setUpdateFieldTrigger(Date.now());
    }

    const updateFieldInDb = async () => {
        const response = await updateFields(formParams, form_id, UserId);
        if (response?.success) {
            toast({
                title: "Successfully Updated!",
                description: response.success,
                variant: "success",
                duration: 2000,
                action: (
                    <ToastAction altText="Close">Close</ToastAction>
                ),
            })
        }
        if (response?.error) {
            toast({
                title: "Error!",
                description: response?.error,
                duration: 2000,
                variant: "destructive",
                action: (
                    <ToastAction altText="Close">Close</ToastAction>
                ),
            })
        }
    }


    useEffect(() => {
        if (updateFieldTrigger) {
            updateFieldInDb();
        }
    }, [updateFieldTrigger, updateFieldInDb])

    return (
        <div className='p-5'>
            <div className='flex justify-between items-center px-2'>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className='flex gap-2 items-center my-5 cursor-pointer'>
                            <ArrowLeftIcon />
                            <span>Back</span>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-full bg-secondary'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the form
                                and remove its data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => router.back()}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div className='flex gap-2 items-center'>
                    <Button className='flex items-center gap-2'
                        onClick={() => router.push(`/form/${form_id}`)}
                    >
                        <SquareArrowOutUpRight className='h-5 w-5' />
                        <span>Live Preview</span>
                    </Button>
                    <Button className='flex items-center gap-2 bg-green-500 hover:bg-green-400 transition-all'>
                        <Share className='h-5 w-5' />
                        <span>Share</span>
                    </Button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <FormController form_id={form_id} />
                <div className='md:col-span-2 border rounded-lg shadow-md p-5 flex justify-center items-center'>
                    <FormUi
                        formData={jsonFormData}
                        onFieldUpdate={onFieldUpdate}
                        onDeletedField={onFieldDeleted}
                        onFieldsAdd={onFieldsAdd}
                    />
                </div>
            </div>
        </div>
    )
}

export default FormEdit