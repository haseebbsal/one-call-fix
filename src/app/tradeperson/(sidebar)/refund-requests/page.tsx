'use client'

import axiosInstance from "@/_utils/helpers/axiosInstance"
import BaseButton from "@/components/common/button/base-button"
import BaseFileUpload from "@/components/common/file-upload/base-file-upload"
import BaseFileInput from "@/components/common/form/base-file-input"
import BaseSelect from "@/components/common/form/base-select"
import BaseTextArea from "@/components/common/form/base-textarea"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Controller, FieldValues, useController, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "react-query"
import Cookies from "js-cookie"

export default function RefundRequest(){
    const {control,register,handleSubmit,formState:{errors},setValue,watch,setError,getValues,reset}=useForm({
       
    })

    const [search,setSearch]=useState('')   
    const formRef=useRef()
    const router=useRouter()
    const [user,setUser]=useState<any>(null)
    useEffect(()=>{
      const user=JSON.parse(Cookies.get('userData')!)
      console.log(user)
      setUser(user)
    },[])
  
    const getUserQuery=useQuery(['tradePerson',user?._id],({queryKey})=>axiosInstance.get(`/user/?userId=${queryKey[1]}`),{
      enabled:!!user
    })
    const refundMutation=useMutation((data:FormData)=>axiosInstance.postForm('/refund',data),{
        onSuccess(data, variables, context) {
            console.log('refund',data.data)
            toast.success('Refund Submitted Successfully')
            router.refresh()

        },onError(error:any) {
            if (Array.isArray(error.response.data.message)) {
                toast.error(error.response.data.message[0]);
            } else {
                toast.error(error.response.data.message);
            }
        },
    })
    const getJobsQuery=useQuery(['refundJobs',search],({queryKey})=>axiosInstance.get(`/job/trades-person/refunds?page=1&limit=6&${queryKey[1] && `searchQuery=${queryKey[1]}`}`))
    const submit=(data:FieldValues)=>{
        
        const formdata=new FormData()
        formdata.append('job',data.job)
        formdata.append('description',data.description)
        data.files.forEach((e:any)=>{
            formdata.append('files',e)
        })
        refundMutation.mutate(formdata)


        console.log('data',data)

    }

    console.log(getUserQuery.data?.data.data.profileCompletion)
    const {field,fieldState}=useController({control,name:"job",rules:{"required":"Select Job"}})

    return (
        <>
        <div className="py-8 px-8">
        <h1 className="text-xl font-semibold">Refund Requests</h1>
        <form ref={formRef as any} onSubmit={handleSubmit(submit)} className="mt-8 sm:w-1/2 flex flex-col gap-4">
        <Autocomplete
            // {...field}
            isInvalid={!!fieldState.error}
            errorMessage={"Select A Job"}
          className="w-full !font-semibold !text-2xl"
          variant="bordered"
          isLoading={getJobsQuery.isLoading}
          defaultItems={[]}
          items={getJobsQuery.data?.data.data}
          label="Which job is this related to?"
          labelPlacement="outside"
        //   classNames={{
        //   }}
          onSelectionChange={(e)=>{
            // console.log(e)
            field.onChange(e)
            // setJob(e)
            // setValue('job',e as string)
          }}
          placeholder="Select A Job"
        //   scrollRef={scrollerRef}
        //   selectionMode="single"
        //   onOpenChange={setIsOpen}
        onInputChange={(e)=>{
            setSearch(e)
        }}
        >
          {(item:any) => (
            <AutocompleteItem key={item._id} className="capitalize">
              {item.headline}
            </AutocompleteItem>
          )}
        </Autocomplete>
        
            <BaseTextArea 
             rows={10}
             extraClass={{
                label:"font-semibold text-md ml-0"
            }} name="description" placeholder="Enter description..." 
            // rules={{
            //     required:"Enter Description"
            // }} 
            rules={{required:"Enter Description"}}
            control={control} label="Please Explain The Reason Behind The Refund Request" />
                
            <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Please provide any proof you can to support your claim (Media)</h1>
            
            {/* <BaseFileUpload register={register} name="file" rules={{required:"Select File"}}/> */}
            {/* {errors.file && <p className="text-red-500">{errors.file.message as any}</p>} */}
            </div>
            <BaseFileInput 
            // rules={{
            //     required:"Select File"
            // }} 
            show={false}
            
            
            rules={{required:"Select Files"}}
            control={control} name="files"  extraClass={{
                label:"!font-semibold !text-lg !ml-0"
            }} />

            <BaseButton disabled={getUserQuery.data?.data.data.profileCompletion<75} type="submit">Submit Request</BaseButton>
            {getUserQuery.data?.data.data.profileCompletion<75 && <p className="text-red-500">You May Not Request For Refund As Profile Completion is under 75%</p>}
            
        </form>
        </div>
        
        </>
    )
}