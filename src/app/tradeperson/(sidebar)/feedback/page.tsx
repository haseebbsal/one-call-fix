'use client'
import Image from "next/image"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { FormEvent, useRef, useState } from "react";
import { useMutation } from "react-query";
// import axiosInstance from "@/app/utils/axiosInstance";
import { ImSpinner2 } from "react-icons/im";
import ReactStars from "react-stars";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import BaseButton from "@/components/common/button/base-button";
import toast from "react-hot-toast";
type FeedbackData = {
    // "rating": number,
    "description": string
}
export default function Feedback() {
    const [rating, setRating] = useState(0)
    const formRef:any=useRef()
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2,onClose:onClose2 } = useDisclosure();
    const feedbackMutation = useMutation((data: FeedbackData) => axiosInstance.post('/feedback', data), {
        onSuccess(data, variables, context) {
            console.log('feedback',data)
            // onOpen2()
            const form = formRef.current as HTMLFormElement
            form.reset()
            toast.success('FeedBack Submitted Successfully')
            setRating(0)

        },
        onError(error:any) {
            if (Array.isArray(error.response.data.message)) {
                toast.error(error.response.data.message[0]);
            } else {
                toast.error(error.response.data.message);
            }
        },
    })
    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const form = e.target as any as HTMLFormElement
        const formData = new FormData(form)
        const data:FeedbackData = {
            description: formData.get('description') as any as string,
            // rating
        }
        feedbackMutation.mutate(data)

    }
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <p className="font-semibold text-xl">Feedback</p>
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col border-1 rounded-lg gap-8 p-4">
                    <p className="font-semibold">Let us know how we can improve!</p>
                    {/* <div className="flex flex-col gap-2 ">
                        <p className="font-semibold">Provide Rating</p>
                        <div className="flex gap-2">
                        <ReactStars
                        value={rating}
                        // edit={false}
                        count={5}
                        onChange={(r: number) => {
                            setRating(r)
                            console.log('rating',r)
                        }}
                        size={40}
                        color2={'#ffd700'} />
                        </div>
                    </div> */}

                    <div className="flex flex-col ">
                        <p className="font-semibold">Provide Descriptive Comment</p>
                        <Textarea
                            name="description"
                            // label="Riddle Description"
                            required
                            placeholder="Write Comment..."
                            className="sm:w-1/2 w-full"
                            // labelPlacement="outside"
                            size="lg"
                            minRows={10}
                            classNames={{ description: "!h-[15rem]", label: "!font-semibold" }}
                        />
                    </div>
                    {/* <div className="flex flex-col gap-4 ">
                        <p className="font-semibold">Location</p>
                        <div className="h-[20rem] w-[60%]">
                            <Image className="h-full w-full" src={'/images/user/dashboard/maps.png'} width={200} height={200} alt="google maps" />
                        </div>
                    </div> */}

                    <BaseButton
                    isLoading={feedbackMutation.isLoading}
                    disabled={feedbackMutation.isLoading}
                        type="submit"
                        // onClick={() => { onOpen2() }}
                        >Submit Feedback</BaseButton>
                </form>
            </div>
            <Modal
                size={"xl"}
                isOpen={isOpen2}
                backdrop="blur"
                onOpenChange={onOpenChange2}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Feedback Submitted</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Feedback has been submitted successfully.</p>
                                <div className="flex w-full gap-4">
                                    <button onClick={() => {
                                        onClose2()
                                    }} className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}