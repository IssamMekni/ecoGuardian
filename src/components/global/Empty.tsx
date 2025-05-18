import { cn } from '@/lib/utils'
import React from 'react'

export default function Empty({ title, children, isReverse = false, path = "blank" }: { title: string, children: any, isReverse?: boolean, path?: string }) {
    return (
        <div className='w-full max-w-6xl mx-auto mt-10'>
            <div className='w-full py-8 px-5 flex items-center justify-center backdrop-blur rounded-lg border border-dashed flex-col gap-2'>
                <img src={`/svg/${path}.svg`} className='h-60' />
                <div className={cn('flex items-center justify-center lg:gap-5 gap-2 flex-col ', isReverse ? "lg:flex-row-reverse" : "lg:flex-row")}>
                    <h1 className='text-sm font-light'>{title}</h1>
                    {children}
                </div>
            </div>
        </div>
    )
}
