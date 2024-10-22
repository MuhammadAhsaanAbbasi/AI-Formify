"use client"
import React, { useState } from 'react'
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
import { Edit, Share, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { Forms } from '@/utils/schema';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';

interface IFormProps {
    formRecords: FormParams;
    jsonForm: JsonFormParams;
    onDelete: (id: number) => void;  // New prop to handle delete on parent state
}

const FormListItems = ({ formRecords, jsonForm, onDelete }: IFormProps) => {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter(); 

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await db.delete(Forms).where(eq(Forms.id, formRecords.id));
            if (response) {
                toast({
                    title: "Successfully Deleted!",
                    duration: 2000,
                    variant: "success",
                    action: (
                        <ToastAction altText="Close">Close</ToastAction>
                    ),
                });
                // Optimistically update the UI
                onDelete(formRecords.id);
            }
        } catch (error) {
            toast({
                title: "Error occurred!",
                description: "Could not delete the form.",
                variant: "destructive",
                duration: 2000,
                action: (
                    <ToastAction altText="Close">Close</ToastAction>
                ),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-white p-4 rounded-lg shadow-md border'>
            <div className='flex justify-end m-2'>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Trash className='h-6 w-6 text-primary cursor-pointer hover:scale-105 transition-all' />
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
                            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                            <AlertDialogAction disabled={isLoading} onClick={handleDelete}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div>
                <h1 className='text-xl text-black'>{jsonForm.formTitle}</h1>
                <h2 className='text-base text-gray-500'>{jsonForm.formHeading}</h2>
            </div>
            <hr className='my-4'></hr>
            <div className='flex justify-between items-center gap-2'>
                <Button variant={"ghost"} className='flex justify-center items-center gap-2'>
                    <Share />
                    <span>Share</span>
                </Button>
                <Button className='flex justify-center items-center gap-2'
                    onClick={() => router.push(`/form/${formRecords.formID}/edit`)}
                >
                    <Edit />
                    <span>Edit</span>
                </Button>
            </div>
        </div>
    );
};

export default FormListItems;
