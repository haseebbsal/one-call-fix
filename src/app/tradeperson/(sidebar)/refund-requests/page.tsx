'use client'

import axiosInstance from "@/_utils/helpers/axiosInstance"
import BaseButton from "@/components/common/button/base-button"
import BaseFileUpload from "@/components/common/file-upload/base-file-upload"
import BaseFileInput from "@/components/common/form/base-file-input"
import BaseSelect from "@/components/common/form/base-select"
import BaseTextArea from "@/components/common/form/base-textarea"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { Controller, FieldValues, useController, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "react-query"

const animals = [
    {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
    {label: "Dog", value: "dog", description: "The most popular pet in the world"},
    {label: "Elephant", value: "elephant", description: "The largest land animal"},
    {label: "Lion", value: "lion", description: "The king of the jungle"},
    {label: "Tiger", value: "tiger", description: "The largest cat species"},
    {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
    {
      label: "Dolphin",
      value: "dolphin",
      description: "A widely distributed and diverse group of aquatic mammals",
    },
    {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"},
    {label: "Zebra", value: "zebra", description: "A several species of African equids"},
    {
      label: "Shark",
      value: "shark",
      description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
      label: "Whale",
      value: "whale",
      description: "Diverse group of fully aquatic placental marine mammals",
    },
    {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
    {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
  ];
export default function RefundRequest(){
    const {control,register,handleSubmit,formState:{errors},setValue,watch,setError,getValues}=useForm({
        defaultValues:{
            // job:"",
            description:"",
            files:""
        }
    })

    const [invalid,setInvalid]=useState(false)
    const [search,setSearch]=useState('')
    const [job,setJob]=useState<any>()
    const [isSubmitted,setSubmitted]=useState(false)

    useEffect(()=>{
        if(isSubmitted){
            if(job){
                setInvalid(false)
            }
        }
    },[job])

    // const {field,fieldState:{error,invalid}}=useController({
    //     control,
    //     name:'job',
    //     rules:{
    //         required:"Select Job",
    //         // validate:()=>fas
    //     }
    // })

    // useEffect(()=>{
    //     console.log('value',getValues('job'))
    //     // if(errors.job){
    //     //     if(getValues('job')){
    //     //         setError('job',{})
    //     //     }
    //     // }
    // },[getValues('job')])
    const refundMutation=useMutation((data:FormData)=>axiosInstance.postForm('/refund',data),{
        onSuccess(data, variables, context) {
            console.log('refund',data.data)
            toast.success('Refund Submitted Successfully')
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
        if(!job || !getValues('files') || !getValues('description')){
            setInvalid(true)
            setSubmitted(true)
            // return 
        }
        if(!getValues('description')){
            setError('description',{message:"Enter Description"})
        }
        if(!getValues('files')){
            setError('files',{message:"Select Files"})
        }
        if(job && getValues('files') && getValues('description')){
            const formdata=new FormData()
            formdata.append('job',job)
            formdata.append('description',data.description)
            formdata.append('files',data.files)
            setSubmitted(false)
            refundMutation.mutate(formdata)
        }
        console.log('data',data)

    }

    // console.log('field',field.value,error,invalid)
    return (
        <>
        <div className="p-4">
        <h1 className="text-xl font-semibold">Refund Requests</h1>
        <form onSubmit={handleSubmit(submit)} className="mt-4 w-1/2 flex flex-col gap-4">
        <Autocomplete
            // {...field}
            isInvalid={invalid}
            errorMessage={"Select A Job"}
          className="w-full"
          variant="bordered"
          isLoading={getJobsQuery.isLoading}
          defaultItems={[]}
          items={getJobsQuery.data?.data.data}
          label="Select A Job"
          labelPlacement="outside"
        //   classNames={{
        //   }}
          onSelectionChange={(e)=>{
            // console.log(e)
            setJob(e)
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
        
            <BaseTextArea extraClass={{
                label:"font-semibold text-lg ml-0"
            }} name="description" placeholder="Enter description..." 
            // rules={{
            //     required:"Enter Description"
            // }} 
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
            control={control} name="files"  extraClass={{
                label:"!font-semibold !text-lg !ml-0"
            }} />

            <BaseButton type="submit">Submit Refund</BaseButton>
            
        </form>
        </div>
        
        </>
    )
}