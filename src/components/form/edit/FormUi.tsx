"use client";
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SignInButton, useUser } from '@clerk/nextjs'
import React, { ChangeEvent, FormEvent, useRef, useState, useTransition } from 'react'
import EditForm from './EditForm'
import { CheckedState } from '@radix-ui/react-checkbox'
import { formResponseSubmit } from '@/lib/actions/form.actions'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/hooks/use-toast'
import { Grip, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReorderableList } from '@/components/shared/Render'
import { useDragControls } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';

interface FormProps {
    form_id: string;
    formData: JsonFormParams;
    selectedStyle: BorderStyle;
    enabledSignIn?: boolean;
    isEditable?: boolean;
    selectedTheme?: string;
    onFieldUpdate: (field: UpdateFields, index: number) => void;
    onDeletedField: (index: number) => void;
    onReorder: (newItems: FormField[]) => void
};


const FormUi = ({ formData, form_id, onReorder, onFieldUpdate, selectedStyle, selectedTheme,
    onDeletedField, enabledSignIn = false, isEditable = true }: FormProps) => {
    const { isSignedIn } = useUser();
    const boxShadow = selectedStyle?.key == 'boxshadow' ? selectedStyle.value : '';
    const border = selectedStyle?.key == 'border' ? selectedStyle.value : '';

    // const inputRef = useRef<HTMLInputElement>(null);
    const [jsonFormData, setJsonFormData] = useState<ResponseFormField[]>([]);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const fieldType = type as ResponseFormField['fieldType'];
        setJsonFormData((prev) => {
            // build the new entry
            const newEntry: ResponseFormField = { fieldName: name, fieldValue: value, fieldType };
            // find if it already exists
            const idx = prev.findIndex(item => item.fieldName === name);
            if (idx !== -1) {
                // overwrite at idx
                const updated = [...prev];
                updated[idx] = newEntry;
                return updated;
            } else {
                // append new
                return [...prev, newEntry];
            }
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        setJsonFormData((prev) => {
            // build the new entry
            const newEntry: ResponseFormField = { fieldName: name, fieldValue: value, fieldType: 'select' };
            // find if it already exists
            const idx = prev.findIndex(item => item.fieldName === name);
            if (idx !== -1) {
                // overwrite at idx
                const updated = [...prev];
                updated[idx] = newEntry;
                return updated;
            } else {
                // append new
                return [...prev, newEntry];
            }
        });
    }

    const handleCheckBoxChange = (fieldName: string, value: CheckedState, itemName?: string) => {
        setJsonFormData((prev) => {
            // build the new entry
            const newEntry: ResponseFormField = { fieldName: fieldName, fieldValue: value, fieldType: 'checkbox' };
            // find if it already exists
            const idx = prev.findIndex(item => item.fieldName === fieldName);
            if (idx !== -1) {
                // overwrite at idx
                const updated = [...prev];
                updated[idx] = newEntry;
                return updated;
            } else {
                // append new
                return [...prev, newEntry];
            }
        });
    }


    const formSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startTransition(() => {
            formResponseSubmit(jsonFormData, form_id)
                .then((data) => {
                    if (data?.success) {
                        toast({
                            title: "Successfully Updated!",
                            description: data.success,
                            variant: "success",
                            duration: 2000,
                            action: (
                                <ToastAction altText="Close">Close</ToastAction>
                            ),
                        })
                        router.push("/")
                    }
                    if (data?.error) {
                        toast({
                            title: "Error!",
                            description: data?.message,
                            duration: 2000,
                            variant: "destructive",
                            action: (
                                <ToastAction altText="Close">Close</ToastAction>
                            ),
                        })
                    }
                })
                .catch((error) => {
                    toast({
                        title: "Error!",
                        description: error,
                        duration: 2000,
                        variant: "destructive",
                        action: (
                            <ToastAction altText="Close">Close</ToastAction>
                        ),
                    })
                })
                .finally(() => {
                    formRef.current?.reset();
                })
        })
    }
    return (
        <form className='border-2 p-5 md:w-[700px] rounded-lg' data-theme={selectedTheme}
            style={{
                boxShadow: boxShadow,
                border: border
            }}
            onSubmit={formSubmit}
            ref={formRef}
        >
            <h1 className='text-2xl font-bold text-center'>{formData.formTitle}</h1>
            <h2 className='text-lg text-gray-700 text-center'>{formData.formHeading}</h2>
            <ReorderableList
                isEditable={isEditable}
                items={formData.fields}
                onReorder={onReorder}
                className="space-y-3"
            >
                {(field, index) => (

                    <div key={field.label} className='flex items-center gap-3'>
                        {
                            isEditable && (
                                <Grip size={25}
                                    className='hover:cursor-pointer opacity-40 hover:opacity-85'
                                />
                            )
                        }
                        {
                            field.fieldType == "select" ?
                                <div className='w-full my-3'>
                                    <Label className='text-gray-500'>{field.label}</Label>
                                    <Select required={field.required} name={field.fieldName}
                                        onValueChange={(e) => handleSelectChange(field.label, e)}
                                        disabled={isPending}
                                    >
                                        <SelectTrigger className="w-full bg-transparent">
                                            <SelectValue placeholder={field.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {field.options?.map((option, index) => (
                                                <SelectItem key={index} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                :
                                field.fieldType == "radio" ?
                                    <div className='w-full my-3'>
                                        <Label className='text-gray-500'>{field.label}</Label>
                                        <RadioGroup required={field.required} defaultValue={field.fieldTitle}
                                            disabled={isPending}
                                        >
                                            {field.options?.map((option, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value={option}
                                                        id={index.toString()}
                                                        onClick={() => handleSelectChange(field.label, option)}
                                                    >
                                                        {option}
                                                    </RadioGroupItem>
                                                    <Label htmlFor={index.toString()}>{option}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                    :
                                    field.fieldType == "checkbox" ?
                                        <div className='w-full my-3 space-y-2'>
                                            <Label className='text-gray-500'>{field.label}</Label>
                                            {field.options ? field.options.map((option, index) => (
                                                <div key={index} className="flex items-center gap-2 my-2">
                                                    <Checkbox id={option} disabled={isPending}
                                                        onCheckedChange={(e) => handleCheckBoxChange(field.label, e, option)}
                                                    />
                                                    <label
                                                        htmlFor={option}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))
                                                :
                                                <div className="flex items-center gap-2 my-2">
                                                    <Checkbox id={field.fieldName}
                                                        onCheckedChange={(e) => handleCheckBoxChange(field.label, e, field.fieldName)}
                                                        disabled={isPending} />
                                                    <label
                                                        htmlFor={field.fieldName}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {field.label}
                                                    </label>
                                                </div>
                                            }
                                        </div>
                                        : field.fieldType == "textarea" ?
                                            <div className='w-full my-3 space-y-2'>
                                                <Label className='text-gray-500 flex items-center gap-2'>
                                                    {field.label}
                                                    {!field.required && (
                                                        <span>(Optional)</span>
                                                    )}
                                                </Label>
                                                <Textarea
                                                    name={field.label}
                                                    placeholder={field.placeholder}
                                                    required={field.required}
                                                    className="bg-transparent"
                                                    onBlur={handleInputChange}
                                                    disabled={isPending}
                                                />
                                            </div>
                                            :
                                            field.fieldType == "file" ?
                                                <div className='w-full my-3 space-y-2'>
                                                    <Label className='text-gray-500 flex items-center gap-2'>
                                                        {field.label}
                                                        {!field.required && (
                                                            <span>(Optional)</span>
                                                        )}
                                                    </Label>
                                                    <Input
                                                        name={field.label}
                                                        type="file"
                                                        placeholder={field.placeholder}
                                                        required={field.required}
                                                        className="bg-transparent"
                                                        onBlur={handleInputChange}
                                                        disabled={isPending}
                                                    />
                                                </div>
                                                :
                                                <div className='w-full my-3 space-y-2'>
                                                    <Label className='text-gray-500 flex items-center gap-2'>
                                                        {field.label}
                                                        {!field.required && (
                                                            <span>(Optional)</span>
                                                        )}
                                                    </Label>
                                                    <Input
                                                        name={field.label}
                                                        type={field.fieldType}
                                                        placeholder={field.placeholder}
                                                        required={field.required}
                                                        className="bg-transparent"
                                                        onBlur={handleInputChange}  // now only fires once, when focus leaves
                                                        disabled={isPending}
                                                    />

                                                </div>
                        }
                        {isEditable && (
                            <EditForm
                                defaultValue={field}
                                updateField={(field) => onFieldUpdate(field, index)}
                                deletedField={() => onDeletedField(index)}
                            />
                        )}
                    </div>
                )}
            </ReorderableList>
            {/* {formData.fields?.map((field: FormField, index) => (
            ))} */}
            <div className='flex justify-between items-center gap-3'>
                {isEditable ? (
                    <button type="button" className='btn btn-primary'>Submit</button>
                ) : (

                    <button type="submit" className='btn btn-primary'
                        disabled={!isSignedIn || isPending}
                    >
                        {
                            isPending ? <LoaderCircle className="animate-spin" /> : "Submit"
                        }
                    </button>
                )}
                {enabledSignIn &&
                    !isSignedIn &&
                    <Button type="button">
                        <SignInButton mode="modal">
                            SignIn Before Submit
                        </SignInButton>
                    </Button>
                }
            </div>
        </form>
    )
}

export default FormUi;