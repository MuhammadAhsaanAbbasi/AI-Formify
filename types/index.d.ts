/* eslint-disable no-unused-vars */

// ====== USER PARAMS
declare interface CreateUserParams {
    clerkId: string;
    email: string;
    username: string;
    limit: number;
    firstName: string;
    lastName: string;
    photo: string;
};

declare interface UserParams {
    id: number;
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
    createdAt: Date | null;
};

declare interface FormParams {
    id: number;
    jsonFormResp: string;
    theme: string | null;
    background: string | null;
    style: string | null;
    user_id: number | null;
    createdAt: string | null;
    mockID: string;
    enabledSignIn: boolean | null;
}

declare interface JsonFormParams {
    formTitle: string;
    formHeading: string;
    fields: FormField[];
}

declare interface FormField {
    fieldName: string;
    fieldTitle: string;
    fieldType: 'text' | 'email' | 'number' | 'tel' | 'select' | 'checkbox' | 'radio' ;
    placeholder: string;
    label: string;
    required: boolean;
    options?: string[]; // Only applicable for 'select' field types
}


declare interface UpdateFields {
    label: string;
    placeholder: string;
    options?: string[];
}


declare interface UpdateUserParams {
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
};


declare type fieldType = 'text' | 'email' | 'number' | 'tel' | 'select' | 'checkbox' | 'radio' ;

interface BorderStyle {
        id:number,
        name:string,
        img:string,
        value:string,
        key:string
}

declare interface ResponseFormField {
    fieldName: string;
    fieldValue: unknown;
    fieldType: 'text' | 'email' | 'number' | 'tel' | 'select' | 'checkbox' | 'radio' ;
}


// interface FormResponse {}

declare type CheckoutTransactionParams = {
    plan: string;
    limit: number;
    amount: number;
    buyerId: string;
};

declare type CreateTransactionParams = {
    stripeId: string;
    amount: number;
    limit: number;
    plan: string;
    buyerId: number;
    createdAt: string;
};