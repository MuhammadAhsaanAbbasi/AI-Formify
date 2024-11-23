import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SignInButton, useUser } from '@clerk/nextjs'
import React from 'react'
import EditForm from './EditForm'
import AddFormFields from './AddFormFields'
import * as z from "zod"
import { fieldSchema } from '@/schemas/form'

interface FormProps {
    formData: JsonFormParams;
    onFieldsAdd: (fields: z.infer<typeof fieldSchema>) => void;
    onFieldUpdate: (field: UpdateFields, index: number) => void;
    onDeletedField: (index: number) => void;
    enabledSignIn?: boolean;
    isEditable?: boolean
}


const FormUi = ({ formData, onFieldsAdd, onFieldUpdate, onDeletedField, enabledSignIn = false, isEditable = true }: FormProps) => {
    const { isSignedIn } = useUser();
    return (
        <form className='border-2 p-5 md:w-[700px] rounded-lg'>
            <h1 className='text-2xl font-bold text-center'>{formData.formTitle}</h1>
            <h2 className='text-lg text-gray-700 text-center'>{formData.formHeading}</h2>
            {formData.fields.map((field, index) => (
                <div key={field.label} className='flex items-center gap-3'>
                    {
                        field.fieldType == "select" ?
                            <div className='w-full my-3'>
                                <Label className='text-gray-500'>{field.label}</Label>
                                <Select required={field.required} name={field.fieldName}>
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
                                    <RadioGroup required={field.required} defaultValue={field.fieldTitle}>
                                        {field.options?.map((option, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value={option}
                                                    id={index.toString()}
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
                                                <Checkbox id={option} />
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
                                                <Checkbox id={field.fieldName} />
                                                <label
                                                    htmlFor={field.fieldName}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {field.label}
                                                </label>
                                            </div>
                                        }
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
                                            type={field.fieldType}
                                            placeholder={field.placeholder}
                                            name={field.fieldName}
                                            className='bg-transparent'
                                            required={field.required}
                                        />
                                    </div>
                    }
                    {isEditable && (
                        <div>
                            <EditForm
                                defaultValue={field}
                                updateField={(field) => onFieldUpdate(field, index)}
                                deletedField={() => onDeletedField(index)}
                            />
                        </div>
                    )}
                </div>
            ))}
            <div className='flex justify-between items-center gap-3'>
                {!enabledSignIn ?
                    <Button type="submit">Submit</Button> :
                    isSignedIn ?
                        <Button type="submit">Submit</Button> :
                        <Button type="button">
                            <SignInButton mode="modal">
                                SignIn Before Submit
                            </SignInButton>
                        </Button>
                }
                {isEditable && (
                    <AddFormFields
                        addValues={(field) => onFieldsAdd(field)}
                    />
                )}
            </div>
        </form>
    )
}

export default FormUi