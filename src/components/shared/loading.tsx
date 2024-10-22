import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


export const Loading = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] rounded-xl bg-slate-400" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-400" />
                <Skeleton className="h-4 w-[200px] bg-slate-400" />
            </div>
        </div>
    )
}