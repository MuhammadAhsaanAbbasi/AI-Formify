import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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
} from "@/components/ui/alert-dialog";
import { Delete, Edit, PlusIcon, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface EditFormProps {
    defaultValue: FormField;
    updateField: (field: UpdateFields) => void;
    deletedField: () => void;
}

const EditForm = ({ defaultValue, updateField, deletedField }: EditFormProps) => {
    const [label, setLabel] = useState(defaultValue.label);
    const [placeholder, setPlaceholder] = useState(defaultValue.placeholder);
    const [options, setOptions] = useState(defaultValue.options || []);
    const [openDialog, setOpenDialog] = useState(false);

    // Function to handle option updates
    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...options]; // Copy the current options array
        updatedOptions[index] = value; // Update the specific option
        setOptions(updatedOptions); // Set the updated options array
    };

    const fieldOptionsDeleted = (indexOption: number) => {
        const updatedFieldOptions = options.filter((_, index) => index != indexOption);
        defaultValue.options = updatedFieldOptions
        setOptions(defaultValue.options);
        toast({
            title: 'Option Remove Successfully!!',
            description: 'Click Upgrade Button After all Changes, So Changes will be Applied.',
            variant: "destructive",
            action: (
                <ToastAction altText="Close">Close</ToastAction>
            ),
        })
    }

    const addNewOption = () => {
        const updatedOptions = [...options, `option${options.length + 1}`]; // Add new default option
        defaultValue.options = updatedOptions // Synchronize form state
        setOptions(defaultValue.options);
        toast({
            title: 'New Option Added Successfully!!',
            description: 'Click Upgrade Button After all Changes, So Changes will be Applied.',
            variant: "default",
            action: (
                <ToastAction altText="Close">Close</ToastAction>
            ),
        })
    };

    // Function to handle the button click and close the dialog
    const handleUpdateAndClose = () => {
        updateField({
            label: label,
            placeholder: placeholder,
            options: options, // Pass the updated options back
        });
        setOpenDialog(false); // Close the dialog
    };

    return (
        <div className='flex items-center gap-2'>
            <Popover open={openDialog} onOpenChange={setOpenDialog}>
                <PopoverTrigger asChild onClick={() => setOpenDialog(true)}>
                    <Edit className='h-6 w-6 text-gray-500 cursor-pointer' />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Edit Form Inputs</h4>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="label">Label</Label>
                                <Input
                                    id="label"
                                    value={label}
                                    className="col-span-2 h-8"
                                    onChange={(e) => setLabel(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="placeholder">Placeholder</Label>
                                <Input
                                    id="placeholder"
                                    value={placeholder}
                                    className="col-span-2 h-8"
                                    onChange={(e) => setPlaceholder(e.target.value)}
                                />
                            </div>
                        </div>

                        {(defaultValue.fieldType === "select" || defaultValue.fieldType === "radio") && (
                            <div className="flex flex-col justify-center gap-3">
                                <Label htmlFor="options">Options</Label>
                                {options?.map((option, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <Input
                                            id={`option-${index}`}
                                            value={option}
                                            className="w-full h-8"
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                        />
                                        <X className='h-4 w-4 text-red-500 cursor-pointer' onClick={() => fieldOptionsDeleted(index)} />
                                    </div>
                                ))}
                                <Button size="sm" onClick={() => addNewOption()} className='flex items-center gap-2 bg-primary p-3 rounded-md'>
                                    <PlusIcon className='w-5 h-5' />
                                    <span className='text-sm'>Add</span>
                                </Button>
                            </div>
                        )}

                        {defaultValue.fieldType === "checkbox" && options && (
                            <div className="flex flex-col justify-center gap-4">
                                <Label htmlFor="option">Options:</Label>
                                {options?.map((option, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <Input
                                            id={`option-${index}`}
                                            value={option}
                                            className="w-full h-8"
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                        />
                                        <X className='h-4 w-4 text-red-500 cursor-pointer' onClick={() => fieldOptionsDeleted(index)} />
                                    </div>
                                ))}
                                <Button size="sm" onClick={() => addNewOption()} className='flex items-center gap-2 bg-primary p-3 rounded-md'>
                                    <PlusIcon className='w-5 h-5' />
                                    <span className='text-sm'>Add</span>
                                </Button>
                            </div>
                        )}

                        <Button onClick={handleUpdateAndClose}>
                            Upgrade
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Alert Dialog for Delete */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Delete className='h-6 w-6 text-red-500 cursor-pointer' />
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
                        <AlertDialogAction onClick={() => deletedField()}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default EditForm;
