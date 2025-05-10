"use client";
import React, { useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '@/schemas/form'
import { useUser } from '@clerk/nextjs'
import { Input } from '../ui/input'
import { generateform } from '@/lib/actions/form.actions'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '../ui/toast'
import { useRouter } from 'next/navigation'
import { FormError } from '../shared/FormError'
import { FormSuccess } from '../shared/FormSuccess'
// import { Forms } from '@/utils/schema'

const CreateForm = ({disable}: {disable: boolean}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isLoading, startTransition] = useTransition();

    const { toast } = useToast();
    const router = useRouter();
    const { user } = useUser();

    const userID = user?.id as string;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",  // If user is undefined, handle it gracefully
        },
    })
    // console.log(user)
    // Simulate an async API call for interview submission
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setError("");
        setSuccess("");
        startTransition(() => {
            generateform(values, userID)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    if (data?.error) {
                        toast({
                            title: "Form Failed",
                            description: data.error,
                            duration: 2000,
                            variant: "destructive",
                            action: (
                                <ToastAction altText="Dismiss"  >Dismiss</ToastAction>
                            )
                        })
                        form.reset();
                        setOpenDialog(false)
                    }

                    if (data?.success) {
                        form.reset();
                        toast({
                            title: "Successfully Created!",
                            description: data.success,
                            duration: 2000,
                            variant: "success",
                            action: (
                                <ToastAction altText="Close">Close</ToastAction>
                            ),
                        })
                        setOpenDialog(false)
                        router.push(`/form/${data.res}/edit`);
                    }
                })
        });
    }

    return (
        <div className='grid grid-cols-1 gap-5'>
            <div
                className='bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 cursor-pointer'
                onClick={() => setOpenDialog(true)}
            >
                <Plus className="mr-2 h-4 w-4" />
                <span>
                    Create Form
                </span>
            </div>
            <Dialog
                open={openDialog}
                onOpenChange={setOpenDialog}  // Ensure the dialog can be closed/opened properly
            >
                <DialogContent className="max-w-2xl bg-secondary">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Create New Form</DialogTitle>
                        <DialogDescription asChild>
                            <div>Add details about your Form Title & Description here</div>
                        </DialogDescription>
                        <Form
                            {...form}
                        >
                            <form className="flex flex-col justify-center gap-4"
                                onSubmit={form.handleSubmit(onSubmit)} >
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className='my-3'>
                                            <FormLabel htmlFor='title'>Form Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    id='title'
                                                    disabled={isLoading}
                                                    placeholder="Workshop Registration"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className='my-3'>
                                            <FormLabel htmlFor='desc'>Description of Your Form</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    id='desc'
                                                    disabled={isLoading}
                                                    placeholder="Workshop of React, Next.js, and Tailwind CSS"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Error/Success Messages */}
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
                                            disabled={isLoading || disable}  // Disable during submission
                                        >
                                            {isLoading ? "Generating..." : "Generate Form"}
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default CreateForm