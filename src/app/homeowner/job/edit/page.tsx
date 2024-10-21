'use client'

import axiosInstance from "@/_utils/helpers/axiosInstance";
import { QuestionAnswer } from "@/_utils/types";
import BaseButton from "@/components/common/button/base-button";
import BaseFileInput from "@/components/common/form/base-file-input";
import BaseInput from "@/components/common/form/base-input";
import BaseRadioGroup from "@/components/common/form/base-radio-group";
import EditGooglePlacesInput from "@/components/common/form/edit-google-place";
import GooglePlacesInput from "@/components/common/form/google-places-input";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

const mandatoryQuestionsInitial: QuestionAnswer[] = [
    {
      question: "What is your estimated budget?",
      answerIndex: -1,
      name: "estimatedBudget",
      ownValue: true,
      _id: "1",
      options: [
        "Under £100",
        "Under £250",
        "Under £500",
        "Under £1000",
        "Under £2000",
        "Under £4000",
        "Under £8000",
        "Under £15000",
        "Under £30000",
        "Over £30000",
        "Not Sure",
      ],
    },
    {
      question: "When do you need this done by?",
      answerIndex: -1,
      name: "completion",
      ownValue: true,
      _id: "2",
      options: [
        "As Soon As Possible",
        "This Week",
        "Within Two Weeks",
        "Within This Month",
        "Within The Next Two Months",
        "Flexible",
      ],
    },
  ];

export default function EditJob(datas:any){
    const {isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1, onClose: onClose1} = useDisclosure();
    const [mandatoryAnswers,setMandatoryAnswers]=useState<{estimatedBudget:string,completion:string,address:any,headline:string}>({
        estimatedBudget:"",
        completion:"",
        address:"",
        headline:""
      })
      const queryCient=useQueryClient()

      const updateJob=useMutation((data:FormData)=>axiosInstance.putForm(`/job?jobId=${datas.searchParams.id}`,data),{
        onSuccess(data) {
            console.log('updateddd',data.data)
            queryCient.invalidateQueries('homeOwnerJobss')
            onOpen1()

        },
        onError(error:any) {
            if (Array.isArray(error.response.data.message)) {
                toast.error(error.response.data.message[0]);
            } else {
                toast.error(error.response.data.message);
            }
        },
      })
    const getJobQuery=useQuery(['individualJob',datas.searchParams.id],({queryKey})=>axiosInstance.get(`/job?jobId=${queryKey[1]}`),{
        onSuccess(data) {
            setMandatoryAnswers(
                {
                    estimatedBudget:data?.data.data.estimatedBudget,
                    completion:data?.data.data.completion,
                    address:{
                        city:data?.data.data.address.city,
                        country:data?.data.data.address.country,
                        postalCode:data?.data.data.address.postalCode,
                        latitude:data?.data.data.address.location.coordinates[0],
                        longitude:data?.data.data.address.location.coordinates[1]

                    },
                    headline:data?.data.data.headline
                }
            )
        },
    })
    const { control, handleSubmit, setValue } = useForm<any>();
    // useEffect(() => {
    //     const userData=JSON.parse(Cookies.get('userData')!)
    //     console.log('user',userData)
    //     setValue("firstName", userData.firstName);
    //       setValue("lastName", userData.lastName);
    //       setValue("phone", userData.phone);
    //       setValue("email", userData.email);
    //   }, []);

    console.log('estimated',mandatoryAnswers)
    function onSubmit(e:FieldValues){
        // console.log('values',e)
        const formData=new FormData()
        formData.append("completion", mandatoryAnswers.completion);
        formData.append("estimatedBudget", mandatoryAnswers.estimatedBudget);
        formData.append("headline", mandatoryAnswers.headline);
        formData.append("address[postalCode]", (mandatoryAnswers.address as any).postalCode);
        formData.append("address[formattedAddress]", (mandatoryAnswers.address as any).formattedAddress);
        formData.append("address[latitude]", (mandatoryAnswers.address as any).latitude);
        formData.append("address[longitude]", (mandatoryAnswers.address as any).longitude);
        formData.append("address[city]", (mandatoryAnswers.address as any).city);
        formData.append("address[country]", (mandatoryAnswers.address as any).country);
        if(e.files){
            for (const file of e.files) {
                formData.append("files", file);
              }
        }
        updateJob.mutate(formData)

    }
    return (
        <>
        <section className="mt-20 mb-16 px-16 flex flex-col gap-5">
            <div>
                <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 pb-2">
                Edit Job Post
                </h5>
                {
                    !getJobQuery.isLoading && mandatoryAnswers.completion && <div className="border-2 border-gray-100 rounded-md">
                      <form  className="p-4 w-1/2 " onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-8">
                    {getJobQuery.data?.data.data && mandatoryQuestionsInitial.map((question:any, index) => (
              <div key={index} className="mb-20">
                <h3 className="text-xl lg:text-2xl font-bold text-color-6 pb-6">
                  {question.question} {/* Dynamically display the question */}
                </h3>
                
                <BaseRadioGroup
                defaultValue={question.name=='estimatedBudget'?mandatoryAnswers.estimatedBudget:mandatoryAnswers.completion}
                // value={question.name=='estimatedBudget'?getJobQuery.data?.data.data.estimatedBudget:getJobQuery.data?.data.data.completion}
                onValueChange={(e)=>{
                  console.log('changee',e)
                  if(question.name=="estimatedBudget"){
                    setMandatoryAnswers((prev:any)=>{
                      return {...prev,estimatedBudget:e}
                    }
                  )
                  }
                  else{
                    setMandatoryAnswers((prev:any)=>{
                      return {...prev,completion:e}
                    }
                  )
                  }
                //   if(isFormCompleted){
                    // if(question.name=="estimatedBudget"){
                    //   setMandatoryAnswers((prev:any)=>{
                    //     return {...prev,estimatedBudget:e}
                    //   }
                    // )
                    // }
                    // else{
                    //   setMandatoryAnswers((prev:any)=>{
                    //     return {...prev,completion:e}
                    //   }
                    // )
                    // }
                //   }
                  // console.log(typeof e)
                //   setCurrentQuestionValue(e)
                }}
                  name={question.name ?? `question_${index}`} // Ensure unique names if multiple questions
                  control={control}
                  radioList={question.options.map((option:any, opIndex:number) => ({
                    description: option, // Adjust if your structure differs
                    value: question.ownValue ? option : opIndex.toString(), // Simplified assuming option is a string
                    text: option, // Simplified assuming option is a string
                    inline: question.name === "estimatedBudget" ? true : false,
                  }))}
                //   readonly={
                //     index < 0
                //       ? true
                //       : false
                //   }
                />
              </div>
            ))}

                    </div>
                    
                    <div className="my-8">
                    <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
                        Job Headline
                    </h3>
                    {/* <h3 className="text-xl lg:text-2xl font-bold text-color-6 pb-6">
                      Give this Job a Headline *
                    </h3> */}
                    <BaseInput
                      name="headline"
                      type="text"
                      onChangee={setMandatoryAnswers}
                    //   defaultValue={'yessir'}
                    value={mandatoryAnswers.headline}
                      control={control}
                      radius="sm"
                      placeholder="Example: Repair and Paint Walls and Ceilings"
                      rules={mandatoryAnswers.headline?{}:{ required: "Headline is required" }}
                    />
                    </div>
                    <div className="my-8">
                    <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
                        Job Files
                    </h3>
                    <BaseFileInput name="files" control={control} />
                    </div>
                    <div className="my-8">
                    <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
                        Job Location
                    </h3>
                    <EditGooglePlacesInput
                    changeAddressKey={setMandatoryAnswers}
                      name="address"
                      control={control}
                      placeholder="Postcode"
                      rules={(mandatoryAnswers.address as any).postalCode?{}:{ required: "Post Code is required" }}
                      addressKey={getJobQuery.data?.data.data.address}
                      radius="sm"
                    />
                    </div>

                    <BaseButton type="submit" 
                    // isLoading={changeProfileImgMutation.isLoading} disabled={changeProfileImgMutation.isLoading}
                    >
                    Save
                    </BaseButton>
                    {/* {error && <p className="text-danger">{error}</p>} */}
      </form>
      </div>
                }
                
            </div>
        </section>
        <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
                onClose={() => {
                    // navigate.push('/admin/manage-hunts');
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            {/* <ModalHeader className="flex flex-col text-xl gap-1">All Documents</ModalHeader> */}
                            <ModalBody className="flex flex-col items-center gap-4 pb-8">
                                <div className="flex flex-col items-center gap-2 w-1/2">
                                  <div className="w-full h-[10rem]">
                                    <Image className="w-full h-full object-contain" src={'/images/review.svg'} width={150} height={150} alt="review"/>
                                  </div>
                                  <p className="font-bold text-lg">System Generated Request</p>
                                  <p className="font-light text-sm">Job Post has been updated successfully</p>
                                  
                                </div>
                                {/* <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                                  <BaseTextArea extraClass={{
                                    label:"!font-bold text-lg"
                                  }} name="description" label="Review" rules={{required:"Enter Review"}} control={control}/>
                                  <BaseButton type="submit">Submit Review</BaseButton>
                                </form> */}
                                  
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
        
    )
}