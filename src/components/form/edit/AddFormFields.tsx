"use client"
import { Button } from '@/components/ui/button';
import { LoaderCircle, Plus, PlusIcon, X } from 'lucide-react';
import React, { useState, useTransition } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { fieldSchema } from '@/schemas/form'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormError } from '@/components/shared/FormError';
import { FormSuccess } from '@/components/shared/FormSuccess';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { fieldTypes } from '@/constants/constants';

interface AddFormProps {
    addValues: (value: z.infer<typeof fieldSchema>) => void;
}

const AddFormFields = ({ addValues }: AddFormProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [fieldName, setFieldName] = useState("");
    const [fieldType, setFieldType] = useState<fieldType>("text");
    const [options, setOptions] = useState<string[]>(["option1", "option2", "option3"]);

    const form = useForm<z.infer<typeof fieldSchema>>({
        resolver: zodResolver(fieldSchema),
        defaultValues: {
            fieldName: fieldName.trim().toLowerCase(),
            fieldTitle: '',
            fieldType: fieldType,
            placeholder: '',
            label: '',
            required: false,
            options: undefined
        },
    });

    // Update options when changes happen
    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...options]; // Copy the current options array
        updatedOptions[index] = value; // Update the specific option
        setOptions(updatedOptions); // Set the updated options array
        form.setValue('options', updatedOptions); // Synchronize the form state with updated options
    };

    const fieldOptionsDeleted = (indexOption: number) => {
        const updatedFieldOptions = options.filter((_, index) => index != indexOption);
        setOptions(updatedFieldOptions);
        form.setValue('options', updatedFieldOptions); // Update form state as well
        toast({
            title: 'Option Removed Successfully!',
            description: 'Click Generate Button After all Changes, So Changes will be Applied.',
            variant: "destructive",
            action: (
                <ToastAction altText="Close">Close</ToastAction>
            ),
        });
    };

    const onSubmit = async (values: z.infer<typeof fieldSchema>) => {
        setError("");
        setSuccess("");

        startTransition(async () => {
            console.log(`values : ${JSON.stringify(values)}`);
            addValues(values);
            form.reset();
            setOpenDialog(false);
        });
    };

    return (
        <div className='fixed bottom-5 right-3 z-50'>
            <Button
                type="button"
                onClick={() => setOpenDialog(true)}
            >
                <Plus className="mr-2 h-4 w-4" />
                <span>
                    Add Fields
                </span>
            </Button>
            <Dialog
                open={openDialog} onOpenChange={setOpenDialog}
            >
                <DialogContent className="w-[70vh] bg-secondary">
                    <DialogHeader>
                        <DialogTitle>Add Fields</DialogTitle>
                        <DialogDescription>
                            Add Fields in your form here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form className="flex flex-col justify-center"
                            onSubmit={form.handleSubmit(onSubmit)}>
                            {/* fieldTitle Field */}
                            <FormField
                                control={form.control}
                                name="fieldTitle"
                                render={({ field }) => (
                                    <FormItem className='my-2'>
                                        <FormLabel htmlFor='title'>Field Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id='title'
                                                disabled={isLoading}
                                                placeholder="First Name"
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setFieldName(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* label Field */}
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem className='my-2'>
                                        <FormLabel htmlFor='label'>Field Label</FormLabel>
                                        <FormControl>
                                            <Input {...field}
                                                id='label'
                                                disabled={isLoading}
                                                placeholder="First Name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Placeholder Field */}
                            <FormField
                                control={form.control}
                                name="placeholder"
                                render={({ field }) => (
                                    <FormItem className='my-2'>
                                        <FormLabel htmlFor='placeholder'>Field Placeholder</FormLabel>
                                        <FormControl>
                                            <Input {...field}
                                                id='placeholder'
                                                disabled={isLoading}
                                                placeholder="Enter your First Name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* fieldType Field */}
                            <FormField
                                control={form.control}
                                name="fieldType"
                                render={({ field }) => (
                                    <FormItem className='my-2'>
                                        <FormLabel htmlFor='types'>Field Type</FormLabel>
                                        <FormControl>
                                            <Select
                                                disabled={isLoading}
                                                onValueChange={(value: fieldType) => {
                                                    field.onChange(value);
                                                    setFieldType(value);
                                                }}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a Field Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Fields Type</SelectLabel>
                                                        {fieldTypes.map((type) => (
                                                            <SelectItem key={type.id} value={type.value}>
                                                                {type.item}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Options Field */}
                            {(fieldType === "select" || fieldType === "radio" || fieldType === "checkbox") && (
                                <FormField
                                    control={form.control}
                                    name="options"
                                    render={({ field }) => (
                                        <FormItem className='my-2'>
                                            <FormLabel htmlFor='options'>Field Options</FormLabel>
                                            {options.map((option, index) => (
                                                <FormControl key={index}>
                                                    <div className='flex items-center gap-2'>
                                                        <Input
                                                            id={`option-${index}`}
                                                            {...field}
                                                            value={option}
                                                            className="w-full h-8"
                                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                                        />
                                                        <X className='h-4 w-4 text-red-500 cursor-pointer' onClick={() => fieldOptionsDeleted(index)} />
                                                    </div>
                                                </FormControl>
                                            ))}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {/* Required Field */}
                            <FormField
                                control={form.control}
                                name="required"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row justify-start items-center gap-3">
                                        <FormControl>
                                            <Input
                                                type="checkbox"
                                                id="required"
                                                checked={field.value || false}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="w-4 h-4 bg-white border-2 cursor-pointer rounded-md checked:bg-blue-600 peer shrink-0 border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            />
                                        </FormControl>
                                        <FormLabel htmlFor='required'>
                                            Field Required
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />

                            {error && <FormError message={error} />}
                            {success && <FormSuccess message={success} />}

                            <DialogFooter>
                                <div className='flex gap-5 justify-end'>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => setOpenDialog(false)}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}  // Disable during submission
                                    >
                                        {
                                            isLoading ? <LoaderCircle className='animate-spin' />
                                                : "Save"
                                        }
                                    </Button>
                                </div>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddFormFields;
