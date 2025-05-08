"use client";
import React, { useEffect, useState } from "react";
import FormUi from "./edit/FormUi";
import { getFormById, getFormByMockId } from "@/lib/actions/form.actions";
import { useUser } from "@clerk/nextjs";


const defaultBorderStyle: BorderStyle = {
    id: 0,
    name: "default",
    img: "",
    value: "",
    key: "",
};


export default function FormWrapper({ form_id }: { form_id: string }) {
    const [record, setRecord] = useState<FormParams | null>(null);
    const [jsonForm, setJsonForm] = useState<JsonFormParams | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<BorderStyle>(defaultBorderStyle);

    const { user } = useUser();
    const userId = user?.id as string;

    const bg = record?.background as string;

    useEffect(() => {

        async function fetchData() {
            const response = await getFormByMockId(form_id);

            if (response.success) {
                const rec = response.success;
                setRecord(rec);

                // parse your form definition
                try {
                    const parsedForm = JSON.parse(rec.jsonFormResp) as JsonFormParams;
                    setJsonForm(parsedForm);
                } catch (err) {
                    console.error("Invalid JSON in form response:", err);
                }

                // parse your style only if it exists
                if (rec.style) {
                    try {
                        const styleObj = JSON.parse(rec.style) as BorderStyle;
                        setSelectedStyle(styleObj);
                    } catch (err) {
                        console.error("Invalid JSON in style:", err);
                    }
                }
            } else {
                console.error("Error fetching form:", response.message);
            }
        }

        fetchData();
    }, [form_id, userId]);

    // don’t render your form until you have both the record and the parsed form-schema
    if (!record || !jsonForm) {
        return <div>Loading form…</div>;
    }

    return (
        <main className="" style={{ backgroundImage: bg }}>
            <div className="flex justify-center items-center py-10">
                <FormUi
                    formData={jsonForm}
                    onFieldUpdate={() => console.log}
                    onFieldsAdd={() => console.log}
                    onDeletedField={() => console.log}
                    selectedStyle={selectedStyle}
                    selectedTheme={record.theme ?? undefined}
                    isEditable={false}
                    enabledSignIn={Boolean(record.enabledSignIn)}
                    form_id={form_id}
                />
            </div>
        </main>
    );
}
