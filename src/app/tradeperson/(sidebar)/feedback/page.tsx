'use client'

import BaseButton from "@/components/common/button/base-button"
import BaseFileUpload from "@/components/common/file-upload/base-file-upload"
import BaseFileInput from "@/components/common/form/base-file-input"
import BaseTextArea from "@/components/common/form/base-textarea"
import { FieldValues, useForm } from "react-hook-form"

export default function Feedback(){
    const {control,register,handleSubmit,formState:{errors}}=useForm()

    const submit=(data:FieldValues)=>{
        console.log('data',data)
    }
    return (
        <>
        <div className="p-4">
        <h1 className="text-xl font-semibold">Feedback Questions</h1>
        <form onSubmit={handleSubmit(submit)} className="mt-4 flex flex-col gap-4">
            <BaseTextArea extraClass={{
                label:"font-semibold text-lg ml-0"
            }} name="description" placeholder="Enter description..." rules={{
                required:"Enter Description"
            }} control={control} label="Please Explain The Feedback You Would Like To Provide" />
                
            <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Upload Media</h1>
            <BaseFileUpload register={register} name="file" rules={{required:"Select File"}} />
            {errors.file && <p className="text-red-500">{errors.file.message as any}</p>}
            </div>
            {/* <BaseFileInput rules={{
                required:"Select File"
            }} control={control} name="media" label="Upload Media" extraClass={{
                label:"!font-semibold !text-lg !ml-0"
            }} /> */}

            <BaseButton type="submit">Submit Feedback</BaseButton>
            
        </form>
        </div>
        
        </>
    )
}