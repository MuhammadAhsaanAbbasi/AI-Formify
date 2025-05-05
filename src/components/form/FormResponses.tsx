"use client";

import { getFormsData, getFormsResponses } from "@/lib/actions/form.actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";

export default function FormResponses() {
    const { user } = useUser();
    const userId = user?.id as string;

    // 1) Store your forms
    const [forms, setForms] = useState<FormParams[]>([]);

    // 2) Which form is selected?
    const [formId, setFormId] = useState<number>();

    // 3) Parse the JSON blueprint of that form
    const [jsonBlueprint, setJsonBlueprint] = useState<JsonFormParams>();

    // 4) **New**: an array of submissions,
    //    each is itself an array of ResponseFormField
    const [submissions, setSubmissions] = useState<ResponseFormField[][]>([]);

    // load forms once
    useEffect(() => {
        if (!userId) return;
        getFormsData(userId).then((resp) => {
            if (resp.success) {
                setForms(resp.success);
                // use the first form by default
                const first = resp.success[0];
                setJsonBlueprint(JSON.parse(first.jsonFormResp));
                setFormId(first.id);
            }
        });
    }, [userId]);

    // load submissions whenever formId changes
    useEffect(() => {
        if (formId == null) return;
        getFormsResponses(formId).then((resp) => {
            if (resp.success) {
                // map each row to a parsed array
                const parsed = resp.success.map((row) =>
                    JSON.parse(row.jsonResponse) as ResponseFormField[]
                );
                setSubmissions(parsed);
            }
            if (!resp.success) return <p>No submissions on this form yet!</p>;
        });
    }, [formId]);

    // derive your column headers from the form blueprint
    // const columns = submissions?.map((f) => f.m) ?? [];
    const exportToExcel = () =>{
        console.log(`submissions : ${submissions}`);
        let jsonData: any = [];
        submissions.forEach((submission) => {
            let data: any = {};
            submission.forEach((field) => {
                data[field.fieldName] = field.fieldValue;
            });
            jsonData.push(data);
        })
        console.log(`jsonData : ${jsonData}`);
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
       
        XLSX.writeFile(workbook, `${jsonBlueprint?.formTitle}.xlsx`);
    }


    return (
        <section className="space-y-6 my-5 md:my-8">
            {/* —————— form selector & Export Responses —————— */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <h6 className="text-base lg:text-lg text-gray-500 font-medium">
                        Select a form
                    </h6>
                    <Select
                        onValueChange={(val) => {
                            setFormId(parseInt(val));
                            // update blueprint too
                            const found = forms.find((f) => f.id === parseInt(val));
                            if (found) setJsonBlueprint(JSON.parse(found.jsonFormResp));
                            // clear old submissions
                            setSubmissions([]);
                        }} defaultValue={String(formId)} value={String(formId)}
                    >
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Select a form…" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {/* <SelectLabel>Forms</SelectLabel> */}
                                {forms.map((f) => (
                                    <SelectItem key={f.id} value={String(f.id)}>
                                        {JSON.parse(f.jsonFormResp).formTitle}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={exportToExcel}>
                    Export Responses
                </Button>
            </div>
            {/* —————— responses table —————— */}
            <Table className="w-full overflow-auto">
                <TableHeader>
                    <TableRow className="">
                        {jsonBlueprint?.fields.map((col) => (
                            <TableHead className="border-solid border-2 border-secondary w-fit" key={col.fieldName}>
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {submissions.map((submission, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {jsonBlueprint?.fields.map((col) => {
                                const cell = submission.find((f) => f.fieldName === col.label);
                                // if it's a boolean, coerce to yes/no; else stringify
                                const display =
                                    typeof cell?.fieldValue === "boolean"
                                        ? cell.fieldValue
                                            ? <Check className="text-green-500 h-5 w-5" />
                                            : <X className="text-red-500 h-5 w-5" />
                                        : String(cell?.fieldValue ?? "");
                                return <TableCell key={col.fieldName} className="border-solid border-2 border-secondary">
                                    {display}</TableCell>;
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}
