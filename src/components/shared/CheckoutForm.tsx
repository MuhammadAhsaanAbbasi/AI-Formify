"use client";
import React, { useTransition } from 'react'
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from '@/schemas/checkout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { checkoutTier } from '@/lib/actions/checkout.actions';
import { useUser } from '@clerk/nextjs';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { z } from 'zod';

const CheckoutForm = ({ name }: { name: string }) => {
    const [isPending, startTransition] = useTransition();

    const { user } = useUser();

    const router = useRouter();

    const UserId = user?.id as string;

    const form = useForm<z.infer<typeof checkoutFormSchema>>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            emailOrPhone: "",
            newsletter: false,
            firstName: "",
            lastName: "",
            screenshot: undefined,
            plan: name,
        }
    });

    const onSubmit = async (data: z.infer<typeof checkoutFormSchema>) => {
        startTransition(async () => {
            checkoutTier(data, UserId)
                .then((res) => {
                    if (res?.error) {
                        toast({
                            title: "Form Failed",
                            description: res?.error,
                            duration: 2000,
                            variant: "destructive",
                            action: (
                                <ToastAction altText="Dismiss">Dismiss</ToastAction>
                            )
                        })
                    }

                    if (res?.success) {
                        toast({
                            title: "Successfully Created!",
                            description: res.message,
                            duration: 2000,
                            variant: "success",
                            action: (
                                <ToastAction altText="Close">Close</ToastAction>
                            ),
                        })
                        router.push(`/checkout/success`);
                    }
                }).catch((err) => console.log(`error: ${err}`))
                .finally(() => {
                    form.reset();
                })
        })
    };

    return (
        <Form {...form}>
            <form
                className="space-y-8 bg-gray-100 p-6 border rounded-lg"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {/* Contact Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                        Contact
                    </h2>

                    <FormField
                        control={form.control}
                        name="emailOrPhone"
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-2 w-full'>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Email or mobile phone number"
                                        className="w-full"
                                        onChange={(e) => field.onChange(e.target.value)}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Newsletter */}
                    <FormField
                        control={form.control}
                        name="newsletter"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        id="newsletter"
                                        checked={field.value}             // boolean ✔
                                        onCheckedChange={field.onChange} // (bool) => void ✔
                                        ref={field.ref}                  // preserve ref
                                        className="mt-1"
                                    />
                                </FormControl>

                                <FormLabel
                                    htmlFor="newsletter"
                                    className="flex items-center gap-2 font-normal text-sm"
                                >
                                    Email me with news and offers
                                </FormLabel>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <div className="space-y-4">
                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1">
                                    <FormLabel
                                        htmlFor="firstName"
                                        className="font-medium text-lg"
                                    >
                                        First Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            id='firstName'
                                            placeholder="First Name"
                                            className="w-full"
                                            onChange={(e) => field.onChange(e.target.value)}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1">
                                    <FormLabel
                                        htmlFor="lastName"
                                        className="font-medium text-lg"
                                    >
                                        Last Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id='lastName'
                                            type="text"
                                            placeholder="Last Name"
                                            className="w-full"
                                            onChange={(e) => field.onChange(e.target.value)}
                                            disabled={isPending}
                                        />
                                    </FormControl>


                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* ScreenShot */}
                    <FormField
                        control={form.control}
                        name="screenshot"
                        render={({ field }) => {
                            const { value, ...rest } = field;
                            return (
                                <FormItem className="flex flex-col gap-1">
                                    <FormLabel
                                        htmlFor="ScreenShot"
                                        className="font-medium text-lg"
                                    >
                                        ScreenShot
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...rest}
                                            id="screenshot"
                                            type="file"
                                            multiple={false}
                                            accept="image/*"
                                            /*  ⤵️  pass *only* the first file (or undefined)                    */
                                            onChange={e => rest.onChange(e.target.files?.[0])}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />

                    {/* Plan */}
                    <FormField
                        control={form.control}
                        name="plan"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <FormLabel
                                    htmlFor="plan"
                                    className="font-medium text-lg"
                                >
                                    Plan
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id='plan'
                                        type="text"
                                        placeholder="Last Name"
                                        value={field.value}
                                        className="w-full"
                                        disabled={true}
                                    />
                                </FormControl>


                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <Button disabled={isPending}>
                            {
                                isPending ? (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <span>Checkout</span>
                                )
                            }
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default CheckoutForm;