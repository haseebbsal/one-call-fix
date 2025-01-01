'use client'

import axiosInstance from "@/_utils/helpers/axiosInstance"
import BaseButton from "@/components/common/button/base-button"
import SavedPaymentCard from "@/components/user/layout/SavedPaymentCard"
import { Radio, RadioGroup } from "@nextui-org/radio"
import { Switch } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FieldValues, useController, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "react-query"

export default function Payment({ searchParams: { id,bidId } }: { searchParams: { id: string,bidId:String } }) {
    const router = useRouter()

    const { handleSubmit: handleSubmit2, watch, register, control: control2 } = useForm()
    const savedCardQuery = useQuery(['savedCard'], () => axiosInstance.get('/payment/card'));
    const getCreditsQuery = useQuery(['credits'], () => axiosInstance.get('/wallet'))
    const getUserQuery = useQuery(['individualJob', id], ({ queryKey }) => axiosInstance.get(`/job?jobId=${queryKey[1]}`))
    console.log('bidid',bidId)
    const paymentMutation = useMutation((data: any) => axiosInstance.put(`/bid/status?bidId=${bidId}`, data), {
        onSuccess(data, variables, context) {
            console.log('payment done', data.data)
            router.push('/tradeperson/dashboard')
        },
        onError(error: any) {
            if (Array.isArray(error.response.data.message)) {
                toast.error(error.response.data.message[0]);
            } else {
                toast.error(error.response.data.message);
            }
        },
    })

    function paymentForm(e: FieldValues) {
        console.log('values', e)
        const data = {
            status: 2,
            useWalletCredits:e.wallet
        }
        console.log('data for payment', data)
        paymentMutation.mutate(data)
    }

    const { field, fieldState } = useController(
        {
            control: control2,
            name: 'payment',
            rules: { required: "Select Payment Method" },
            defaultValue: "card"
        }
    )



    return (
        <>
            < form className="p-4" onSubmit={handleSubmit2(paymentForm)}>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                    Payment Method
                </h1>

                <div className="bg-white shadow-lg p-8 rounded-lg">
                    {savedCardQuery.data?.data?.data && Object.keys(savedCardQuery.data.data.data).length > 0 ? (
                        <RadioGroup
                        {...field}
                        value={'card'}
                        >
                            <Radio value={'card'}><SavedPaymentCard card={savedCardQuery.data.data.data} /></Radio>
                        </RadioGroup>



                    ) : (
                        <p className="text-center">No saved payment method found.</p>
                    )}


                    <div className="flex items-center w-max p-4 border-2 rounded-lg">
                        <div className="w-[3rem] h-[3rem]">
                            <Image alt="logo" src={'/logos/Original Logo (1) 2.svg'} className="w-full h-full object-contain" width={50} height={50} />
                        </div>
                        <p><span className="font-light">OneCallFix Credits :</span> £{getCreditsQuery.data?.data.data.amount}</p>

                    </div>

                    <div className="flex flex-col mt-8 gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between border-b-[0.1rem] border-dashed border-[#c9c9c9] pb-4">
                                    <p className="text-[#c9c9c9] ">Price</p>
                                    <p className="font-semibold">£{getUserQuery.data?.data.data.price}</p>
                                </div>
                            </div>
                            <div>
                                <Switch {...register('wallet')} >
                                    Use Wallet Credits
                                </Switch>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <p className="text-[#c9c9c9] ">Subtotal (Incl.VAT)</p>
                                    <p className="font-semibold">£{watch('wallet') ? getUserQuery.data?.data.data.price - getCreditsQuery.data?.data.data.amount : getUserQuery.data?.data.data.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 flex-wrap items-center mt-4">
                        <BaseButton isLoading={paymentMutation.isLoading} disabled={paymentMutation.isLoading} type="submit"  >Pay Now</BaseButton>
                        <BaseButton onClick={() => router.replace('/tradeperson/jobs')}>Back</BaseButton>
                    </div>

                </div>

            </form>
        </>
    )
}