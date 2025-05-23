"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, Share, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormController from '@/components/form/FormController'
import FormUi from './FormUi'
import { useUser } from '@clerk/nextjs'
import { getFormById, updateControllerFields, updateFields } from '@/lib/actions/form.actions'
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
import Link from 'next/link'
import ShareButton from '@/components/shared/ShareButton'
import AddFormFields from './AddFormFields'

const FormEdit = ({ form_id }: { form_id: string }) => {

    const [jsonFormData, setJsonFormData] = useState<JsonFormParams>({
        formTitle: "",
        formHeading: "",
        fields: []
    });

    const [selectedTheme, setSelectedTheme] = useState<string>('')
    const [bgGradient, setBgGradient] = useState<string>('');
    const [selectedStyle, setSelectedStyle] = useState<BorderStyle>({
        id: 0,
        name: '',
        key: '',
        value: '',
        img: ''
    });


    type Trigger = { time: number; payload: string };
    const [updateTrigger, setUpdateTrigger] = useState<Trigger | null>(null);

    const router = useRouter();
    const { user } = useUser();
    const UserId = user?.id as string;

    useEffect(() => {
        const formData = async () => {
            const response = await getFormById(form_id, UserId)
            if (response.success) {
                setJsonFormData(JSON.parse(response.success.jsonFormResp));
                setSelectedTheme((response.success.theme as string));
                setSelectedStyle(JSON.parse((response.success.style as string)));
                setBgGradient((response.success.background as string));
            }
        };
        formData();
    }, [UserId, form_id]);

    const onFieldsAdd = (newField: z.infer<typeof fieldSchema>) => {
        jsonFormData.fields.push(newField);
        setJsonFormData(jsonFormData);
        console.log(`jsonFormData : ${JSON.stringify(jsonFormData)}`);
        setUpdateTrigger({
            time: Date.now(),
            payload: JSON.stringify(jsonFormData),
        });
    };

    const onFieldUpdate = (field: UpdateFields, index: number) => {
        jsonFormData.fields[index].label = field.label;
        jsonFormData.fields[index].placeholder = field.placeholder;
        if (jsonFormData.fields[index].options) {
            jsonFormData.fields[index].options = field.options;
        }
        setJsonFormData(jsonFormData);
        setUpdateTrigger({
            time: Date.now(), payload: JSON.stringify(jsonFormData),
        });
    };

    const onFieldDeleted = (isIndexNumber: number) => {
        const formDeleted = jsonFormData.fields.filter((_, index) => index !== isIndexNumber);
        jsonFormData.fields = formDeleted;
        setJsonFormData(jsonFormData);
        setUpdateTrigger({
            time: Date.now(),
            payload: JSON.stringify(jsonFormData),
        });
    };

    const UpdateControllers = async (val: unknown, column: string) => {
        const req = await updateControllerFields(val, column, form_id, UserId);
        if (req?.success) {
            toast({
                title: "Successfully Updated!",
                description: req?.success,
                variant: "success",
                duration: 2000,
                action: (
                    <ToastAction altText="Close">Close</ToastAction>
                ),
            })
        }
    }


    useEffect(() => {
        if (!updateTrigger) return;

        updateFields(updateTrigger.payload, form_id, UserId)
            .then((res) => {
                if (res?.success) {
                    toast({
                        title: "Successfully Updated!",
                        description: res.success,
                        variant: "success",
                        duration: 2000,
                        action: (
                            <ToastAction altText="Close">Close</ToastAction>
                        ),
                    })
                }
                if (res?.error) {
                    toast({
                        title: "Error!",
                        description: res?.error,
                        duration: 2000,
                        variant: "destructive",
                        action: (
                            <ToastAction altText="Close">Close</ToastAction>
                        ),
                    })
                }
            })
            .catch((err) => {
                toast({ title: "Error", description: String(err), variant: "destructive" });
            });
    }, [updateTrigger]);

    return (
        <div className='p-5 relative'>
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
                    <Link href={`/form/${form_id}/`} target="_blank">
                        <Button className='flex items-center gap-2'
                        // onClick={() => router.push(`/form/${form_id}`)}
                        >
                            <SquareArrowOutUpRight className='h-5 w-5' />
                            <span>Live Preview</span>
                        </Button>
                    </Link>
                    <ShareButton text={jsonFormData.formHeading}
                        title={jsonFormData.formTitle}
                        url={form_id}
                    >
                        <Button className='flex items-center gap-2 bg-green-500 hover:bg-green-400 transition-all'>
                            <Share className='h-5 w-5' />
                            <span>Share</span>
                        </Button>
                    </ShareButton>
                </div>
            </div>

            <AddFormFields
                addValues={onFieldsAdd}
            />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <FormController
                    setSelectedTheme={(val) => {
                        setSelectedTheme(val);
                        UpdateControllers(z.string().parse(val), 'theme')
                    }}
                    setBgGradient={(val) => { setBgGradient(val); UpdateControllers(z.string().parse(val), 'background') }}
                    setStyles={(val) => { setSelectedStyle(val); UpdateControllers(JSON.stringify(val), 'style') }}
                    setSignInEnable={(val) => {
                        UpdateControllers(JSON.stringify(val), 'enabledSignIn')
                    }}
                />
                <div className='md:col-span-2 border rounded-lg shadow-md p-5 flex justify-center items-center'
                    style={{ backgroundImage: bgGradient }}
                >
                    <FormUi
                        formData={jsonFormData}
                        onFieldUpdate={onFieldUpdate}
                        onDeletedField={onFieldDeleted}
                        onFieldsAdd={onFieldsAdd}
                        selectedTheme={selectedTheme}
                        selectedStyle={selectedStyle}
                        form_id={form_id}
                    />
                </div>
            </div>
        </div>
    )
}

export default FormEdit